import React, { useState } from "react";
import { ArrowLeft, Printer, CheckCircle, ShieldCheck, Phone, Mail, Share2, Download } from "lucide-react";
import { quoteCalculator } from "../../services/quoteCalculator";

export function PublicQuoteView({ quote, onBack }) {
  if (!quote) return null;

  const [isAccepted, setIsAccepted] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ background: "#f4f4f0", minHeight: "100vh", padding: "2rem 0 5rem" }}>
      {/* Non-printable top action bar */}
      <div className="container no-print" style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={onBack} className="btn btn-outline btn-sm">
          <ArrowLeft size={14} />
          <span>Back to Dashboard</span>
        </button>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={handlePrint} className="btn btn-outline btn-sm">
            <Printer size={14} />
            <span>Print / Save as PDF</span>
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setIsAccepted(true)}
            disabled={isAccepted}
          >
            <CheckCircle size={14} />
            <span>{isAccepted ? "Quote Accepted!" : "Accept Quote & Reserve"}</span>
          </button>
        </div>
      </div>

      {/* Printable Branded Quote Document Container */}
      <div className="container" style={{ maxWidth: "860px" }}>
        <div 
          className="quote-document"
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            border: "1px solid var(--c-border)",
            padding: "3.5rem 3rem",
            boxShadow: "var(--shadow-md)"
          }}
        >
          {/* Header & Letterhead */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid var(--c-primary)", paddingBottom: "1.75rem", marginBottom: "2rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <div style={{ width: 40, height: 40, background: "var(--c-primary)", color: "var(--c-accent-light)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 700 }}>
                  A
                </div>
                <div>
                  <h1 style={{ fontSize: "1.6rem", color: "var(--c-primary-dark)", margin: 0 }}>Company A</h1>
                  <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--c-accent-dark)", fontWeight: 700 }}>
                    Kochi • Kerala & South India Tour Operator
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--c-text-muted)", lineHeight: 1.4 }}>
                Registered Office: Bristow Road, Willingdon Island, Kochi, Kerala 682003<br />
                Govt. of Kerala Accredited Tour Operator • GSTIN: 32AABCC1234D1Z5<br />
                Phone: +91 484 266 8000 | Email: reservations@companya-kochi.com
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--c-text-light)", fontWeight: 700 }}>
                Official Travel Quotation
              </span>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 700, color: "var(--c-primary-dark)", marginTop: "2px" }}>
                {quote.id}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--c-text-muted)", marginTop: "4px" }}>
                Date: {new Date(quote.createdAt || Date.now()).toLocaleDateString("en-IN")}<br />
                Valid Until: {quote.validUntil || "7 Days from issue"}
              </div>
            </div>
          </div>

          {/* Guest and Consultant Info Bar */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", background: "#fafaf8", padding: "1.25rem 1.5rem", borderRadius: "8px", border: "1px solid var(--c-border)", marginBottom: "2rem", fontSize: "0.85rem" }}>
            <div>
              <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--c-text-light)", fontWeight: 700, display: "block", marginBottom: "0.2rem" }}>
                Prepared For Guest:
              </span>
              <div style={{ fontWeight: 700, color: "var(--c-primary-dark)", fontSize: "1.05rem" }}>
                {quote.customerName}
              </div>
              <div style={{ color: "var(--c-text-muted)" }}>
                {quote.customerPhone} | {quote.customerEmail}
              </div>
            </div>

            <div>
              <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--c-text-light)", fontWeight: 700, display: "block", marginBottom: "0.2rem" }}>
                Dedicated Destination Specialist:
              </span>
              <div style={{ fontWeight: 700, color: "var(--c-primary-dark)", fontSize: "1.05rem" }}>
                {quote.consultantName || "Rahul M. (Senior Kerala Specialist)"}
              </div>
              <div style={{ color: "var(--c-text-muted)" }}>
                Direct Mobile: +91 98401 23456
              </div>
            </div>
          </div>

          {/* Selected Itinerary Synopsis */}
          <div style={{ marginBottom: "2rem" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--c-accent-dark)", fontWeight: 700 }}>
              Chosen Holiday Package
            </span>
            <h2 style={{ fontSize: "1.6rem", color: "var(--c-primary-dark)", margin: "0.25rem 0 0.5rem" }}>
              {quote.packageTitle}
            </h2>
            <div style={{ fontSize: "0.85rem", color: "var(--c-text-muted)", display: "flex", gap: "1.5rem", marginBottom: "1rem" }}>
              <span>Duration: <strong>{quote.packageDays} Days</strong></span>
              <span>Season: <strong>{quote.seasonName}</strong></span>
              <span>Travel Dates: <strong>{quote.travelDates}</strong></span>
            </div>

            {/* Curated Hotels Table */}
            {quote.hotels && quote.hotels.length > 0 && (
              <div style={{ background: "#ffffff", border: "1px solid var(--c-border)", borderRadius: "6px", overflow: "hidden", marginBottom: "1.5rem" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.825rem" }}>
                  <thead>
                    <tr style={{ background: "#fafaf8", textAlign: "left", color: "var(--c-text-muted)", borderBottom: "1px solid var(--c-border)" }}>
                      <th style={{ padding: "0.6rem 0.85rem" }}>City</th>
                      <th style={{ padding: "0.6rem 0.85rem" }}>Boutique Resort / Stays</th>
                      <th style={{ padding: "0.6rem 0.85rem" }}>Standard</th>
                      <th style={{ padding: "0.6rem 0.85rem", textAlign: "right" }}>Nights</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quote.hotels.map((h, i) => (
                      <tr key={i} style={{ borderBottom: i < quote.hotels.length - 1 ? "1px solid var(--c-border)" : "none" }}>
                        <td style={{ padding: "0.6rem 0.85rem", fontWeight: 600 }}>{h.city}</td>
                        <td style={{ padding: "0.6rem 0.85rem" }}>{h.name}</td>
                        <td style={{ padding: "0.6rem 0.85rem", color: "var(--c-accent-dark)" }}>{h.rating}</td>
                        <td style={{ padding: "0.6rem 0.85rem", textAlign: "right" }}>{h.nights}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Transparent Itemized Price Breakdown Table */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--c-primary-dark)" }}>
              Itemized Financial Breakdown
            </h3>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", border: "1px solid var(--c-border)", borderRadius: "8px", overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "var(--c-primary-subtle)", color: "var(--c-primary-dark)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem 1rem" }}>Description & Tariff Basis</th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "center" }}>Qty</th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "right" }}>Rate / Pax</th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "right" }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--c-border)" }}>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <strong>Adult Package (Double / Twin Sharing Basis)</strong>
                    <div style={{ fontSize: "0.75rem", color: "var(--c-text-muted)" }}>
                      Includes 4-star stays, private AC vehicle, breakfasts, and all houseboat meals
                    </div>
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "center" }}>
                    {quote.calculation.adults}
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                    {quoteCalculator.formatINR(quote.calculation.pricePerPerson)}
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right", fontWeight: 700 }}>
                    {quoteCalculator.formatINR(quote.calculation.adultSubtotal)}
                  </td>
                </tr>

                {quote.calculation.childrenWithBed > 0 && (
                  <tr style={{ borderBottom: "1px solid var(--c-border)" }}>
                    <td style={{ padding: "0.75rem 1rem" }}>
                      <strong>Child with Extra Rollaway Bed & Breakfast</strong>
                    </td>
                    <td style={{ padding: "0.75rem 1rem", textAlign: "center" }}>
                      {quote.calculation.childrenWithBed}
                    </td>
                    <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                      {quoteCalculator.formatINR(quote.calculation.extraBedPrice)}
                    </td>
                    <td style={{ padding: "0.75rem 1rem", textAlign: "right", fontWeight: 700 }}>
                      {quoteCalculator.formatINR(quote.calculation.childBedSubtotal)}
                    </td>
                  </tr>
                )}

                {quote.addOns && quote.addOns.map((add, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--c-border)" }}>
                    <td style={{ padding: "0.75rem 1rem" }}>
                      <strong>Add-on: {add.name}</strong>
                    </td>
                    <td style={{ padding: "0.75rem 1rem", textAlign: "center" }}>1</td>
                    <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>{quoteCalculator.formatINR(add.price)}</td>
                    <td style={{ padding: "0.75rem 1rem", textAlign: "right", fontWeight: 700 }}>{quoteCalculator.formatINR(add.price)}</td>
                  </tr>
                ))}

                {/* Subtotal */}
                <tr style={{ borderBottom: "1px solid var(--c-border)", background: "#fafaf8" }}>
                  <td colSpan={3} style={{ padding: "0.65rem 1rem", textAlign: "right", fontWeight: 600 }}>
                    Taxable Subtotal:
                  </td>
                  <td style={{ padding: "0.65rem 1rem", textAlign: "right", fontWeight: 700 }}>
                    {quoteCalculator.formatINR(quote.subtotal)}
                  </td>
                </tr>

                {/* Statutory GST */}
                <tr style={{ borderBottom: "2px solid var(--c-primary)", color: "var(--c-accent-dark)" }}>
                  <td colSpan={3} style={{ padding: "0.65rem 1rem", textAlign: "right", fontWeight: 700 }}>
                    Tour Operator GST (5% Standard Statutory Rate):
                  </td>
                  <td style={{ padding: "0.65rem 1rem", textAlign: "right", fontWeight: 700 }}>
                    {quoteCalculator.formatINR(quote.gstAmount)}
                  </td>
                </tr>

                {/* Grand Total */}
                <tr style={{ background: "var(--c-primary-dark)", color: "#ffffff" }}>
                  <td colSpan={3} style={{ padding: "1rem", textAlign: "right", fontSize: "1.1rem", fontWeight: 700 }}>
                    Final Payable Amount (All Inclusive):
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right", fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 700 }}>
                    {quoteCalculator.formatINR(quote.grandTotal)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Inclusions summary & Key terms */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", borderTop: "1px solid var(--c-border)", paddingTop: "1.5rem", fontSize: "0.8rem", color: "var(--c-text-muted)", marginBottom: "2rem" }}>
            <div>
              <strong style={{ color: "var(--c-primary-dark)", display: "block", marginBottom: "0.4rem" }}>
                Terms & Inclusions:
              </strong>
              <ul style={{ paddingLeft: "1.2rem", lineHeight: 1.5 }}>
                <li>Dedicated AC sedan / Crysta with experienced English/Hindi speaking driver.</li>
                <li>Fuel, toll gates, interstate permits, parking & driver allowance included.</li>
                <li>Private deluxe houseboat with 3-man crew & authentic Kerala cuisine.</li>
                <li>Twin sharing per-person basis explicitly honored. Zero hidden costs.</li>
              </ul>
            </div>

            <div>
              <strong style={{ color: "var(--c-primary-dark)", display: "block", marginBottom: "0.4rem" }}>
                Payment & Cancellation:
              </strong>
              <ul style={{ paddingLeft: "1.2rem", lineHeight: 1.5 }}>
                <li>25% advance to lock verified resort rooms and private houseboat slot.</li>
                <li>Balance payment 10 days prior to arrival or at Cochin airport check-in.</li>
                <li>100% refund for cancellations made 15+ days prior to travel.</li>
              </ul>
            </div>
          </div>

          {/* DPDP Act 2023 Compliance Statement */}
          <div style={{ background: "#f4f7f5", border: "1px solid #d4ded8", borderRadius: "6px", padding: "0.85rem 1rem", fontSize: "0.75rem", color: "var(--c-text-muted)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <ShieldCheck size={18} style={{ color: "var(--c-primary)", flexShrink: 0 }} />
            <span>
              <strong>DPDP Act 2023 Compliance Notice:</strong> Company A, Kochi stores guest itinerary details strictly for reservation fulfillment. Your WhatsApp and contact credentials are encrypted and never shared with external aggregators.
            </span>
          </div>

          {/* Action button inside document for guests */}
          <div className="no-print" style={{ marginTop: "2rem", textAlign: "center" }}>
            {isAccepted ? (
              <div style={{ background: "#dcfce7", color: "#16a34a", padding: "1rem", borderRadius: "8px", fontWeight: 700, fontSize: "1.05rem" }}>
                ✓ Thank you! You have accepted Quote {quote.id}. Your consultant {quote.consultantName} will reach out via WhatsApp shortly to finalize your welcome kit.
              </div>
            ) : (
              <button 
                onClick={() => setIsAccepted(true)}
                className="btn btn-primary btn-lg"
              >
                <CheckCircle size={18} />
                <span>Accept Quote & Reserve ({quoteCalculator.formatINR(quote.grandTotal)})</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
