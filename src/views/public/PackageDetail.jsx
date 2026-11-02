import React, { useState } from "react";
import { 
  ArrowLeft, Calendar, Users, MapPin, CheckCircle, XCircle, 
  Hotel, Clock, Sparkles, Send, ShieldCheck, ChevronDown, ChevronUp, Share2 
} from "lucide-react";
import { RouteMapSvg } from "../../components/RouteMapSvg";
import { quoteCalculator } from "../../services/quoteCalculator";

export function PackageDetail({ packageData, onBack, onOpenEnquiry, onEditPackage }) {
  if (!packageData) return null;

  const [activeTab, setActiveTab] = useState("itinerary");
  const [selectedSeasonIdx, setSelectedSeasonIdx] = useState(0);
  const [expandedDays, setExpandedDays] = useState({ 1: true, 2: true });

  const toggleDay = (dayNum) => {
    setExpandedDays(prev => ({
      ...prev,
      [dayNum]: !prev[dayNum]
    }));
  };

  const selectedSeason = packageData.seasonalPricing?.[selectedSeasonIdx] || packageData.seasonalPricing?.[0] || {};

  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Top Breadcrumb & Action bar */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid var(--c-border)", padding: "0.85rem 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button 
            onClick={onBack}
            className="btn btn-outline btn-sm"
            style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            <ArrowLeft size={14} />
            <span>All Packages</span>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--c-text-muted)" }}>
              ID: <strong>{packageData.id}</strong> (v{packageData.version || 1})
            </span>
            <span className={`card-badge-status ${packageData.status === 'Published' ? 'badge-published' : 'badge-draft'}`} style={{ position: "static" }}>
              {packageData.status}
            </span>
            {onEditPackage && (
              <button 
                onClick={() => onEditPackage(packageData)}
                className="btn btn-outline btn-sm"
              >
                Edit in CMS
              </button>
            )}
            <button 
              onClick={() => onOpenEnquiry(packageData)}
              className="btn btn-primary btn-sm"
            >
              <Send size={14} />
              <span>Enquire Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Package Header Hero Banner */}
      <section style={{ 
        position: "relative", 
        minHeight: "440px", 
        backgroundImage: `url(${packageData.coverImage || "/images/hero-munnar.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
        color: "#ffffff",
        display: "flex",
        alignItems: "flex-end",
        paddingBottom: "3rem"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(16,36,27,0.2) 0%, rgba(16,36,27,0.7) 60%, rgba(16,36,27,0.95) 100%)"
        }} />

        <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <span style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)", padding: "0.25rem 0.65rem", borderRadius: "99px", fontSize: "0.75rem", fontWeight: 600 }}>
              {packageData.destination}
            </span>
            <span style={{ background: "rgba(196,139,56,0.9)", color: "#fff", padding: "0.25rem 0.65rem", borderRadius: "99px", fontSize: "0.75rem", fontWeight: 600 }}>
              {packageData.style}
            </span>
            <span style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)", padding: "0.25rem 0.65rem", borderRadius: "99px", fontSize: "0.75rem", fontWeight: 600 }}>
              {packageData.days} Days / {packageData.nights || (packageData.days - 1)} Nights
            </span>
          </div>

          <h1 style={{ color: "#ffffff", marginBottom: "0.5rem" }}>
            {packageData.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1rem", maxWidth: "780px" }}>
            {packageData.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Layout with 2 Columns */}
      <div className="container" style={{ marginTop: "2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: "2.5rem", alignItems: "start" }}>
          {/* Left Column: Itinerary, Map, Hotels, Inclusions */}
          <div>
            {/* Quick Summary Highlights Box */}
            <div style={{ 
              background: "#ffffff", 
              border: "1px solid var(--c-border)", 
              borderRadius: "12px", 
              padding: "1.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.25rem",
              marginBottom: "2rem",
              boxShadow: "var(--shadow-xs)"
            }}>
              <div>
                <label style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--c-text-light)", fontWeight: 700 }}>
                  Duration
                </label>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--c-primary-dark)" }}>
                  {packageData.days} Days / {packageData.nights || (packageData.days - 1)} Nights
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--c-text-light)", fontWeight: 700 }}>
                  Accommodations
                </label>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--c-primary-dark)" }}>
                  {packageData.hotelCategory || "4-Star Verified"}
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--c-text-light)", fontWeight: 700 }}>
                  Transport
                </label>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--c-primary-dark)" }}>
                  Private AC Vehicle
                </div>
              </div>
            </div>

            {/* Interactive Route Map */}
            {packageData.routeStops && packageData.routeStops.length > 0 && (
              <RouteMapSvg stops={packageData.routeStops} packageTitle={packageData.title} />
            )}

            {/* Day-by-Day Detailed Itinerary */}
            <section style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <h2>Day-Wise Itinerary</h2>
                <button
                  onClick={() => {
                    const allOpen = Object.keys(expandedDays).length === packageData.itinerary?.length;
                    if (allOpen) {
                      setExpandedDays({});
                    } else {
                      const all = {};
                      packageData.itinerary?.forEach(d => { all[d.day] = true; });
                      setExpandedDays(all);
                    }
                  }}
                  style={{ background: "none", border: "none", color: "var(--c-accent-dark)", fontSize: "0.825rem", fontWeight: 600, cursor: "pointer" }}
                >
                  {Object.keys(expandedDays).length === packageData.itinerary?.length ? "Collapse All" : "Expand All Days"}
                </button>
              </div>

              <div className="itinerary-timeline">
                {packageData.itinerary?.map((item) => {
                  const isOpen = expandedDays[item.day];
                  return (
                    <div key={item.day} className="timeline-day">
                      <div className="day-bullet">{item.day}</div>
                      <div className="day-card">
                        <div 
                          className="day-header"
                          onClick={() => toggleDay(item.day)}
                          style={{ cursor: "pointer" }}
                        >
                          <div>
                            <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, color: "var(--c-accent-dark)" }}>
                              Day {item.day}
                            </span>
                            <div className="day-title">{item.title}</div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            {item.stay && <span className="day-stay-tag">{item.stay}</span>}
                            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </div>
                        </div>

                        {isOpen && (
                          <div style={{ marginTop: "0.85rem", paddingTop: "0.85rem", borderTop: "1px solid var(--c-border)" }}>
                            <p style={{ fontSize: "0.925rem", color: "var(--c-text-muted)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                              {item.description}
                            </p>
                            {item.meals && (
                              <div style={{ fontSize: "0.8rem", color: "var(--c-primary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.35rem" }}>
                                <span>🍽️ Meals:</span>
                                <span>{item.meals}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Selected Curated Hotels */}
            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ marginBottom: "1rem" }}>Curated Hotels & Houseboats</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {packageData.hotels?.map((h, i) => (
                  <div key={i} style={{ background: "#ffffff", border: "1px solid var(--c-border)", borderRadius: "8px", padding: "1.1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--c-accent-dark)" }}>
                        {h.city} • {h.nights} Night{h.nights > 1 ? "s" : ""}
                      </span>
                      <span style={{ fontSize: "0.72rem", background: "var(--c-primary-subtle)", color: "var(--c-primary)", padding: "0.15rem 0.5rem", borderRadius: "4px", fontWeight: 600 }}>
                        {h.rating}
                      </span>
                    </div>
                    <div style={{ fontWeight: 600, color: "var(--c-primary-dark)", fontSize: "0.95rem" }}>
                      {h.name}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <section style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div style={{ background: "#ffffff", border: "1px solid var(--c-border)", borderRadius: "10px", padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.15rem", marginBottom: "1rem", color: "var(--c-success)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <CheckCircle size={18} />
                    <span>Inclusions</span>
                  </h3>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {packageData.inclusions?.map((inc, i) => (
                      <li key={i} style={{ fontSize: "0.875rem", color: "var(--c-text-muted)", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                        <span style={{ color: "var(--c-success)", marginTop: "2px" }}>✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: "#ffffff", border: "1px solid var(--c-border)", borderRadius: "10px", padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.15rem", marginBottom: "1rem", color: "var(--c-danger)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <XCircle size={18} />
                    <span>Exclusions</span>
                  </h3>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {packageData.exclusions?.map((exc, i) => (
                      <li key={i} style={{ fontSize: "0.875rem", color: "var(--c-text-muted)", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                        <span style={{ color: "var(--c-danger)", marginTop: "2px" }}>✗</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Pricing Card & Enquiry Box */}
          <div style={{ position: "sticky", top: "90px" }}>
            <div style={{
              background: "#ffffff",
              border: "1px solid var(--c-border-strong)",
              borderRadius: "14px",
              padding: "1.75rem",
              boxShadow: "var(--shadow-md)"
            }}>
              <div style={{ borderBottom: "1px solid var(--c-border)", paddingBottom: "1rem", marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--c-text-light)", fontWeight: 700 }}>
                  Transparent Pricing
                </span>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginTop: "0.25rem" }}>
                  <span className="price-amount" style={{ fontSize: "2.2rem" }}>
                    {quoteCalculator.formatINR(selectedSeason.pricePerPerson || packageData.basePriceDisplay)}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "var(--c-text-muted)" }}>
                    / person
                  </span>
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--c-accent-dark)", fontWeight: 600, marginTop: "0.2rem" }}>
                  Double / Twin Sharing basis • 5% GST extra
                </div>
              </div>

              {/* Season Selector */}
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: "0.4rem" }}>
                  Select Travel Season
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {packageData.seasonalPricing?.map((sp, idx) => {
                    const isSelected = selectedSeasonIdx === idx;
                    return (
                      <div
                        key={sp.id || idx}
                        onClick={() => setSelectedSeasonIdx(idx)}
                        style={{
                          border: isSelected ? "2px solid var(--c-primary)" : "1px solid var(--c-border)",
                          background: isSelected ? "var(--c-primary-subtle)" : "#ffffff",
                          borderRadius: "8px",
                          padding: "0.75rem 1rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          transition: "all 0.15s"
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, color: "var(--c-primary-dark)", fontSize: "0.875rem" }}>
                            {sp.season}
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "var(--c-text-muted)" }}>
                            {sp.months}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontWeight: 700, color: "var(--c-primary)", fontSize: "0.95rem" }}>
                            {quoteCalculator.formatINR(sp.pricePerPerson)}
                          </div>
                          <div style={{ fontSize: "0.68rem", color: "var(--c-text-light)" }}>
                            per person
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Extra Bed Details for Families */}
              {selectedSeason.extraBedPrice && (
                <div style={{ background: "#f8faf9", borderRadius: "8px", padding: "0.75rem", fontSize: "0.78rem", color: "var(--c-text-muted)", marginBottom: "1.25rem", border: "1px solid var(--c-border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem" }}>
                    <span>Child with Extra Bed:</span>
                    <strong>{quoteCalculator.formatINR(selectedSeason.extraBedPrice)}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Child without Bed (under 5 yrs):</span>
                    <strong>{quoteCalculator.formatINR(selectedSeason.childNoBedPrice || 0)}</strong>
                  </div>
                </div>
              )}

              {/* Primary Action Button */}
              <button 
                onClick={() => onOpenEnquiry(packageData)}
                className="btn btn-primary"
                style={{ width: "100%", padding: "0.95rem", fontSize: "1.05rem", marginBottom: "0.75rem" }}
              >
                <Send size={16} />
                <span>Enquire for this Package</span>
              </button>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--c-text-muted)" }}>
                <Clock size={13} style={{ color: "var(--c-accent)" }} />
                <span>Personal consultant reply guaranteed &lt; 1 hour</span>
              </div>

              {/* Compliance & DPDP badge */}
              <div style={{ borderTop: "1px solid var(--c-border)", marginTop: "1.25rem", paddingTop: "1rem", fontSize: "0.72rem", color: "var(--c-text-light)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <ShieldCheck size={14} style={{ color: "var(--c-primary)" }} />
                <span>DPDP Act 2023 Compliant • Govt of Kerala Accredited</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
