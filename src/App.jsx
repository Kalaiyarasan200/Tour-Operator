import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { RoleBanner } from "./components/RoleBanner";
import { Footer } from "./components/Footer";

// Public Views
import { PublicHome } from "./views/public/PublicHome";
import { PackageDetail } from "./views/public/PackageDetail";
import { BlogList, BlogPost } from "./views/public/BlogPost";
import { EnquiryModal } from "./views/public/EnquiryModal";
import { PublicQuoteView } from "./views/public/PublicQuoteView";

// Admin Views
import { AdminInbox } from "./views/admin/AdminInbox";
import { PackageCms } from "./views/admin/PackageCms";
import { PackageEditor } from "./views/admin/PackageEditor";
import { BlogCms } from "./views/admin/BlogCms";
import { RedirectsManager } from "./views/admin/RedirectsManager";
import { BusinessMetrics } from "./views/admin/BusinessMetrics";

// Services
import { storageService } from "./services/storageService";

export default function App() {
  const [activeRole, setActiveRole] = useState(storageService.getActiveRole() || "Traveller");
  const [activeView, setActiveView] = useState("home"); // home, package-detail, blogs, blog-post, inbox, cms-packages, cms-package-edit, cms-blogs, redirects, public-quote, metrics

  // Data collections synced with local storage
  const [packages, setPackages] = useState(storageService.getPackages());
  const [enquiries, setEnquiries] = useState(storageService.getEnquiries());
  const [blogs, setBlogs] = useState(storageService.getBlogs());
  const [quotes, setQuotes] = useState(storageService.getQuotes());

  // Active selections
  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [selectedBlog, setSelectedBlog] = useState(blogs[0]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [selectedEnquiryId, setSelectedEnquiryId] = useState(enquiries[0]?.id);

  // Modals
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryModalPackage, setEnquiryModalPackage] = useState(null);
  const [isQuoteBuilderOpen, setIsQuoteBuilderOpen] = useState(false);
  const [quoteBuilderEnquiry, setQuoteBuilderEnquiry] = useState(null);

  // Listen to custom cross-view events
  useEffect(() => {
    const handleNavToInbox = (e) => {
      if (e.detail) setSelectedEnquiryId(e.detail);
      setActiveView("inbox");
      setActiveRole("Consultant");
    };

    const handleOpenQuotePublic = (e) => {
      if (e.detail) {
        setSelectedQuote(e.detail);
        setActiveView("public-quote");
      }
    };

    window.addEventListener("navToInbox", handleNavToInbox);
    window.addEventListener("openQuotePublic", handleOpenQuotePublic);

    return () => {
      window.removeEventListener("navToInbox", handleNavToInbox);
      window.removeEventListener("openQuotePublic", handleOpenQuotePublic);
    };
  }, []);

  // Sync role changes
  const handleRoleChange = (newRole) => {
    setActiveRole(newRole);
    storageService.setActiveRole(newRole);

    // Auto-route to primary view for role
    if (newRole === "Consultant") {
      setActiveView("inbox");
    } else if (newRole === "Editor") {
      setActiveView("cms-packages");
    } else if (newRole === "Admin") {
      setActiveView("metrics");
    } else if (newRole === "Traveller") {
      setActiveView("home");
    }
  };

  // Urgent enquiries (<15 mins remaining on 1-hour SLA)
  const urgentCount = enquiries.filter(e => {
    if (e.status === "Quoted" || e.status === "Booked") return false;
    const elapsedMinutes = Math.floor((Date.now() - new Date(e.receivedAt).getTime()) / 60000);
    return (60 - elapsedMinutes) < 25;
  }).length;

  // Open Enquiry Modal
  const handleOpenEnquiryModal = (pkg = null) => {
    setEnquiryModalPackage(pkg);
    setIsEnquiryModalOpen(true);
  };

  const handleEnquiryCreated = (newEnquiry) => {
    setEnquiries(storageService.getEnquiries());
  };

  // Package Management Handlers
  const handleSavePackage = (pkgData) => {
    const saved = storageService.savePackage(pkgData, activeRole === "Admin" ? "Founder-MD" : "Arun K. (Editor)");
    setPackages(storageService.getPackages());
    setSelectedPackage(saved);
    setActiveView("cms-packages");
    alert(`Package ${saved.id} (${saved.title}) saved successfully as Version ${saved.version}!`);
  };

  const handleDuplicatePackage = (pkgId) => {
    const cloned = storageService.duplicatePackage(pkgId, "Content Editor");
    if (cloned) {
      setPackages(storageService.getPackages());
      setSelectedPackage(cloned);
      setActiveView("cms-package-edit");
      alert(`Package cloned into new draft ${cloned.id}! You can customize it now.`);
    }
  };

  const handleRollbackPackage = (pkgId, targetVersion) => {
    const restored = storageService.rollbackPackage(pkgId, targetVersion, "Content Editor");
    if (restored) {
      setPackages(storageService.getPackages());
      setSelectedPackage(restored);
      alert(`Restored package ${pkgId} back to Version ${targetVersion}! Current Version is now v${restored.version}.`);
    }
  };

  // Enquiry Update Handler
  const handleUpdateEnquiry = (enquiryId, updates) => {
    storageService.updateEnquiry(enquiryId, updates, activeRole === "Admin" ? "Founder-MD" : "Rahul M. (Consultant)");
    setEnquiries(storageService.getEnquiries());
  };

  // Quote Builder Trigger
  const handleOpenQuoteBuilder = (enquiry, pkg, extracted) => {
    setQuoteBuilderEnquiry(enquiry);
    setSelectedPackage(pkg || packages.find(p => p.id === enquiry?.sourcePackageId) || packages[0]);
    setIsQuoteBuilderOpen(true);
  };

  const handleQuoteGenerated = (newQuote) => {
    setQuotes(storageService.getQuotes());
    setEnquiries(storageService.getEnquiries());
  };

  // Blog Management Handlers
  const handleSaveBlog = (blogData) => {
    storageService.saveBlog(blogData, "Arun K. (Editor)");
    setBlogs(storageService.getBlogs());
    alert(`Article "${blogData.title}" saved and linked packages updated!`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Role Switcher Toolbar */}
      <RoleBanner
        activeRole={activeRole}
        onSelectRole={handleRoleChange}
        onResetData={() => {
          if (window.confirm("Reset all packages, enquiries, and blogs back to original demo state?")) {
            storageService.resetToDefaults();
          }
        }}
        onOpenMetrics={() => setActiveView("metrics")}
      />

      {/* Main Header / Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenEnquiry={handleOpenEnquiryModal}
        urgentEnquiriesCount={urgentCount}
      />

      {/* Primary View Routing */}
      <main style={{ flex: 1 }}>
        {/* 1. Public Home View */}
        {activeView === "home" && (
          <PublicHome
            packages={packages.filter(p => activeRole === "Traveller" ? p.status === "Published" : true)}
            onSelectPackage={(pkg) => {
              setSelectedPackage(pkg);
              setActiveView("package-detail");
            }}
            onOpenEnquiry={handleOpenEnquiryModal}
            onSelectBlog={(b) => {
              setSelectedBlog(b);
              setActiveView("blog-post");
            }}
          />
        )}

        {/* 2. Public Package Detail View */}
        {activeView === "package-detail" && selectedPackage && (
          <PackageDetail
            packageData={selectedPackage}
            onBack={() => setActiveView("home")}
            onOpenEnquiry={handleOpenEnquiryModal}
            onEditPackage={activeRole !== "Traveller" ? (pkg) => {
              setSelectedPackage(pkg);
              setActiveView("cms-package-edit");
            } : null}
          />
        )}

        {/* 3. Travel Journal Blog List */}
        {activeView === "blogs" && (
          <BlogList
            blogs={blogs}
            onSelectBlog={(b) => {
              setSelectedBlog(b);
              setActiveView("blog-post");
            }}
            onOpenBlogCms={activeRole !== "Traveller" ? () => setActiveView("cms-blogs") : null}
          />
        )}

        {/* 4. Travel Journal Blog Post */}
        {activeView === "blog-post" && selectedBlog && (
          <BlogPost
            blog={selectedBlog}
            allPackages={packages}
            onBack={() => setActiveView("blogs")}
            onSelectPackage={(pkg) => {
              setSelectedPackage(pkg);
              setActiveView("package-detail");
            }}
            onOpenEnquiry={handleOpenEnquiryModal}
          />
        )}

        {/* 5. Unified Admin Inbox & AI Co-Pilot */}
        {activeView === "inbox" && (
          <AdminInbox
            enquiries={enquiries}
            packages={packages}
            onUpdateEnquiry={handleUpdateEnquiry}
            onBuildQuote={handleOpenQuoteBuilder}
            selectedEnquiryId={selectedEnquiryId}
            setSelectedEnquiryId={setSelectedEnquiryId}
          />
        )}

        {/* 6. Package CMS List */}
        {activeView === "cms-packages" && (
          <PackageCms
            packages={packages}
            onEditPackage={(pkg) => {
              setSelectedPackage(pkg);
              setActiveView("cms-package-edit");
            }}
            onCreatePackage={() => {
              setSelectedPackage(null);
              setActiveView("cms-package-edit");
            }}
            onDuplicatePackage={handleDuplicatePackage}
            onPreviewPackage={(pkg) => {
              setSelectedPackage(pkg);
              setActiveView("package-detail");
            }}
          />
        )}

        {/* 7. Package CMS Editor */}
        {activeView === "cms-package-edit" && (
          <PackageEditor
            initialPackage={selectedPackage}
            onSave={handleSavePackage}
            onBack={() => setActiveView("cms-packages")}
            onDuplicate={handleDuplicatePackage}
            onRollback={handleRollbackPackage}
          />
        )}

        {/* 8. Blog CMS */}
        {activeView === "cms-blogs" && (
          <BlogCms
            blogs={blogs}
            packages={packages}
            onSaveBlog={handleSaveBlog}
            onBack={() => setActiveView("blogs")}
          />
        )}

        {/* 9. SEO & 140 Legacy URL Redirects */}
        {activeView === "redirects" && (
          <RedirectsManager
            onBack={() => setActiveView("home")}
          />
        )}

        {/* 10. Public Quote Branded PDF View */}
        {activeView === "public-quote" && selectedQuote && (
          <PublicQuoteView
            quote={selectedQuote}
            onBack={() => setActiveView(activeRole === "Traveller" ? "home" : "inbox")}
          />
        )}

        {/* 11. Founder-MD Business ROI Dashboard */}
        {activeView === "metrics" && (
          <BusinessMetrics
            onBack={() => setActiveView("home")}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        setActiveView={setActiveView}
        onOpenEnquiry={handleOpenEnquiryModal}
      />

      {/* Enquiry Capture Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        selectedPackage={enquiryModalPackage}
        onSuccess={handleEnquiryCreated}
      />
    </div>
  );
}
