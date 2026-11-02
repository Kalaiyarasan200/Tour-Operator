import React, { useState } from "react";
import { X, FileText, Printer, Share2, Check, Sparkles, Send, ShieldCheck, DollarSign } from "lucide-react";
import { quoteCalculator } from "../../services/quoteCalculator";
import { storageService } from "../../services/storageService";

export function QuoteBuilderModal({ isOpen, onClose, enquiry, packageData, packages = [], onQuoteGenerated }) {
  if (!isOpen) return null;

  const [selectedPkgId, setSelectedPkgId] = useState(packageData?.id || packages[0]?.id);
  const activePackage = packages.find(p => p.id === selectedPkgId) || packageData || packages[0];

  const [selectedSeasonIdx, setSelectedSeasonIdx] = useState(0);
  const activeSeason = activePackage?.seasonalPricing?.[selectedSeasonIdx] || activePackage?.seasonalPricing?.[0] || {};

  const [adults, setAdults] = useState(enquiry?.aiExtracted?.travellersAdults || 2);
  const [childrenWithBed, setChildrenWithBed] = useState(enquiry?.aiExtracted?.travellersChildren || 0);
  const [childrenNoBed, setChildrenNoBed] = useState(0);
  const [travelDates, setTravelDates] = useState(enquiry?.aiExtracted?.travelDates || "December 2026");

  // Optional Add-ons
  const [addOns, setAddOns] = useState([
    { id: "add-1", name: "Ayurvedic Couples Rejuvenation Massage (60 mins)", price: 3500, selected: false },
    { id: "add-2", name: "Kathakali Evening Dance Drama & Makeup Access", price: 1500, selected: false },
    { id: "add-3", name: "Houseboat Deluxe Upper-Deck Candlelight Dining", price: 4000, selected: false }
  ]);

  const toggleAddOn = (id) => {
    setAddOns(prev => prev.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  // Run calculation engine
  const calculation = quoteCalculator.calculateQuote({
    adults,
    childrenWithBed,
    childrenNoBed,
    pricePerPerson: activeSeason.pricePerPerson || 32500,
    extraBedPrice: activeSeason.extraBedPrice || 12500,
    childNoBedPrice: activeSeason.childNoBedPrice || 6500,
    addOns
  });

  const [generatedQuote, setGeneratedQuote] = useState(null);

  const handleGenerateQuote = () => {
    const quoteObject = {
      id: `QT-2026-${Math.floor(Math.random() * 899) + 100}`,
      enquiryId: enquiry?.id || null,
      customerName: enquiry?.customerName || "Valued Traveller",
      customerPhone: enquiry?.phone || "+91 98401 23456",
      customerEmail: enquiry?.email || "customer@example.com",
      channel: enquiry?.channel || "WhatsApp",
      packageId: activePackage.id,
      packageTitle: activePackage.title,
      packageDays: activePackage.days,
      seasonName: activeSeason.season || "Peak Season",
      travelDates,
      hotels: activePackage.hotels || [],
      itinerary: activePackage.itinerary || [],
      inclusions: activePackage.inclusions || [],
      exclusions: activePackage.exclusions || [],
      calculation,
      addOns: addOns.filter(a => a.selected),
      subtotal: calculation.subtotal,
      gstAmount: calculation.gstAmount,
      grandTotal: calculation.grandTotal,
      consultantName: enquiry?.assignedTo || "Rahul M. (Senior Consultant)",
      validUntil: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().slice(0, 10)
    };

    const saved = storageService.saveQuote(quoteObject);
    setGeneratedQuote(saved);
    if (onQuoteGenerated) onQuoteGenerated(saved);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog" style={{ maxWidth: "750px" }}>
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: "1.45rem", marginBottom: "0.2rem" }}>
              {generatedQuote ? "Official Branded Quotation Ready" : "1-Click Quote Builder"}
            </h2>
            <p style={{ fontSize: "0.825rem", color: "var(--c-text-muted)" }}>
              Per-person twin sharing rates • Transparent 5% GST itemization • Printable PDF & Web Link
            </p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-text-muted)" }}>
            <X size={20} />
          </button>
        </div>

        {generatedQuote ? (
          <div className="modal-body" style={{ padding: "2rem" }}>
            <div style={{ background: "#dcfce7", color: "#16a34a", padding: "1rem", borderRadius: "8px", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <Check size={20} />
              <div>
                <strong>Quote {generatedQuote.id} created successfully!</strong>
                <div style={{ fontSize: "0.8rem", color: "#15803d" }}>
                  Status updated in Admin Inbox. Direct link generated for {generatedQuote.customerName}.
                </div>
              </div>
            </div>

            {/* Quote Summary Card */}
            <div style={{ background: "#ffffff", border: "1px solid var(--c-border)", borderRadius: "10px", padding: "1.5rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--c-border)", paddingBottom: "1rem", marginBottom: "1rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.2rem", color: "var(--c-primary-dark)" }}>
                    {generatedQuote.packageTitle}
                  </h3>
                  <div style={{ fontSize: "0.825rem", color: "var(--c-text-muted)" }}>
                    {generatedQuote.packageDays} Days • {generatedQuote.seasonName} • Travel Dates: {generatedQuote.travelDates}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--c-text-light)", fontWeight: 700 }}>
                    Grand Total (Incl. 5% GST)
                  </div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 700, color: "var(--c-primary-dark)" }}>
                    {quoteCalculator.formatINR(generatedQuote.grandTotal)}
                  </div>
                </div>
              </div>

              {/* Price Line Items */}
              <div style={{ fontSize: "0.875rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{generatedQuote.calculation.adults} Adults @ {quoteCalculator.formatINR(generatedQuote.calculation.pricePerPerson)} (Twin Sharing):</span>
                  <strong>{quoteCalculator.formatINR(generatedQuote.calculation.adultSubtotal)}</strong>
                </div>
                {generatedQuote.calculation.childrenWithBed > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{generatedQuote.calculation.childrenWithBed} Child with Extra Bed @ {quoteCalculator.formatINR(generatedQuote.calculation.extraBedPrice)}:</span>
                    <strong>{quoteCalculator.formatINR(generatedQuote.calculation.childBedSubtotal)}</strong>
                  </div>
                )}
                {generatedQuote.calculation.addOnsSubtotal > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Optional Add-Ons:</span>
                    <strong>{quoteCalculator.formatINR(generatedQuote.calculation.addOnsSubtotal)}</strong>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px dashed var(--c-border)", paddingTop: "0.4rem" }}>
                  <span>Taxable Subtotal:</span>
                  <span>{quoteCalculator.formatINR(generatedQuote.subtotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--c-accent-dark)", fontWeight: 600 }}>
                  <span>Tour Operator GST (5%):</span>
                  <span>{quoteCalculator.formatINR(generatedQuote.gstAmount)}</span>
                </div>
              </div>
            </div>

            {/* Shareable Link Box */}
            <div style={{ background: "#f8faf9", border: "1px solid var(--c-border)", borderRadius: "8px", padding: "1rem", marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                Shareable Customer Web Link (Sent via WhatsApp / Email)
              </label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="text"
                  readOnly
                  value={`https://companya-kochi.com/quote/${generatedQuote.id}`}
                  style={{ flex: 1, padding: "0.5rem", border: "1px solid var(--c-border)", borderRadius: "4px", fontSize: "0.85rem", background: "#fff" }}
                />
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    navigator.clipboard?.writeText(`https://companya-kochi.com/quote/${generatedQuote.id}`);
                    alert("Quote URL copied to clipboard!");
                  }}
                >
                  <Share2 size={13} />
                  <span>Copy</span>
                </button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <button className="btn btn-outline" onClick={onClose}>
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("openQuotePublic", { detail: generatedQuote }));
                  onClose();
                }}
              >
                <FileText size={15} />
                <span>Open Branded Customer PDF / Web View</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="modal-body">
            {/* Package Selector */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                Base Package
              </label>
              <select
                value={selectedPkgId}
                onChange={(e) => setSelectedPkgId(e.target.value)}
                style={{ width: "100%", padding: "0.6rem", border: "1px solid var(--c-border)", borderRadius: "6px", fontWeight: 600 }}
              >
                {packages.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.id}: {p.title} ({p.days} Days / {p.nights || (p.days - 1)} Nights)
                  </option>
                ))}
              </select>
            </div>

            {/* Season Selector */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                Seasonal Pricing Rate
              </label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {activePackage.seasonalPricing?.map((sp, idx) => (
                  <button
                    key={sp.id || idx}
                    type="button"
                    onClick={() => setSelectedSeasonIdx(idx)}
                    style={{
                      flex: 1,
                      padding: "0.6rem",
                      borderRadius: "6px",
                      border: selectedSeasonIdx === idx ? "2px solid var(--c-primary)" : "1px solid var(--c-border)",
                      background: selectedSeasonIdx === idx ? "var(--c-primary-subtle)" : "#ffffff",
                      textAlign: "left",
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: "0.825rem", color: "var(--c-primary-dark)" }}>
                      {sp.season}
                    </div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--c-accent-dark)" }}>
                      {quoteCalculator.formatINR(sp.pricePerPerson)}
                      <span style={{ fontSize: "0.7rem", fontWeight: 400, color: "var(--c-text-muted)", marginLeft: "4px" }}>
                        pp
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Travellers Counts */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.2rem" }}>
                  Adults (Twin Sharing) *
                </label>
                <input
                  type="number"
                  min={1}
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value, 10))}
                  style={{ width: "100%", padding: "0.55rem", border: "1px solid var(--c-border)", borderRadius: "6px", fontWeight: 700 }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.2rem" }}>
                  Child (With Extra Bed)
                </label>
                <input
                  type="number"
                  min={0}
                  value={childrenWithBed}
                  onChange={(e) => setChildrenWithBed(parseInt(e.target.value, 10))}
                  style={{ width: "100%", padding: "0.55rem", border: "1px solid var(--c-border)", borderRadius: "6px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.2rem" }}>
                  Travel Dates / Month
                </label>
                <input
                  type="text"
                  value={travelDates}
                  onChange={(e) => setTravelDates(e.target.value)}
                  style={{ width: "100%", padding: "0.55rem", border: "1px solid var(--c-border)", borderRadius: "6px" }}
                />
              </div>
            </div>

            {/* Optional Experiences */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: "0.4rem" }}>
                Optional Experiences & Add-Ons
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {addOns.map(addon => (
                  <label
                    key={addon.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.6rem 0.85rem",
                      background: addon.selected ? "var(--c-primary-subtle)" : "#fafaf8",
                      border: "1px solid var(--c-border)",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.85rem"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <input
                        type="checkbox"
                        checked={addon.selected}
                        onChange={() => toggleAddOn(addon.id)}
                        style={{ accentColor: "var(--c-primary)" }}
                      />
                      <span style={{ fontWeight: addon.selected ? 600 : 400 }}>{addon.name}</span>
                    </div>
                    <strong>+{quoteCalculator.formatINR(addon.price)}</strong>
                  </label>
                ))}
              </div>
            </div>

            {/* Real-time Calculation Breakdown Preview */}
            <div style={{ background: "var(--c-primary-dark)", color: "#ffffff", borderRadius: "10px", padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginBottom: "0.3rem" }}>
                <span>Subtotal ({adults} Adults + {childrenWithBed} Kids):</span>
                <span>{quoteCalculator.formatINR(calculation.subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--c-accent-light)", marginBottom: "0.6rem" }}>
                <span>Tour Operator GST (5%):</span>
                <span>{quoteCalculator.formatINR(calculation.gstAmount)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.15rem", fontWeight: 700, borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "0.6rem" }}>
                <span>Grand Total:</span>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.45rem", color: "#ffffff" }}>
                  {quoteCalculator.formatINR(calculation.grandTotal)}
                </span>
              </div>
            </div>

            <div className="modal-footer" style={{ marginTop: "1.5rem" }}>
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleGenerateQuote}>
                <FileText size={15} />
                <span>Generate Official Quote & PDF</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
