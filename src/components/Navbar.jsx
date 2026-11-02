import React from "react";
import { Compass, Clock, Send, ShieldCheck, FileText, Package, BookOpen, Layers, PhoneCall } from "lucide-react";

export function Navbar({ activeView, setActiveView, onOpenEnquiry, urgentEnquiriesCount = 0 }) {
  return (
    <header className="app-header">
      <div className="container nav-inner">
        {/* Brand */}
        <div 
          className="brand-logo" 
          onClick={() => setActiveView("home")} 
          style={{ cursor: "pointer" }}
        >
          <div className="brand-mark">A</div>
          <div className="brand-text">
            <h1>Company A</h1>
            <p>Kochi • Kerala & South India</p>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav>
          <ul className="nav-links">
            <li>
              <button 
                className={`nav-link ${activeView === "home" ? "active" : ""}`}
                onClick={() => setActiveView("home")}
                style={{ background: "none", border: "none" }}
              >
                <Compass size={16} />
                <span>Holiday Packages</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeView === "blogs" ? "active" : ""}`}
                onClick={() => setActiveView("blogs")}
                style={{ background: "none", border: "none" }}
              >
                <BookOpen size={16} />
                <span>Travel Journal</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeView === "inbox" ? "active" : ""}`}
                onClick={() => setActiveView("inbox")}
                style={{ background: "none", border: "none" }}
              >
                <Clock size={16} />
                <span>Enquiry Inbox</span>
                {urgentEnquiriesCount > 0 && (
                  <span className="badge-sla" title="Enquiries requiring < 1 hr reply">
                    {urgentEnquiriesCount} urgent
                  </span>
                )}
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeView === "cms-packages" ? "active" : ""}`}
                onClick={() => setActiveView("cms-packages")}
                style={{ background: "none", border: "none" }}
              >
                <Package size={16} />
                <span>Package CMS</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeView === "redirects" ? "active" : ""}`}
                onClick={() => setActiveView("redirects")}
                style={{ background: "none", border: "none" }}
              >
                <Layers size={16} />
                <span>140 Redirects & SEO</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Right Action */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.825rem", color: "var(--c-text-muted)" }}>
            <PhoneCall size={14} style={{ color: "var(--c-accent)" }} />
            <span style={{ fontWeight: 600 }}>+91 484 266 8000</span>
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => onOpenEnquiry(null)}
          >
            <Send size={14} />
            <span>Enquire in 60s</span>
          </button>
        </div>
      </div>
    </header>
  );
}
