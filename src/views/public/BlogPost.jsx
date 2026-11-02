import React from "react";
import { ArrowLeft, Calendar, Clock, User, Share2, Compass, Send } from "lucide-react";
import { quoteCalculator } from "../../services/quoteCalculator";

export function BlogPost({ blog, allPackages = [], onBack, onSelectPackage, onOpenEnquiry }) {
  if (!blog) return null;

  // Find linked packages
  const linkedPackages = (blog.relatedPackageIds || [])
    .map(pkgId => allPackages.find(p => p.id === pkgId))
    .filter(Boolean);

  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Back button bar */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid var(--c-border)", padding: "0.85rem 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={onBack} className="btn btn-outline btn-sm">
            <ArrowLeft size={14} />
            <span>All Articles</span>
          </button>
          <span style={{ fontSize: "0.8rem", color: "var(--c-text-muted)" }}>
            Category: <strong>{blog.category}</strong>
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="container" style={{ maxWidth: "800px", paddingTop: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <span style={{ background: "var(--c-accent-subtle)", color: "var(--c-accent-dark)", fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "99px" }}>
            {blog.category}
          </span>
          <span style={{ fontSize: "0.8rem", color: "var(--c-text-light)" }}>•</span>
          <span style={{ fontSize: "0.8rem", color: "var(--c-text-muted)" }}>{blog.readingTime}</span>
        </div>

        <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", marginBottom: "1.25rem", color: "var(--c-primary-dark)" }}>
          {blog.title}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", borderBottom: "1px solid var(--c-border)", paddingBottom: "1.5rem", marginBottom: "2rem", fontSize: "0.85rem", color: "var(--c-text-muted)" }}>
          <span style={{ fontWeight: 600, color: "var(--c-primary)" }}>{blog.author}</span>
          <span>•</span>
          <span>{new Date(blog.publishedAt || Date.now()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
        </div>

        {/* Featured Cover Image */}
        {blog.coverImage && (
          <div style={{ marginBottom: "2.5rem", borderRadius: "12px", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
            <img 
              src={blog.coverImage} 
              alt={blog.title}
              style={{ width: "100%", maxHeight: "450px", objectFit: "cover" }}
            />
          </div>
        )}

        {/* Article Body */}
        <div 
          style={{ 
            fontSize: "1.05rem", 
            lineHeight: 1.8, 
            color: "var(--c-text-main)", 
            whiteSpace: "pre-wrap",
            marginBottom: "3rem"
          }}
        >
          {blog.content}
        </div>

        {/* CRITICAL FEATURE: Embedded Related Packages to drive booking conversions! */}
        {linkedPackages.length > 0 && (
          <div style={{ 
            background: "var(--c-primary-subtle)", 
            border: "1px solid rgba(25,56,43,0.2)", 
            borderRadius: "14px", 
            padding: "2rem", 
            marginTop: "3rem" 
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <Compass size={18} style={{ color: "var(--c-accent)" }} />
              <h3 style={{ fontSize: "1.35rem", color: "var(--c-primary-dark)", margin: 0 }}>
                Featured Packages in this Article
              </h3>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--c-text-muted)", marginBottom: "1.5rem" }}>
              Experience the exact destinations and private houseboats featured above:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {linkedPackages.map(pkg => (
                <div 
                  key={pkg.id}
                  style={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    border: "1px solid var(--c-border)",
                    padding: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1.5rem",
                    boxShadow: "var(--shadow-xs)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <img 
                      src={pkg.coverImage || "/images/hero-munnar.jpg"} 
                      alt="" 
                      style={{ width: 80, height: 60, borderRadius: "6px", objectFit: "cover" }}
                    />
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "var(--c-accent-dark)", fontWeight: 700, textTransform: "uppercase" }}>
                        {pkg.destination} • {pkg.days} Days
                      </div>
                      <h4 style={{ fontSize: "1.05rem", color: "var(--c-primary-dark)", margin: "2px 0" }}>
                        {pkg.title}
                      </h4>
                      <div style={{ fontSize: "0.78rem", color: "var(--c-text-muted)" }}>
                        From <strong>{quoteCalculator.formatINR(pkg.basePriceDisplay)}</strong> / person twin sharing (+5% GST)
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => onSelectPackage(pkg)}
                    >
                      View Itinerary
                    </button>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => onOpenEnquiry(pkg)}
                    >
                      <Send size={13} />
                      <span>Enquire</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function BlogList({ blogs = [], onSelectBlog, onOpenBlogCms }) {
  const [selectedCat, setSelectedCat] = useState("All");

  const filtered = blogs.filter(b => {
    if (selectedCat !== "All" && b.category !== selectedCat) return false;
    return true;
  });

  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem" }}>
          <div>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--c-accent-dark)", fontWeight: 700 }}>
              The Malabar Journal
            </span>
            <h1 style={{ marginTop: "0.25rem", marginBottom: "0.5rem" }}>
              Travel Notes & Insider Guides
            </h1>
            <p>Direct from our 48 tour consultants, naturalists, and local coordinators in Kerala.</p>
          </div>

          {onOpenBlogCms && (
            <button className="btn btn-outline btn-sm" onClick={onOpenBlogCms}>
              Manage Blog CMS
            </button>
          )}
        </div>

        {/* Categories */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {["All", "Backwater Secrets", "Destination Tips", "Culture & Heritage"].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              style={{
                background: selectedCat === cat ? "var(--c-primary)" : "#ffffff",
                color: selectedCat === cat ? "#ffffff" : "var(--c-text-muted)",
                border: "1px solid var(--c-border)",
                padding: "0.45rem 1rem",
                borderRadius: "99px",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "2.5rem" }}>
          {filtered.map(blog => (
            <div 
              key={blog.id}
              onClick={() => onSelectBlog(blog)}
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                border: "1px solid var(--c-border)",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "var(--shadow-xs)",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ height: "220px", overflow: "hidden" }}>
                <img 
                  src={blog.coverImage || "/images/alleppey-houseboat.jpg"} 
                  alt={blog.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                />
              </div>

              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "var(--c-text-muted)", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: 700, color: "var(--c-accent-dark)" }}>{blog.category}</span>
                  <span>•</span>
                  <span>{blog.readingTime}</span>
                </div>

                <h3 style={{ fontSize: "1.3rem", lineHeight: 1.3, marginBottom: "0.75rem", color: "var(--c-primary-dark)" }}>
                  {blog.title}
                </h3>

                <p style={{ fontSize: "0.9rem", color: "var(--c-text-muted)", lineHeight: 1.6, marginBottom: "1.25rem", flex: 1 }}>
                  {blog.excerpt}
                </p>

                <div style={{ borderTop: "1px solid var(--c-border)", paddingTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.78rem" }}>
                  <span style={{ color: "var(--c-text-muted)" }}>By {blog.author}</span>
                  <span style={{ color: "var(--c-primary)", fontWeight: 700 }}>Read Article ➔</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
