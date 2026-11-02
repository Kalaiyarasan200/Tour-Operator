import React from "react";
import { ShieldCheck, PhoneCall, Mail, MapPin, Compass, Clock } from "lucide-react";

export function Footer({ setActiveView, onOpenEnquiry }) {
  return (
    <footer style={{ background: "var(--c-primary-dark)", color: "#ffffff", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "4rem", paddingBottom: "2rem" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ width: 38, height: 38, background: "var(--c-primary)", color: "var(--c-accent-light)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 700 }}>
                A
              </div>
              <div>
                <h3 style={{ fontSize: "1.3rem", color: "#ffffff", margin: 0 }}>Company A</h3>
                <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--c-accent-light)", fontWeight: 700 }}>
                  Kochi • Kerala & South India
                </div>
              </div>
            </div>

            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              Tour operator selling Kerala and South India holiday packages to families, honeymooners, and foreign groups. 48 full-time specialists based out of Kochi.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--c-accent-light)" }}>
              <ShieldCheck size={16} />
              <span>Govt. of Kerala Tourism Accredited Operator</span>
            </div>
          </div>

          {/* Packages Links */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "1rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Holiday Circuits
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.7)" }}>
              <li style={{ cursor: "pointer" }} onClick={() => setActiveView("home")}>Munnar & Alleppey Houseboat</li>
              <li style={{ cursor: "pointer" }} onClick={() => setActiveView("home")}>Kumarakom Plunge Pool Romance</li>
              <li style={{ cursor: "pointer" }} onClick={() => setActiveView("home")}>Madurai & Rameswaram Temples</li>
              <li style={{ cursor: "pointer" }} onClick={() => setActiveView("home")}>Wayanad Treehouse & Rainforest</li>
            </ul>
          </div>

          {/* Navigation & Policies */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "1rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.7)" }}>
              <li style={{ cursor: "pointer" }} onClick={() => setActiveView("blogs")}>The Travel Journal</li>
              <li style={{ cursor: "pointer" }} onClick={() => setActiveView("redirects")}>SEO & 140 Redirects</li>
              <li style={{ cursor: "pointer" }} onClick={() => onOpenEnquiry(null)}>Request Custom Itinerary</li>
              <li>DPDP Act 2023 Privacy Policy</li>
              <li>GSTIN: 32AABCC1234D1Z5</li>
            </ul>
          </div>

          {/* Headquarters */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "1rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Kochi Headquarters
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.75)" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <MapPin size={16} style={{ color: "var(--c-accent)", flexShrink: 0, marginTop: "2px" }} />
                <span>Bristow Road, Willingdon Island, Kochi, Kerala 682003</span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <PhoneCall size={16} style={{ color: "var(--c-accent)", flexShrink: 0 }} />
                <span>+91 484 266 8000</span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Mail size={16} style={{ color: "var(--c-accent)", flexShrink: 0 }} />
                <span>reservations@companya-kochi.com</span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", color: "var(--c-accent-light)", fontWeight: 600 }}>
                <Clock size={16} />
                <span>1-Hour Enquiry Reply Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>
          <div>
            © {new Date().getFullYear()} Company A, Kochi. All rights reserved. Prices per person on twin-sharing basis + 5% GST.
          </div>
          <div>
            Built with DPDP Act 2023 Consent Controls & Fast Performance Architecture
          </div>
        </div>
      </div>
    </footer>
  );
}
