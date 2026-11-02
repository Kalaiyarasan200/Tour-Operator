import { initialPackages } from "../data/seedPackages";
import { initialEnquiries } from "../data/seedEnquiries";
import { initialBlogs } from "../data/seedBlogs";
import { initialRedirects } from "../data/legacyRedirects";
import { initialActivityLog, staffMembers } from "../data/teamData";

const STORAGE_KEYS = {
  PACKAGES: "companya_packages_v1",
  ENQUIRIES: "companya_enquiries_v1",
  BLOGS: "companya_blogs_v1",
  REDIRECTS: "companya_redirects_v1",
  LOGS: "companya_activity_log_v1",
  QUOTES: "companya_quotes_v1",
  ACTIVE_ROLE: "companya_active_role_v1"
};

// Safe storage getter
function getJson(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn("Storage read error for " + key, e);
    return defaultValue;
  }
}

function setJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Storage write error for " + key, e);
  }
}

export const storageService = {
  // Roles
  getActiveRole() {
    return getJson(STORAGE_KEYS.ACTIVE_ROLE, "Traveller");
  },
  setActiveRole(role) {
    setJson(STORAGE_KEYS.ACTIVE_ROLE, role);
    this.logActivity("Role Switched", `User switched active view to ${role}`, role, "Session User");
  },

  // Packages
  getPackages() {
    return getJson(STORAGE_KEYS.PACKAGES, initialPackages);
  },
  getPackageById(id) {
    const pkgs = this.getPackages();
    return pkgs.find(p => p.id === id || p.slug === id);
  },
  savePackage(pkgData, authorName = "Content Editor") {
    const pkgs = this.getPackages();
    const existingIndex = pkgs.findIndex(p => p.id === pkgData.id);

    let updatedPkg;
    if (existingIndex >= 0) {
      const oldPkg = pkgs[existingIndex];
      const newVersionNum = (oldPkg.version || 1) + 1;
      
      const newHistoryEntry = {
        version: newVersionNum,
        timestamp: new Date().toISOString(),
        author: authorName,
        summary: pkgData.versionSummary || `Updated package details, itinerary or seasonal pricing.`,
        dataSnapshot: {
          peakPrice: pkgData.seasonalPricing?.[0]?.pricePerPerson || 0,
          monsoonPrice: pkgData.seasonalPricing?.[1]?.pricePerPerson || 0,
          days: pkgData.days,
          status: pkgData.status
        }
      };

      updatedPkg = {
        ...pkgData,
        version: newVersionNum,
        versionHistory: [newHistoryEntry, ...(oldPkg.versionHistory || [])]
      };
      pkgs[existingIndex] = updatedPkg;

      this.logActivity(
        "Package Updated",
        `Package ${pkgData.id} (${pkgData.title}) updated to Version ${newVersionNum}. Status: ${pkgData.status}`,
        "Editor",
        authorName
      );
    } else {
      // New Package
      const newId = pkgData.id || `PKG-KL-${Math.floor(Math.random() * 90) + 10}`;
      updatedPkg = {
        ...pkgData,
        id: newId,
        version: 1,
        versionHistory: [
          {
            version: 1,
            timestamp: new Date().toISOString(),
            author: authorName,
            summary: "Initial package creation",
            dataSnapshot: {
              peakPrice: pkgData.seasonalPricing?.[0]?.pricePerPerson || 0,
              days: pkgData.days,
              status: pkgData.status
            }
          }
        ]
      };
      pkgs.unshift(updatedPkg);

      this.logActivity(
        "Package Created",
        `New package created: ${updatedPkg.id} - ${updatedPkg.title}. Status: ${updatedPkg.status}`,
        "Editor",
        authorName
      );
    }

    setJson(STORAGE_KEYS.PACKAGES, pkgs);
    return updatedPkg;
  },

  duplicatePackage(pkgId, authorName = "Content Editor") {
    const pkgs = this.getPackages();
    const source = pkgs.find(p => p.id === pkgId);
    if (!source) return null;

    const newId = `PKG-KL-${Math.floor(Math.random() * 89) + 10}`;
    const cloned = {
      ...JSON.parse(JSON.stringify(source)),
      id: newId,
      slug: `${source.slug}-copy-${Date.now().toString().slice(-4)}`,
      title: `${source.title} (Customized Copy)`,
      status: "Draft",
      version: 1,
      versionHistory: [
        {
          version: 1,
          timestamp: new Date().toISOString(),
          author: authorName,
          summary: `Duplicated from ${source.id} (${source.title})`,
          dataSnapshot: {
            peakPrice: source.seasonalPricing?.[0]?.pricePerPerson || 0,
            days: source.days,
            status: "Draft"
          }
        }
      ]
    };

    pkgs.unshift(cloned);
    setJson(STORAGE_KEYS.PACKAGES, pkgs);

    this.logActivity(
      "Package Duplicated",
      `Cloned ${source.id} into new draft ${cloned.id}`,
      "Editor",
      authorName
    );

    return cloned;
  },

  rollbackPackage(pkgId, targetVersion, authorName = "Content Editor") {
    const pkgs = this.getPackages();
    const index = pkgs.findIndex(p => p.id === pkgId);
    if (index === -1) return null;

    const currentPkg = pkgs[index];
    const targetEntry = currentPkg.versionHistory?.find(v => v.version === targetVersion);
    if (!targetEntry) return null;

    const newVersionNum = (currentPkg.version || 1) + 1;
    const restoredPkg = {
      ...currentPkg,
      version: newVersionNum,
      versionHistory: [
        {
          version: newVersionNum,
          timestamp: new Date().toISOString(),
          author: authorName,
          summary: `Restored back to snapshot from Version ${targetVersion} (${new Date(targetEntry.timestamp).toLocaleDateString()})`,
          dataSnapshot: targetEntry.dataSnapshot
        },
        ...(currentPkg.versionHistory || [])
      ]
    };

    pkgs[index] = restoredPkg;
    setJson(STORAGE_KEYS.PACKAGES, pkgs);

    this.logActivity(
      "Package Rollback",
      `Package ${pkgId} rolled back to Version ${targetVersion} snapshot. New Version: ${newVersionNum}`,
      "Editor",
      authorName
    );

    return restoredPkg;
  },

  // Enquiries
  getEnquiries() {
    return getJson(STORAGE_KEYS.ENQUIRIES, initialEnquiries);
  },
  getEnquiryById(id) {
    const list = this.getEnquiries();
    return list.find(e => e.id === id);
  },
  addEnquiry(enquiry) {
    const list = this.getEnquiries();
    const newEnquiry = {
      ...enquiry,
      id: enquiry.id || `ENQ-2026-${Math.floor(Math.random() * 899) + 100}`,
      receivedAt: enquiry.receivedAt || new Date().toISOString(),
      slaTargetMinutes: 60,
      status: enquiry.status || "New",
      quotesGenerated: enquiry.quotesGenerated || []
    };
    list.unshift(newEnquiry);
    setJson(STORAGE_KEYS.ENQUIRIES, list);

    this.logActivity(
      "New Enquiry Ingested",
      `Channel: ${newEnquiry.channel}. From: ${newEnquiry.customerName}. DPDP Consent: ${newEnquiry.dpdpConsentGiven ? 'Yes' : 'No'}`,
      "System",
      "Enquiry Gateway"
    );

    return newEnquiry;
  },
  updateEnquiry(id, updates, authorName = "Consultant") {
    const list = this.getEnquiries();
    const index = list.findIndex(e => e.id === id);
    if (index === -1) return null;

    const old = list[index];
    const updated = { ...old, ...updates };
    list[index] = updated;
    setJson(STORAGE_KEYS.ENQUIRIES, list);

    if (updates.status && updates.status !== old.status) {
      this.logActivity(
        "Enquiry Status Changed",
        `Enquiry ${id} status moved from ${old.status} -> ${updates.status}`,
        "Consultant",
        authorName
      );
    }

    return updated;
  },

  // Quotes
  getQuotes() {
    return getJson(STORAGE_KEYS.QUOTES, []);
  },
  getQuoteById(id) {
    const list = this.getQuotes();
    return list.find(q => q.id === id);
  },
  saveQuote(quote, authorName = "Consultant") {
    const list = this.getQuotes();
    const newQuote = {
      ...quote,
      id: quote.id || `QT-2026-${Math.floor(Math.random() * 899) + 100}`,
      createdAt: quote.createdAt || new Date().toISOString()
    };
    list.unshift(newQuote);
    setJson(STORAGE_KEYS.QUOTES, list);

    // Also attach to enquiry if related
    if (newQuote.enquiryId) {
      const enquiries = this.getEnquiries();
      const enq = enquiries.find(e => e.id === newQuote.enquiryId);
      if (enq) {
        enq.quotesGenerated = enq.quotesGenerated || [];
        enq.quotesGenerated.push(newQuote.id);
        enq.status = "Quoted";
        setJson(STORAGE_KEYS.ENQUIRIES, enquiries);
      }
    }

    this.logActivity(
      "Quote Created",
      `Quote ${newQuote.id} generated for ${newQuote.customerName}. Grand Total: ₹${newQuote.grandTotal.toLocaleString("en-IN")}`,
      "Consultant",
      authorName
    );

    return newQuote;
  },

  // Blogs
  getBlogs() {
    return getJson(STORAGE_KEYS.BLOGS, initialBlogs);
  },
  getBlogById(id) {
    const list = this.getBlogs();
    return list.find(b => b.id === id || b.slug === id);
  },
  saveBlog(blogData, authorName = "Content Editor") {
    const list = this.getBlogs();
    const index = list.findIndex(b => b.id === blogData.id);

    let updated;
    if (index >= 0) {
      updated = { ...list[index], ...blogData, updatedAt: new Date().toISOString() };
      list[index] = updated;
      this.logActivity("Blog Updated", `Article "${updated.title}" updated.`, "Editor", authorName);
    } else {
      updated = {
        ...blogData,
        id: blogData.id || `BLOG-${Math.floor(Math.random() * 89) + 10}`,
        publishedAt: blogData.publishedAt || new Date().toISOString()
      };
      list.unshift(updated);
      this.logActivity("Blog Published", `New article "${updated.title}" published with linked packages.`, "Editor", authorName);
    }

    setJson(STORAGE_KEYS.BLOGS, list);
    return updated;
  },

  // Redirects
  getRedirects() {
    return getJson(STORAGE_KEYS.REDIRECTS, initialRedirects);
  },
  addRedirect(redirect) {
    const list = this.getRedirects();
    list.unshift({
      ...redirect,
      id: `red-${Date.now()}`,
      hits: 0,
      lastTested: new Date().toISOString().slice(0, 10)
    });
    setJson(STORAGE_KEYS.REDIRECTS, list);
    return list;
  },

  // Activity Log
  getActivityLog() {
    return getJson(STORAGE_KEYS.LOGS, initialActivityLog);
  },
  logActivity(action, details, role = "System", user = "Automated") {
    const list = this.getActivityLog();
    const newEntry = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 100)}`,
      timestamp: new Date().toISOString(),
      action,
      details,
      role,
      user
    };
    list.unshift(newEntry);
    if (list.length > 80) list.pop(); // keep recent 80
    setJson(STORAGE_KEYS.LOGS, list);
    return newEntry;
  },

  // Reset demo
  resetToDefaults() {
    localStorage.removeItem(STORAGE_KEYS.PACKAGES);
    localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.BLOGS);
    localStorage.removeItem(STORAGE_KEYS.REDIRECTS);
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    localStorage.removeItem(STORAGE_KEYS.QUOTES);
    window.location.reload();
  }
};
