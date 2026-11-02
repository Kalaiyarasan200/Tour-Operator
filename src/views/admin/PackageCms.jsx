import React, { useState } from "react";
import { 
  Package, Plus, Search, Edit3, Copy, Eye, Clock, 
  CheckCircle, ArrowUpRight, History, Calendar 
} from "lucide-react";
import { quoteCalculator } from "../../services/quoteCalculator";

export function PackageCms({ 
  packages = [], 
  onEditPackage, 
  onCreatePackage, 
  onDuplicatePackage, 
  onPreviewPackage 
}) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = packages.filter(pkg => {
    if (filterStatus !== "all" && pkg.status.toLowerCase() !== filterStatus.toLowerCase()) return false;
    if (search) {
      const q = search.toLowerCase();
      const match = (pkg.id + " " + pkg.title + " " + (pkg.destination || "")).toLowerCase();
      if (!match.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="container" style={{ padding: "1.5rem 0 4rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "0.2rem" }}>
            Package CMS (Self-Service)
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--c-text-muted)" }}>
            Create or update packages and seasonal prices in-house in under 5 minutes without technical fees.
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={onCreatePackage}
        >
          <Plus size={16} />
          <span>Create New Package</span>
        </button>
      </div>

      {/* KPI & Cost Saving Highlight Banner */}
      <div style={{
        background: "var(--c-primary-subtle)",
        border: "1px solid rgba(25,56,43,0.15)",
        borderRadius: "10px",
        padding: "1rem 1.5rem",
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--c-primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: "var(--c-primary-dark)", fontSize: "0.95rem" }}>
              In-House Turnaround: ~4 Minutes vs 3 Days
            </div>
            <p style={{ fontSize: "0.825rem", color: "var(--c-text-muted)", margin: 0 }}>
              Saving ₹14.4 Lakh/year in legacy freelancer web maintenance fees (40 edits/mo × ₹3,000 saved).
            </p>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--c-accent-dark)", fontWeight: 700 }}>
            Total Packages
          </span>
          <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--c-primary-dark)" }}>
            {packages.length} Active / Draft
          </div>
        </div>
      </div>

      {/* Filters and Search Strip */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["all", "published", "draft"].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              style={{
                background: filterStatus === st ? "var(--c-primary)" : "#ffffff",
                color: filterStatus === st ? "#ffffff" : "var(--c-text-muted)",
                border: "1px solid var(--c-border)",
                padding: "0.4rem 0.85rem",
                borderRadius: "6px",
                fontSize: "0.825rem",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize"
              }}
            >
              {st}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", width: "300px" }}>
          <input
            type="text"
            placeholder="Search packages by ID or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "0.5rem 0.75rem 0.5rem 2rem", border: "1px solid var(--c-border)", borderRadius: "6px", fontSize: "0.825rem" }}
          />
          <Search size={14} style={{ position: "absolute", left: "9px", top: "11px", color: "var(--c-text-light)" }} />
        </div>
      </div>

      {/* Packages Table */}
      <div style={{ background: "#ffffff", borderRadius: "10px", border: "1px solid var(--c-border)", overflow: "hidden", boxShadow: "var(--shadow-xs)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#fafaf8", borderBottom: "1px solid var(--c-border)", textAlign: "left", fontSize: "0.78rem", color: "var(--c-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "0.85rem 1rem" }}>Package ID & Title</th>
              <th style={{ padding: "0.85rem 1rem" }}>Destination</th>
              <th style={{ padding: "0.85rem 1rem" }}>Duration</th>
              <th style={{ padding: "0.85rem 1rem" }}>Seasonal Prices</th>
              <th style={{ padding: "0.85rem 1rem" }}>Version</th>
              <th style={{ padding: "0.85rem 1rem" }}>Status</th>
              <th style={{ padding: "0.85rem 1rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(pkg => {
              const peakSeason = pkg.seasonalPricing?.[0] || {};
              const monsoonSeason = pkg.seasonalPricing?.[1] || {};

              return (
                <tr key={pkg.id} style={{ borderBottom: "1px solid var(--c-border)", fontSize: "0.875rem" }}>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <img 
                        src={pkg.coverImage || "/images/hero-munnar.jpg"} 
                        alt="" 
                        style={{ width: 44, height: 44, borderRadius: "6px", objectFit: "cover" }} 
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: "var(--c-primary-dark)" }}>
                          {pkg.title}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--c-text-light)" }}>
                          ID: {pkg.id} • {pkg.hotelCategory}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: "1rem", color: "var(--c-text-muted)" }}>
                    {pkg.destination}
                  </td>

                  <td style={{ padding: "1rem", color: "var(--c-text-muted)" }}>
                    {pkg.days} Days / {pkg.nights || (pkg.days - 1)} Nights
                  </td>

                  <td style={{ padding: "1rem" }}>
                    <div style={{ fontWeight: 600, color: "var(--c-primary)" }}>
                      Peak: {quoteCalculator.formatINR(peakSeason.pricePerPerson || pkg.basePriceDisplay)}
                    </div>
                    {monsoonSeason.pricePerPerson && (
                      <div style={{ fontSize: "0.72rem", color: "var(--c-text-muted)" }}>
                        Monsoon: {quoteCalculator.formatINR(monsoonSeason.pricePerPerson)}
                      </div>
                    )}
                  </td>

                  <td style={{ padding: "1rem" }}>
                    <span style={{ fontSize: "0.75rem", background: "#f1f5f9", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: 600 }}>
                      v{pkg.version || 1}
                    </span>
                  </td>

                  <td style={{ padding: "1rem" }}>
                    <span className={`card-badge-status ${pkg.status === 'Published' ? 'badge-published' : 'badge-draft'}`} style={{ position: "static" }}>
                      {pkg.status}
                    </span>
                  </td>

                  <td style={{ padding: "1rem", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "0.35rem", justifyContent: "flex-end" }}>
                      <button
                        onClick={() => onPreviewPackage(pkg)}
                        className="btn btn-outline btn-sm"
                        title="View Public Page"
                        style={{ padding: "0.35rem 0.6rem" }}
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </button>

                      <button
                        onClick={() => onDuplicatePackage(pkg.id)}
                        className="btn btn-outline btn-sm"
                        title="Clone package"
                        style={{ padding: "0.35rem 0.6rem" }}
                      >
                        <Copy size={13} />
                      </button>

                      <button
                        onClick={() => onEditPackage(pkg)}
                        className="btn btn-primary btn-sm"
                        style={{ padding: "0.35rem 0.75rem" }}
                      >
                        <Edit3 size={13} />
                        <span>Edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
