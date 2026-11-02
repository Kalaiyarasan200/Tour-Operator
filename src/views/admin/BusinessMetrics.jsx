import React, { useState } from "react";
import { 
  BarChart3, TrendingUp, AlertTriangle, CheckCircle, 
  Clock, DollarSign, Shield, ArrowUpRight, History, ShieldAlert 
} from "lucide-react";
import { quoteCalculator } from "../../services/quoteCalculator";
import { storageService } from "../../services/storageService";

export function BusinessMetrics({ onBack }) {
  const [slaRate, setSlaRate] = useState(90); // target 90%
  const [activityLogs, setActivityLogs] = useState(storageService.getActivityLog());

  // Mathematical model strictly based on the prompt's assumptions:
  const monthlyEnquiries = 2400;
  const legacySlowEnquiries = 600; // 25%
  const avgPackagePrice = 65000;
  const grossMargin = 0.14; // 14% margin

  // Baseline loss without Company A system:
  // 600 * 8% lost = 48 bookings lost/month * ₹65,000 * 14% = ₹4.368 Lakh/mo = ₹52.416 Lakh/yr
  const baseBookingsLostMonth = 48;
  const baseAnnualRevenueLost = 5241600; // ₹52.42 Lakh
  const baseCmsFreelanceCost = 1440000;   // ₹14.40 Lakh (40 edits * ₹3,000 * 12 mo)
  const totalLegacyLeakage = baseAnnualRevenueLost + baseCmsFreelanceCost; // ₹66.82 Lakh

  // Dynamic recovery calculation with the new platform:
  // For every % above legacy (which had 0% on-time for the 600 slow inquiries), calculate recovered bookings
  const recoveryFraction = (slaRate / 100);
  const monthlyRecoveredBookings = Math.round(baseBookingsLostMonth * recoveryFraction);
  const annualRecoveredMargin = Math.round(monthlyRecoveredBookings * avgPackagePrice * grossMargin * 12);
  const annualCmsSaved = baseCmsFreelanceCost; // 100% saved via self-service CMS
  const totalAnnualValueRecovered = annualRecoveredMargin + annualCmsSaved;

  return (
    <div className="container" style={{ padding: "1.5rem 0 4rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "0.2rem" }}>
            Founder-MD Executive Dashboard
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--c-text-muted)" }}>
            Financial ROI tracking: Eliminating the ₹66.82 Lakh/year legacy revenue leak.
          </p>
        </div>

        <div style={{ background: "var(--c-primary)", color: "#ffffff", padding: "0.5rem 1rem", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 700 }}>
          Project Investment: ₹8.5 Lakh • 7 Weeks
        </div>
      </div>

      {/* Financial Comparison Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "2rem" }}>
        {/* Legacy Leakage Card */}
        <div style={{ background: "#ffffff", border: "1px solid #fecaca", borderRadius: "12px", padding: "1.5rem", boxShadow: "var(--shadow-xs)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#dc2626", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            <AlertTriangle size={16} />
            <span>Legacy 6-Year Freelance Leakage</span>
          </div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", fontWeight: 700, color: "#991b1b", marginBottom: "0.5rem" }}>
            ₹66.82 Lakh
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--c-text-muted)", lineHeight: 1.5 }}>
            • ₹52.42L from delayed responses (&gt;12 hrs)<br />
            • ₹14.40L from 40 monthly CMS edits (@ ₹3,000 each)
          </div>
        </div>

        {/* Recovered Value Card */}
        <div style={{ background: "#ffffff", border: "2px solid var(--c-success)", borderRadius: "12px", padding: "1.5rem", boxShadow: "var(--shadow-md)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--c-success)", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            <TrendingUp size={16} />
            <span>Target Value Recovered / Year</span>
          </div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", fontWeight: 700, color: "var(--c-success)", marginBottom: "0.5rem" }}>
            {quoteCalculator.formatINR(totalAnnualValueRecovered)}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--c-text-muted)", lineHeight: 1.5 }}>
            • +{monthlyRecoveredBookings} recovered bookings / month<br />
            • 100% in-house package price changes in &lt; 5 mins
          </div>
        </div>

        {/* ROI Payback Card */}
        <div style={{ background: "var(--c-primary-dark)", color: "#ffffff", borderRadius: "12px", padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--c-accent-light)", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            <DollarSign size={16} />
            <span>Payback Period on ₹8.5L Budget</span>
          </div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem" }}>
            ~1.5 Months
          </div>
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
            7.8× annual return on investment based on 90% 1-hour enquiry SLA fulfillment.
          </div>
        </div>
      </div>

      {/* Interactive SLA Simulation Slider */}
      <div style={{ background: "#ffffff", border: "1px solid var(--c-border)", borderRadius: "12px", padding: "1.75rem", marginBottom: "2.5rem", boxShadow: "var(--shadow-xs)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div>
            <h3 style={{ fontSize: "1.2rem", color: "var(--c-primary-dark)" }}>
              Interactive Response SLA Simulation
            </h3>
            <p style={{ fontSize: "0.825rem", color: "var(--c-text-muted)" }}>
              Adjust the 1-hour enquiry response compliance rate to observe its direct impact on recovered gross margin:
            </p>
          </div>
          <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--c-primary)" }}>
            {slaRate}% Compliance
          </span>
        </div>

        <input
          type="range"
          min={50}
          max={100}
          step={5}
          value={slaRate}
          onChange={(e) => setSlaRate(parseInt(e.target.value, 10))}
          style={{ width: "100%", accentColor: "var(--c-primary)", cursor: "pointer", height: "8px" }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--c-text-light)", marginTop: "0.5rem" }}>
          <span>50% (Break-even: ₹40.6L/yr)</span>
          <span>75% (Target: ₹53.7L/yr)</span>
          <span>90% Goal (Client KPI: ₹61.6L/yr)</span>
          <span>100% (Maximum: ₹66.82L/yr)</span>
        </div>
      </div>

      {/* Live System Activity Log / Audit Trail */}
      <div style={{ background: "#ffffff", border: "1px solid var(--c-border)", borderRadius: "12px", padding: "1.75rem", boxShadow: "var(--shadow-xs)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div>
            <h3 style={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--c-primary-dark)" }}>
              <History size={18} style={{ color: "var(--c-accent)" }} />
              <span>Full Activity & Security Audit Log</span>
            </h3>
            <p style={{ fontSize: "0.825rem", color: "var(--c-text-muted)" }}>
              Real-time audit log tracking actions across Admin, Editor, Consultant and AI Gateway.
            </p>
          </div>
          <span style={{ fontSize: "0.75rem", background: "var(--c-primary-subtle)", color: "var(--c-primary)", padding: "0.2rem 0.6rem", borderRadius: "99px", fontWeight: 600 }}>
            {activityLogs.length} Events Logged
          </span>
        </div>

        <div style={{ maxHeight: "350px", overflowY: "auto", border: "1px solid var(--c-border)", borderRadius: "8px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.825rem" }}>
            <thead style={{ position: "sticky", top: 0, background: "#fafaf8" }}>
              <tr style={{ textAlign: "left", color: "var(--c-text-muted)", borderBottom: "1px solid var(--c-border)", fontSize: "0.72rem", textTransform: "uppercase" }}>
                <th style={{ padding: "0.6rem 0.85rem" }}>Timestamp</th>
                <th style={{ padding: "0.6rem 0.85rem" }}>Staff / System</th>
                <th style={{ padding: "0.6rem 0.85rem" }}>Role</th>
                <th style={{ padding: "0.6rem 0.85rem" }}>Action</th>
                <th style={{ padding: "0.6rem 0.85rem" }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {activityLogs.map(log => (
                <tr key={log.id} style={{ borderBottom: "1px solid var(--c-border)" }}>
                  <td style={{ padding: "0.6rem 0.85rem", color: "var(--c-text-light)", whiteSpace: "nowrap" }}>
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </td>
                  <td style={{ padding: "0.6rem 0.85rem", fontWeight: 600, color: "var(--c-primary-dark)" }}>
                    {log.user}
                  </td>
                  <td style={{ padding: "0.6rem 0.85rem" }}>
                    <span style={{ 
                      fontSize: "0.7rem", 
                      background: log.role === 'Admin' ? '#fee2e2' : log.role === 'Editor' ? '#fef3c7' : '#dcfce7',
                      color: log.role === 'Admin' ? '#991b1b' : log.role === 'Editor' ? '#92400e' : '#166534',
                      padding: "0.1rem 0.4rem", 
                      borderRadius: "3px", 
                      fontWeight: 700 
                    }}>
                      {log.role}
                    </span>
                  </td>
                  <td style={{ padding: "0.6rem 0.85rem", fontWeight: 600 }}>
                    {log.action}
                  </td>
                  <td style={{ padding: "0.6rem 0.85rem", color: "var(--c-text-muted)" }}>
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
