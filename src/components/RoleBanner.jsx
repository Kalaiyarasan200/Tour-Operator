import React from "react";
import { User, Shield, Sparkles, RefreshCw, BarChart3, AlertCircle } from "lucide-react";

export function RoleBanner({ activeRole, onSelectRole, onResetData, onOpenMetrics }) {
  const roles = [
    { id: "Traveller", label: "Traveller", icon: User, desc: "Explore packages, view day-by-day itineraries & submit enquiry" },
    { id: "Consultant", label: "Consultant (Rahul / Priya)", icon: Sparkles, desc: "Manage unified inbox, 1-hr SLA clock, AI extraction & send quotes" },
    { id: "Editor", label: "Editor (Arun K.)", icon: User, desc: "Package CMS, seasonal pricing matrix, version history & rollback" },
    { id: "Admin", label: "Founder-MD", icon: Shield, desc: "Operations head, revenue recovery tracker, 140 URL redirects & audit log" }
  ];

  return (
    <div className="role-bar no-print">
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontWeight: 600, color: "#fff" }}>
          <Shield size={14} style={{ color: "var(--c-accent)" }} />
          <span>Active Role:</span>
        </span>
        <div className="role-chips">
          {roles.map(r => {
            const Icon = r.icon;
            const isActive = activeRole === r.id;
            return (
              <button
                key={r.id}
                className={`role-chip ${isActive ? "active" : ""}`}
                onClick={() => onSelectRole(r.id)}
                title={r.desc}
              >
                <Icon size={12} />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          onClick={onOpenMetrics}
          style={{
            background: "rgba(196, 139, 56, 0.25)",
            border: "1px solid var(--c-accent)",
            color: "#fff",
            fontSize: "0.75rem",
            padding: "0.25rem 0.65rem",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            fontWeight: 600
          }}
          title="Inspect ₹66.82 Lakh/year problem vs recovered revenue"
        >
          <BarChart3 size={13} style={{ color: "var(--c-accent)" }} />
          <span>ROI & Revenue Tracker (₹66.82L Recovery)</span>
        </button>

        <button
          onClick={onResetData}
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.75rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem"
          }}
          title="Reset seed data to original defaults"
        >
          <RefreshCw size={11} />
          <span>Reset Demo</span>
        </button>
      </div>
    </div>
  );
}
