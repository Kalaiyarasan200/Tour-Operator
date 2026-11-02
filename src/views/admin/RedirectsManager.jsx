import React, { useState } from "react";
import { Layers, ArrowRight, CheckCircle2, Search, ExternalLink, Code2, ShieldCheck } from "lucide-react";
import { storageService } from "../../services/storageService";

export function RedirectsManager({ onBack }) {
  const [redirects, setRedirects] = useState(storageService.getRedirects());
  const [testUrl, setTestUrl] = useState("/packages.php?pkg_id=7");
  const [testResult, setTestResult] = useState(null);
  const [search, setSearch] = useState("");
  const [viewTab, setViewTab] = useState("redirects"); // redirects, sitemap

  const handleTestRedirect = (e) => {
    e.preventDefault();
    const cleanTest = testUrl.trim();
    const match = redirects.find(r => r.oldPath.toLowerCase() === cleanTest.toLowerCase());
    if (match) {
      setTestResult({
        found: true,
        oldPath: match.oldPath,
        newPath: match.newPath,
        code: match.httpCode,
        hits: match.hits
      });
    } else {
      setTestResult({
        found: false,
        oldPath: cleanTest,
        message: "No explicit redirect rule found. Will fallback to 404 with custom 301 suggested rule."
      });
    }
  };

  const filteredRedirects = redirects.filter(r => {
    if (!search) return true;
    const q = search.toLowerCase();
    return r.oldPath.toLowerCase().includes(q) || r.newPath.toLowerCase().includes(q);
  });

  return (
    <div className="container" style={{ padding: "1.5rem 0 4rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "0.2rem" }}>
            SEO Architecture & 140 Legacy URL Redirects
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--c-text-muted)" }}>
            Preserving 6 years of Google search rankings: 140 legacy .php URLs mapped 301 to modern clean URLs.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            className={`btn ${viewTab === "redirects" ? "btn-primary" : "btn-outline"} btn-sm`}
            onClick={() => setViewTab("redirects")}
          >
            <Layers size={14} />
            <span>140 Redirects Registry</span>
          </button>
          <button
            className={`btn ${viewTab === "sitemap" ? "btn-primary" : "btn-outline"} btn-sm`}
            onClick={() => setViewTab("sitemap")}
          >
            <Code2 size={14} />
            <span>XML Sitemap</span>
          </button>
        </div>
      </div>

      {viewTab === "sitemap" ? (
        /* XML Sitemap Viewer */
        <div style={{ background: "#ffffff", borderRadius: "10px", border: "1px solid var(--c-border)", padding: "1.5rem", boxShadow: "var(--shadow-xs)" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--c-primary-dark)" }}>
            Google-Ready XML Sitemap Preview (sitemap.xml)
          </h3>
          <p style={{ fontSize: "0.825rem", color: "var(--c-text-muted)", marginBottom: "1rem" }}>
            Server-rendered clean canonical URLs with priority and change frequencies:
          </p>
          <pre style={{ background: "#18201b", color: "#a5f3fc", padding: "1.25rem", borderRadius: "8px", overflowX: "auto", fontSize: "0.8rem", lineHeight: 1.6 }}>
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Public Landing Pages -->
  <url>
    <loc>https://www.companya-kochi.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.companya-kochi.com/packages</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Server-Rendered Package URLs -->
  <url>
    <loc>https://www.companya-kochi.com/packages/PKG-KL-07-munnar-thekkady-alleppey-houseboat</loc>
    <lastmod>2026-11-02</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://www.companya-kochi.com/packages/PKG-KL-15-kumarakom-marari-honeymoon-retreat</loc>
    <lastmod>2026-10-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>https://www.companya-kochi.com/packages/PKG-SI-12-madurai-rameswaram-kanyakumari</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>

  <!-- In-House Blog Travel Journal Articles -->
  <url>
    <loc>https://www.companya-kochi.com/blog/alleppey-houseboat-guide-day-cruise-vs-overnight</loc>
    <lastmod>2026-10-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.companya-kochi.com/blog/best-time-to-visit-munnar-tea-gardens</loc>
    <lastmod>2026-09-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
</urlset>`}
          </pre>
        </div>
      ) : (
        /* Redirects Registry & Live Tester */
        <div>
          {/* Live Redirect Tester Box */}
          <div style={{ background: "var(--c-accent-subtle)", border: "1px solid rgba(196,139,56,0.3)", borderRadius: "10px", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
            <div style={{ fontWeight: 700, color: "var(--c-primary-dark)", fontSize: "0.95rem", marginBottom: "0.4rem" }}>
              Live 301 Redirect Tester
            </div>
            <p style={{ fontSize: "0.825rem", color: "var(--c-text-muted)", marginBottom: "0.85rem" }}>
              Test any legacy 6-year-old URL from the freelancer's WordPress / PHP site:
            </p>

            <form onSubmit={handleTestRedirect} style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                placeholder="/packages.php?pkg_id=7"
                style={{ flex: 1, padding: "0.55rem 0.85rem", border: "1px solid var(--c-border)", borderRadius: "6px", fontSize: "0.9rem", background: "#ffffff" }}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                <span>Test Route</span>
              </button>
            </form>

            {testResult && (
              <div style={{ marginTop: "1rem", background: "#ffffff", border: "1px solid var(--c-border)", borderRadius: "6px", padding: "0.85rem 1rem", fontSize: "0.85rem" }}>
                {testResult.found ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--c-success)", fontWeight: 600 }}>
                    <CheckCircle2 size={16} />
                    <span>
                      HTTP {testResult.code} Permanent Redirect: <code>{testResult.oldPath}</code> ➔ <code>{testResult.newPath}</code> ({testResult.hits} preserved hits)
                    </span>
                  </div>
                ) : (
                  <div style={{ color: "var(--c-danger)" }}>
                    {testResult.message}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search bar & count */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div style={{ fontSize: "0.875rem", color: "var(--c-text-muted)" }}>
              Registered Rules: <strong>{redirects.length} Active 301 Maps</strong>
            </div>

            <div style={{ position: "relative", width: "320px" }}>
              <input
                type="text"
                placeholder="Search legacy URL or target..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", padding: "0.45rem 0.75rem 0.45rem 2rem", border: "1px solid var(--c-border)", borderRadius: "6px", fontSize: "0.825rem" }}
              />
              <Search size={14} style={{ position: "absolute", left: "9px", top: "10px", color: "var(--c-text-light)" }} />
            </div>
          </div>

          {/* 140 Table */}
          <div style={{ background: "#ffffff", borderRadius: "10px", border: "1px solid var(--c-border)", overflow: "hidden", maxHeight: "550px", overflowY: "auto", boxShadow: "var(--shadow-xs)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead style={{ position: "sticky", top: 0, background: "#fafaf8", zIndex: 10 }}>
                <tr style={{ textAlign: "left", color: "var(--c-text-muted)", borderBottom: "1px solid var(--c-border)", fontSize: "0.75rem", textTransform: "uppercase" }}>
                  <th style={{ padding: "0.75rem 1rem" }}>Legacy URL (Old Site)</th>
                  <th style={{ padding: "0.75rem 1rem" }}>HTTP</th>
                  <th style={{ padding: "0.75rem 1rem" }}>New Clean Destination</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Category</th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "right" }}>Traffic Hits</th>
                </tr>
              </thead>
              <tbody>
                {filteredRedirects.slice(0, 35).map(r => (
                  <tr key={r.id} style={{ borderBottom: "1px solid var(--c-border)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", color: "#991b1b" }}>
                      {r.oldPath}
                    </td>
                    <td style={{ padding: "0.75rem 1rem" }}>
                      <span style={{ fontSize: "0.72rem", background: "#dcfce7", color: "#16a34a", padding: "0.15rem 0.45rem", borderRadius: "4px", fontWeight: 700 }}>
                        {r.httpCode}
                      </span>
                    </td>
                    <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", color: "var(--c-primary)", fontWeight: 600 }}>
                      {r.newPath}
                    </td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--c-text-muted)", fontSize: "0.8rem" }}>
                      {r.category}
                    </td>
                    <td style={{ padding: "0.75rem 1rem", textAlign: "right", fontWeight: 600 }}>
                      {r.hits}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--c-text-light)", textAlign: "center", marginTop: "0.75rem" }}>
            Showing 35 of 140 mapped redirects. Complete registry loaded into web router.
          </div>
        </div>
      )}
    </div>
  );
}
