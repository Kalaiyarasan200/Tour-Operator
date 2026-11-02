import React, { useState } from "react";
import { 
  Search, Compass, Calendar, Users, MapPin, Sparkles, 
  ArrowRight, Clock, ShieldCheck, Heart, Star, CheckCircle2, ChevronRight 
} from "lucide-react";
import { quoteCalculator } from "../../services/quoteCalculator";

export function PublicHome({ packages = [], onSelectPackage, onOpenEnquiry, onSelectBlog }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");

  // Filter packages
  const filteredPackages = packages.filter(pkg => {
    // text search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchText = (pkg.title + " " + pkg.subtitle + " " + (pkg.destination || "")).toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    // destination
    if (selectedDestination !== "All") {
      if (selectedDestination === "Kerala" && !pkg.destination.toLowerCase().includes("kerala")) return false;
      if (selectedDestination === "South India" && !pkg.destination.toLowerCase().includes("tamil") && !pkg.destination.toLowerCase().includes("south")) return false;
    }
    // style
    if (selectedStyle !== "All") {
      if (!pkg.style?.toLowerCase().includes(selectedStyle.toLowerCase())) return false;
    }
    // duration
    if (selectedDuration !== "All") {
      if (selectedDuration === "short" && pkg.days > 4) return false;
      if (selectedDuration === "medium" && (pkg.days < 5 || pkg.days > 6)) return false;
      if (selectedDuration === "long" && pkg.days < 7) return false;
    }
    return true;
  });

  return (
    <div>
      {/* Editorial Hero Section */}
      <section 
        className="hero-editorial"
        style={{ backgroundImage: `url('/images/hero-munnar.jpg')` }}
      >
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-pill">
            <Sparkles size={13} style={{ color: "var(--c-accent)" }} />
            <span>Kochi's Premier Destination Operator • 1-Hour Enquiry Response</span>
          </div>

          <h1>
            The Quiet Beauty of Kerala & South India, Handcrafted.
          </h1>

          <p className="hero-lead">
            Private backwater houseboats, emerald tea amphitheaters in Munnar, and thousand-pillar temple corridors. Curated for families, honeymooners, and foreign groups.
          </p>

          {/* Interactive Search Strip */}
          <div className="search-strip">
            <div className="search-field">
              <label>Where in South India?</label>
              <input
                type="text"
                placeholder="Munnar, Alleppey, Madurai..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="search-field">
              <label>Destination</label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
              >
                <option value="All">All Regions</option>
                <option value="Kerala">Kerala Backwaters & Hills</option>
                <option value="South India">Tamil Nadu & South India</option>
              </select>
            </div>

            <div className="search-field">
              <label>Travel Style</label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
              >
                <option value="All">All Styles</option>
                <option value="Family">Family & Leisure</option>
                <option value="Honeymoon">Honeymoon & Romance</option>
                <option value="Heritage">Heritage & Pilgrimage</option>
              </select>
            </div>

            <button 
              className="btn btn-primary"
              style={{ height: "48px" }}
              onClick={() => {
                const el = document.getElementById("packages-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Search size={16} />
              <span>Explore</span>
            </button>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid var(--c-border)", padding: "1.5rem 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--c-primary-subtle)", color: "var(--c-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Clock size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--c-primary-dark)" }}>
                Strict 1-Hour Enquiry Response
              </div>
              <p style={{ fontSize: "0.825rem", color: "var(--c-text-muted)", margin: 0 }}>
                Every enquiry receives an instant confirmation and human itinerary within 60 minutes.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--c-accent-subtle)", color: "var(--c-accent-dark)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--c-primary-dark)" }}>
                Twin Sharing & GST Transparent
              </div>
              <p style={{ fontSize: "0.825rem", color: "var(--c-text-muted)", margin: 0 }}>
                All seasonal rates clearly display per-person twin sharing basis and 5% GST itemization.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--c-primary-subtle)", color: "var(--c-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <CheckCircle2 size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--c-primary-dark)" }}>
                DPDP Act 2023 Compliant
              </div>
              <p style={{ fontSize: "0.825rem", color: "var(--c-text-muted)", margin: 0 }}>
                Personal data handled strictly with consent. Zero spam or unauthorized third-party sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Packages Showcase */}
      <section id="packages-section" style={{ padding: "4rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem" }}>
            <div>
              <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--c-accent-dark)", fontWeight: 700 }}>
                Signature Holiday Collections
              </span>
              <h2>Handcrafted Itineraries</h2>
              <p>Tailored with private chauffeur-driven vehicles, verified boutique stays, and dedicated 24/7 Kochi concierge.</p>
            </div>
            <div style={{ fontSize: "0.875rem", color: "var(--c-text-muted)" }}>
              Showing <strong>{filteredPackages.length}</strong> packages
            </div>
          </div>

          {/* Grid */}
          <div className="packages-grid">
            {filteredPackages.map(pkg => {
              const peakSeason = pkg.seasonalPricing?.[0] || {};
              const monsoonSeason = pkg.seasonalPricing?.[1] || {};

              return (
                <div key={pkg.id} className="package-card">
                  <div className="card-img-wrap">
                    <img 
                      src={pkg.coverImage || "/images/hero-munnar.jpg"} 
                      alt={pkg.title}
                      className="card-img"
                      loading="lazy"
                    />
                    <div className="card-badge-top">
                      {pkg.destination} • {pkg.days} Days / {pkg.nights || (pkg.days - 1)} Nights
                    </div>
                    <div className={`card-badge-status ${pkg.status === 'Published' ? 'badge-published' : 'badge-draft'}`}>
                      {pkg.status}
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="card-meta">
                      <span>🏨 {pkg.hotelCategory}</span>
                      <span>•</span>
                      <span>✨ {pkg.style}</span>
                    </div>

                    <h3 className="card-title">
                      {pkg.title}
                    </h3>

                    <p className="card-desc">
                      {pkg.subtitle}
                    </p>

                    {/* Route stops badges */}
                    {pkg.routeStops && (
                      <div className="card-route">
                        {pkg.routeStops.map((stop, idx) => (
                          <span key={idx} className="route-stop">
                            {stop}{idx < pkg.routeStops.length - 1 ? " ➔" : ""}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="card-footer">
                      <div className="price-box">
                        <label>Starting from</label>
                        <div className="price-amount">
                          {quoteCalculator.formatINR(pkg.basePriceDisplay || peakSeason.pricePerPerson)}
                        </div>
                        <div className="price-meta">
                          Per Person (Twin Sharing) + 5% GST
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => onSelectPackage(pkg)}
                        >
                          Itinerary
                        </button>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => onOpenEnquiry(pkg)}
                        >
                          Enquire
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editorial Featurette: Backwater & Tea Contrast */}
      <section style={{ background: "var(--c-primary-dark)", color: "#ffffff", padding: "5rem 0", position: "relative" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "3.5rem", alignItems: "center" }}>
          <div>
            <span style={{ color: "var(--c-accent-light)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>
              The Kochi Difference
            </span>
            <h2 style={{ color: "#ffffff", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
              "Travel is sold by feeling, not checkboxes."
            </h2>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Our 48 Kochi-based specialists don't just book rooms. We ensure your houseboat crew knows how you like your fresh Karimeen fish spiced, your private driver knows the sweetest roadside tea stalls in Lockhart Gap, and your family has a restful, unforgettable journey.
            </p>
            <div style={{ display: "flex", gap: "2rem", borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "1.5rem" }}>
              <div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--c-accent-light)", fontWeight: 700 }}>
                  4,300+
                </div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>
                  Bookings / Year
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--c-accent-light)", fontWeight: 700 }}>
                  &lt; 60 Min
                </div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>
                  Consultant Response
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--c-accent-light)", fontWeight: 700 }}>
                  100%
                </div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>
                  Direct In-House Pricing
                </div>
              </div>
            </div>
          </div>

          <div>
            <img 
              src="/images/alleppey-houseboat.jpg" 
              alt="Alleppey Houseboat"
              style={{ width: "100%", borderRadius: "14px", boxShadow: "var(--shadow-elevated)", border: "1px solid rgba(255,255,255,0.1)" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
