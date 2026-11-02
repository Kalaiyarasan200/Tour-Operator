import React, { useState } from "react";
import { MapPin, Navigation, Info } from "lucide-react";

export function RouteMapSvg({ stops = ["Cochin", "Munnar", "Thekkady", "Alleppey", "Marari", "Cochin"], packageTitle = "Kerala Circuit" }) {
  const [activeStop, setActiveStop] = useState(stops[1] || stops[0]);

  // Schematic coordinate mappings for Kerala & South India landmarks
  const stopCoordinates = {
    "Cochin": { x: 180, y: 190, label: "Cochin (Airport / Heritage)", desc: "Port gateway, Chinese nets, spice bazaars", elevation: "Sea level" },
    "Munnar": { x: 340, y: 110, label: "Munnar Tea High Ranges", desc: "50,000 acres of tea, Eravikulam National Park", elevation: "1,600m" },
    "Thekkady": { x: 380, y: 220, label: "Thekkady (Periyar Lake)", desc: "Spice plantations, wildlife sanctuary boat safari", elevation: "900m" },
    "Alleppey": { x: 200, y: 280, label: "Alleppey Backwaters", desc: "Private luxury Kettuvallam overnight houseboat cruise", elevation: "Sea level" },
    "Marari": { x: 170, y: 250, label: "Marari Golden Sands", desc: "Secluded coconut beach, peaceful eco-resorts", elevation: "Coast" },
    "Madurai": { x: 440, y: 170, label: "Madurai Temple City", desc: "Meenakshi Sundareswarar Temple 1,000 pillars", elevation: "135m" },
    "Rameswaram": { x: 540, y: 230, label: "Rameswaram & Pamban", desc: "Pamban Sea Bridge & sacred Ramanathaswamy temple", elevation: "Sea level" },
    "Dhanushkodi": { x: 570, y: 260, label: "Dhanushkodi Sand Spit", desc: "Ruins of submerged town & Sri Lanka maritime border", elevation: "Coast" },
    "Kanyakumari": { x: 330, y: 440, label: "Kanyakumari Ocean Confluence", desc: "Meeting of three seas & Vivekananda Rock Memorial", elevation: "Coast" },
    "Trivandrum": { x: 260, y: 390, label: "Trivandrum Capital", desc: "Padmanabhaswamy temple & international airport", elevation: "Coast" },
    "Kumarakom": { x: 230, y: 260, label: "Kumarakom Lake Sanctuary", desc: "Vembanad lakefront luxury villas & bird sanctuary", elevation: "Lake level" },
    "Vythiri": { x: 200, y: 70, label: "Wayanad (Vythiri Rainforest)", desc: "Misty treehouse resorts, coffee plantations", elevation: "700m" },
    "Calicut": { x: 140, y: 80, label: "Calicut Malabar Coast", desc: "Historic port of spice trade & departure gateway", elevation: "Coast" }
  };

  // Build SVG polyline points from stops array
  const points = stops
    .map(name => {
      const coord = stopCoordinates[name] || { x: 250, y: 250 };
      return `${coord.x},${coord.y}`;
    })
    .join(" ");

  return (
    <div className="map-canvas-card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div>
          <h3 style={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Navigation size={18} style={{ color: "var(--c-accent)" }} />
            <span>Interactive Route & Topography</span>
          </h3>
          <p style={{ fontSize: "0.825rem", color: "var(--c-text-muted)" }}>
            Chauffeur-driven private route: {stops.join(" ➔ ")}
          </p>
        </div>
        <span style={{ fontSize: "0.75rem", background: "var(--c-primary-subtle)", color: "var(--c-primary)", padding: "0.25rem 0.65rem", borderRadius: "99px", fontWeight: 600 }}>
          Private AC Vehicle Included
        </span>
      </div>

      <div style={{ position: "relative", width: "100%", height: "300px", background: "linear-gradient(135deg, #f4f8f6 0%, #edf5f1 100%)", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--c-border)" }}>
        {/* Decorative coastline schematic */}
        <svg viewBox="0 0 650 480" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#19382b" />
              <stop offset="50%" stopColor="#c48b38" />
              <stop offset="100%" stopColor="#19382b" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Arabian Sea wash on west */}
          <path
            d="M 60,0 C 70,120 110,240 180,360 C 220,420 280,480 330,480 L 0,480 L 0,0 Z"
            fill="#e2eff1"
            opacity="0.6"
          />
          <text x="30" y="240" fill="#7ba3ab" fontSize="12" fontWeight="600" letterSpacing="3" transform="rotate(-75 30 240)">
            ARABIAN SEA
          </text>

          {/* Western Ghats Mountain Hues on east */}
          <ellipse cx="360" cy="140" rx="90" ry="60" fill="#d9eadf" opacity="0.5" />
          <text x="320" y="80" fill="#4d7c5f" fontSize="10" fontStyle="italic">
            Western Ghats (Tea Hills)
          </text>

          {/* The Route Path Line */}
          {points && (
            <>
              <polyline
                points={points}
                fill="none"
                stroke="rgba(196, 139, 56, 0.4)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points={points}
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="3"
                strokeDasharray="6,4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* Route Stops / Waypoints */}
          {stops.map((stopName, idx) => {
            const coord = stopCoordinates[stopName] || { x: 200 + idx * 40, y: 200 + idx * 30 };
            const isSelected = activeStop === stopName;
            return (
              <g 
                key={`${stopName}-${idx}`} 
                onClick={() => setActiveStop(stopName)}
                style={{ cursor: "pointer" }}
              >
                {/* Outer ring */}
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={isSelected ? "14" : "8"}
                  fill={isSelected ? "var(--c-accent)" : "#ffffff"}
                  stroke="var(--c-primary)"
                  strokeWidth="2.5"
                  filter={isSelected ? "url(#glow)" : "none"}
                />
                {/* Index number or dot */}
                <text
                  x={coord.x}
                  y={coord.y + 4}
                  textAnchor="middle"
                  fill={isSelected ? "#ffffff" : "var(--c-primary)"}
                  fontSize="10"
                  fontWeight="bold"
                >
                  {idx + 1}
                </text>
                {/* Stop Label */}
                <text
                  x={coord.x + 16}
                  y={coord.y + 4}
                  fill="var(--c-primary-dark)"
                  fontSize="12"
                  fontWeight={isSelected ? "700" : "500"}
                  style={{ textShadow: "0 1px 2px rgba(255,255,255,0.9)" }}
                >
                  {stopName}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected stop info popup overlay */}
        {activeStop && stopCoordinates[activeStop] && (
          <div style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(6px)",
            padding: "0.6rem 0.9rem",
            borderRadius: "6px",
            border: "1px solid var(--c-border)",
            boxShadow: "var(--shadow-sm)",
            maxWidth: "320px",
            fontSize: "0.8rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2px" }}>
              <span style={{ fontWeight: 700, color: "var(--c-primary)" }}>
                {stopCoordinates[activeStop].label}
              </span>
              <span style={{ fontSize: "0.7rem", color: "var(--c-accent-dark)", fontWeight: 600 }}>
                {stopCoordinates[activeStop].elevation}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--c-text-muted)" }}>
              {stopCoordinates[activeStop].desc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
