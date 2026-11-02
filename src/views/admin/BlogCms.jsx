import React, { useState } from "react";
import { ArrowLeft, Save, Plus, Trash2, Edit3, BookOpen, Link, Sparkles, Check } from "lucide-react";

export function BlogCms({ blogs = [], packages = [], onSaveBlog, onBack }) {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Backwater Secrets",
    readingTime: "5 min read",
    author: "Arun K. (Content Editor)",
    coverImage: "/images/hero-munnar.jpg",
    excerpt: "",
    content: "",
    seoTitle: "",
    seoDescription: "",
    relatedPackageIds: []
  });

  const handleStartCreate = () => {
    setSelectedBlog(null);
    setFormData({
      title: "",
      slug: "",
      category: "Destination Tips",
      readingTime: "4 min read",
      author: "Arun K. (Content Editor)",
      coverImage: "/images/hero-munnar.jpg",
      excerpt: "",
      content: "",
      seoTitle: "",
      seoDescription: "",
      relatedPackageIds: ["PKG-KL-07"]
    });
    setIsEditing(true);
  };

  const handleStartEdit = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      ...blog,
      relatedPackageIds: blog.relatedPackageIds || []
    });
    setIsEditing(true);
  };

  const togglePackageLink = (pkgId) => {
    setFormData(prev => {
      const exists = prev.relatedPackageIds.includes(pkgId);
      return {
        ...prev,
        relatedPackageIds: exists
          ? prev.relatedPackageIds.filter(id => id !== pkgId)
          : [...prev.relatedPackageIds, pkgId]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogToSave = {
      ...(selectedBlog || {}),
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      status: "Published"
    };
    onSaveBlog(blogToSave);
    setIsEditing(false);
  };

  return (
    <div className="container" style={{ padding: "1.5rem 0 4rem" }}>
      {/* Top Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={onBack} className="btn btn-outline btn-sm">
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>
          <div>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "2px" }}>
              In-House Blog & Content CMS
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--c-text-muted)" }}>
              Publish search-optimized travel journals directly on your own site and link readers to relevant holiday packages.
            </p>
          </div>
        </div>

        {!isEditing && (
          <button className="btn btn-primary" onClick={handleStartCreate}>
            <Plus size={16} />
            <span>Write New Article</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} style={{ background: "#ffffff", borderRadius: "12px", border: "1px solid var(--c-border)", padding: "2rem", boxShadow: "var(--shadow-sm)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--c-border)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.3rem", color: "var(--c-primary-dark)" }}>
              {selectedBlog ? `Edit: ${selectedBlog.title}` : "Compose Travel Article"}
            </h3>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                <Save size={14} />
                <span>Save & Publish Article</span>
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
            {/* Left Form: Content */}
            <div>
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                  Article Headline *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. The Insider Guide to Alleppey Houseboats: Day Cruise vs Overnight Voyage"
                  style={{ width: "100%", padding: "0.65rem", border: "1px solid var(--c-border)", borderRadius: "6px", fontSize: "1.05rem", fontWeight: 600 }}
                />
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                  Short Summary / Excerpt *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", border: "1px solid var(--c-border)", borderRadius: "6px", fontSize: "0.9rem" }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                  Article Body (Markdown Supported) *
                </label>
                <textarea
                  required
                  rows={12}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  style={{ width: "100%", padding: "0.85rem", border: "1px solid var(--c-border)", borderRadius: "6px", fontSize: "0.925rem", fontFamily: "monospace", lineHeight: 1.6 }}
                />
              </div>

              {/* SEO Meta Fields */}
              <div style={{ background: "#fafaf8", border: "1px solid var(--c-border)", borderRadius: "8px", padding: "1.25rem" }}>
                <h4 style={{ fontSize: "0.95rem", marginBottom: "0.75rem", color: "var(--c-primary-dark)" }}>
                  Search Engine Optimization (SEO)
                </h4>
                <div style={{ marginBottom: "0.75rem" }}>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.2rem" }}>
                    Meta Title Tag (Target 60 chars)
                  </label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    style={{ width: "100%", padding: "0.45rem", border: "1px solid var(--c-border)", borderRadius: "4px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.2rem" }}>
                    Meta Description (Target 150 chars)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.seoDescription}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    style={{ width: "100%", padding: "0.45rem", border: "1px solid var(--c-border)", borderRadius: "4px", fontSize: "0.85rem" }}
                  />
                </div>
              </div>
            </div>

            {/* Right Sidebar: Categories & Linked Packages */}
            <div>
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: "100%", padding: "0.55rem", border: "1px solid var(--c-border)", borderRadius: "6px" }}
                >
                  <option value="Backwater Secrets">Backwater Secrets</option>
                  <option value="Destination Tips">Destination Tips</option>
                  <option value="Culture & Heritage">Culture & Heritage</option>
                  <option value="Honeymoon Guides">Honeymoon Guides</option>
                </select>
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                  Estimated Reading Time
                </label>
                <input
                  type="text"
                  value={formData.readingTime}
                  onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                  style={{ width: "100%", padding: "0.55rem", border: "1px solid var(--c-border)", borderRadius: "6px" }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  style={{ width: "100%", padding: "0.55rem", border: "1px solid var(--c-border)", borderRadius: "6px" }}
                />
              </div>

              {/* CRITICAL: Linked Packages Checklist */}
              <div style={{ background: "var(--c-primary-subtle)", border: "1px solid rgba(25,56,43,0.2)", borderRadius: "8px", padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.4rem" }}>
                  <Link size={15} style={{ color: "var(--c-accent)" }} />
                  <span style={{ fontWeight: 700, color: "var(--c-primary-dark)", fontSize: "0.85rem" }}>
                    Linked Holiday Packages
                  </span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--c-text-muted)", marginBottom: "0.75rem" }}>
                  Select which packages appear embedded at the end of this blog to convert readers into bookings:
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {packages.map(p => {
                    const isChecked = formData.relatedPackageIds.includes(p.id);
                    return (
                      <label 
                        key={p.id}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          background: "#ffffff",
                          padding: "0.5rem 0.65rem",
                          borderRadius: "4px",
                          border: isChecked ? "1.5px solid var(--c-primary)" : "1px solid var(--c-border)",
                          cursor: "pointer",
                          fontSize: "0.8rem"
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => togglePackageLink(p.id)}
                          style={{ accentColor: "var(--c-primary)", marginTop: "2px" }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: "var(--c-primary-dark)" }}>
                            {p.id}: {p.title}
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "var(--c-text-muted)" }}>
                            {p.days} Days • {p.destination}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        /* Blog List Table */
        <div style={{ background: "#ffffff", borderRadius: "10px", border: "1px solid var(--c-border)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ background: "#fafaf8", textAlign: "left", color: "var(--c-text-muted)", borderBottom: "1px solid var(--c-border)", fontSize: "0.78rem", textTransform: "uppercase" }}>
                <th style={{ padding: "0.85rem 1rem" }}>Article Headline</th>
                <th style={{ padding: "0.85rem 1rem" }}>Category</th>
                <th style={{ padding: "0.85rem 1rem" }}>Author</th>
                <th style={{ padding: "0.85rem 1rem" }}>Linked Packages</th>
                <th style={{ padding: "0.85rem 1rem" }}>Status</th>
                <th style={{ padding: "0.85rem 1rem", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog.id} style={{ borderBottom: "1px solid var(--c-border)" }}>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ fontWeight: 700, color: "var(--c-primary-dark)" }}>
                      {blog.title}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--c-text-light)" }}>
                      /{blog.slug} • {blog.readingTime}
                    </div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <span style={{ fontSize: "0.75rem", background: "#f1f5f9", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                      {blog.category}
                    </span>
                  </td>
                  <td style={{ padding: "1rem", color: "var(--c-text-muted)" }}>
                    {blog.author}
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                      {blog.relatedPackageIds?.map(id => (
                        <span key={id} style={{ fontSize: "0.72rem", background: "var(--c-primary-subtle)", color: "var(--c-primary)", padding: "0.15rem 0.4rem", borderRadius: "3px", fontWeight: 600 }}>
                          {id}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <span className="card-badge-status badge-published" style={{ position: "static" }}>
                      {blog.status}
                    </span>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right" }}>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => handleStartEdit(blog)}
                    >
                      <Edit3 size={13} />
                      <span>Edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
