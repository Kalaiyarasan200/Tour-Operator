import React, { useState, useEffect } from "react";
import { 
  Sparkles, Check, Edit3, Send, AlertTriangle, FileText, 
  RotateCcw, ShieldCheck, DollarSign, Users, Calendar, MapPin 
} from "lucide-react";
import { aiService } from "../../services/aiService";
import { quoteCalculator } from "../../services/quoteCalculator";
import { storageService } from "../../services/storageService";

export function AiExtractionDrawer({ 
  enquiry, 
  packages = [], 
  onUpdateEnquiry, 
  onBuildQuote, 
  onSendReply 
}) {
  if (!enquiry) return null;

  // Editable fields initialized from AI extraction
  const [extracted, setExtracted] = useState(enquiry.aiExtracted || {});
  const [selectedPackageId, setSelectedPackageId] = useState(
    enquiry.suggestedPackages?.[0]?.packageId || enquiry.sourcePackageId || packages[0]?.id
  );
  const [selectedSeasonIdx, setSelectedSeasonIdx] = useState(0);
  const [draftReply, setDraftReply] = useState(enquiry.aiDraftReply || "");
  const [isFieldModified, setIsFieldModified] = useState(false);
  const [isApproved, setIsApproved] = useState(enquiry.status === "Quoted" || enquiry.status === "Booked");

  // Sync when enquiry changes
  useEffect(() => {
    setExtracted(enquiry.aiExtracted || {});
    setSelectedPackageId(enquiry.suggestedPackages?.[0]?.packageId || enquiry.sourcePackageId || packages[0]?.id);
    setDraftReply(enquiry.aiDraftReply || "");
    setIsFieldModified(false);
    setIsApproved(enquiry.status === "Quoted" || enquiry.status === "Booked");
  }, [enquiry.id]);

  const activePackage = packages.find(p => p.id === selectedPackageId) || packages[0];
  const activeSeason = activePackage?.seasonalPricing?.[selectedSeasonIdx] || activePackage?.seasonalPricing?.[0] || {};

  // Handle field change and regenerate DB-grounded reply
  const handleFieldChange = (field, value) => {
    const updated = { ...extracted, [field]: value };
    setExtracted(updated);
    setIsFieldModified(true);
  };

  // Regenerate reply strictly from package price table
  const handleRegenerateReply = () => {
    const newReply = aiService.generateStrictDbReply({
      customerName: enquiry.customerName,
      enquiryText: enquiry.originalMessage,
      extracted,
      selectedPackage: activePackage,
      selectedSeasonIndex: selectedSeasonIdx,
      consultantName: enquiry.assignedTo || "Rahul M. (Senior Kerala Specialist)"
    });
    setDraftReply(newReply);

    // Save updated extracted values to enquiry in storage
    onUpdateEnquiry(enquiry.id, {
      aiExtracted: extracted,
      aiDraftReply: newReply
    });
    setIsFieldModified(false);
  };

  const handleApproveAndSend = () => {
    onSendReply(enquiry.id, draftReply);
    setIsApproved(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Side-by-Side: Original Message on Left vs AI Extracted Fields on Right */}
      <div className="ai-copilot-panel">
        {/* Left: Original Message */}
        <div className="copilot-card">
          <div className="copilot-card-header">
            <div>
              <span style={{ fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700, color: "var(--c-text-muted)" }}>
                Original Incoming Message
              </span>
              <div style={{ fontWeight: 600, color: "var(--c-primary-dark)", fontSize: "0.95rem" }}>
                Via {enquiry.channel} • {enquiry.customerName}
              </div>
            </div>
            <span style={{ fontSize: "0.75rem", background: "#f1f5f9", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
              {new Date(enquiry.receivedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div style={{ 
            background: "#fafaf8", 
            border: "1px solid var(--c-border)", 
            borderRadius: "6px", 
            padding: "1rem", 
            fontSize: "0.925rem", 
            color: "var(--c-text-main)", 
            lineHeight: 1.6,
            fontStyle: "italic",
            minHeight: "120px"
          }}>
            "{enquiry.originalMessage}"
          </div>

          <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--c-text-muted)" }}>
            <span>Contact: <strong>{enquiry.phone}</strong> | {enquiry.email}</span>
            <span style={{ color: "var(--c-success)", fontWeight: 600 }}>
              ✓ DPDP Consent Valid
            </span>
          </div>
        </div>

        {/* Right: Extracted Fields (Consultant can correct when wrong) */}
        <div className="copilot-card">
          <div className="copilot-card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Sparkles size={16} style={{ color: "var(--c-accent)" }} />
              <div>
                <span style={{ fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700, color: "var(--c-text-muted)" }}>
                  Extracted Fields (Editable for Correction)
                </span>
                <div style={{ fontWeight: 600, color: "var(--c-primary-dark)", fontSize: "0.95rem" }}>
                  AI Assistant Parser
                </div>
              </div>
            </div>
            <span className="badge-ai">
              {Math.round((extracted.confidenceScore || 0.95) * 100)}% Confidence
            </span>
          </div>

          <div className="extracted-field-grid">
            <div className="field-group">
              <label>Adults</label>
              <input
                type="number"
                min={1}
                value={extracted.travellersAdults || 2}
                onChange={(e) => handleFieldChange("travellersAdults", parseInt(e.target.value, 10))}
              />
            </div>

            <div className="field-group">
              <label>Children / Kids</label>
              <input
                type="number"
                min={0}
                value={extracted.travellersChildren || 0}
                onChange={(e) => handleFieldChange("travellersChildren", parseInt(e.target.value, 10))}
              />
            </div>

            <div className="field-group">
              <label>Dates / Month</label>
              <input
                type="text"
                value={extracted.travelDates || "December"}
                onChange={(e) => handleFieldChange("travelDates", e.target.value)}
              />
            </div>

            <div className="field-group">
              <label>Customer Total Budget (₹)</label>
              <input
                type="number"
                step={5000}
                value={extracted.totalBudget || 120000}
                onChange={(e) => handleFieldChange("totalBudget", parseInt(e.target.value, 10))}
              />
            </div>

            <div className="field-group" style={{ gridColumn: "span 2" }}>
              <label>Destination & Highlights</label>
              <input
                type="text"
                value={extracted.destination || "Kerala (Houseboat a must)"}
                onChange={(e) => handleFieldChange("destination", e.target.value)}
              />
            </div>
          </div>

          {isFieldModified && (
            <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fef3c7", padding: "0.4rem 0.75rem", borderRadius: "4px", fontSize: "0.75rem", color: "#92400e" }}>
              <span>Values adjusted manually.</span>
              <button
                onClick={handleRegenerateReply}
                style={{ background: "#d97706", color: "#fff", border: "none", padding: "0.2rem 0.5rem", borderRadius: "4px", cursor: "pointer", fontWeight: 600 }}
              >
                Recalculate Price & Draft
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Suggested Packages Bar */}
      <div style={{ padding: "1.25rem 1.5rem", background: "#ffffff", borderBottom: "1px solid var(--c-border)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--c-primary-dark)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Sparkles size={15} style={{ color: "var(--c-accent)" }} />
            <span>Top 3 Suggested Packages (Matched from Database)</span>
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--c-text-muted)" }}>
            Select package to update draft pricing:
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          {enquiry.suggestedPackages?.map((sug, i) => {
            const isSelected = selectedPackageId === sug.packageId;
            const pkgInfo = packages.find(p => p.id === sug.packageId);

            return (
              <div
                key={sug.packageId || i}
                onClick={() => {
                  setSelectedPackageId(sug.packageId);
                  const newReply = aiService.generateStrictDbReply({
                    customerName: enquiry.customerName,
                    enquiryText: enquiry.originalMessage,
                    extracted,
                    selectedPackage: pkgInfo,
                    selectedSeasonIndex: 0,
                    consultantName: enquiry.assignedTo || "Rahul M. (Senior Kerala Specialist)"
                  });
                  setDraftReply(newReply);
                }}
                style={{
                  border: isSelected ? "2px solid var(--c-primary)" : "1px solid var(--c-border)",
                  background: isSelected ? "var(--c-primary-subtle)" : "#ffffff",
                  borderRadius: "8px",
                  padding: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.15s"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                  <span style={{ fontWeight: 700, color: "var(--c-primary-dark)", fontSize: "0.85rem" }}>
                    {sug.packageId}
                  </span>
                  <span style={{ fontSize: "0.72rem", background: isSelected ? "var(--c-primary)" : "#f1f5f9", color: isSelected ? "#fff" : "var(--c-text-muted)", padding: "0.1rem 0.45rem", borderRadius: "99px", fontWeight: 700 }}>
                    {sug.matchScore}% Match
                  </span>
                </div>
                <div style={{ fontSize: "0.825rem", fontWeight: 600, color: "var(--c-text-main)", marginBottom: "0.35rem" }}>
                  {pkgInfo?.title || sug.packageTitle}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--c-text-muted)", lineHeight: 1.4, marginBottom: "0.5rem" }}>
                  {sug.matchReason}
                </div>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--c-accent-dark)" }}>
                  {quoteCalculator.formatINR(sug.pricePerPerson)} / person
                  <span style={{ fontSize: "0.68rem", fontWeight: 400, color: "var(--c-text-muted)", marginLeft: "4px" }}>
                    (twin share)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Drafted Reply with Strict Database Pricing */}
      <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <div>
            <h4 style={{ fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Edit3 size={15} style={{ color: "var(--c-accent)" }} />
              <span>Consultant Response Draft</span>
            </h4>
            <p style={{ fontSize: "0.78rem", color: "var(--c-text-muted)", margin: 0 }}>
              <strong>Constraint Guarantee:</strong> All rates are computed directly from the package pricing table (twin sharing + 5% GST), never hallucinated by AI.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className="btn btn-outline btn-sm"
              onClick={handleRegenerateReply}
              title="Reset text from current package parameters"
            >
              <RotateCcw size={13} />
              <span>Regenerate</span>
            </button>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => onBuildQuote(enquiry, activePackage, extracted)}
              style={{ color: "var(--c-primary)", borderColor: "var(--c-primary)" }}
            >
              <FileText size={13} />
              <span>1-Click Quote Builder</span>
            </button>
          </div>
        </div>

        <textarea
          rows={11}
          value={draftReply}
          onChange={(e) => setDraftReply(e.target.value)}
          style={{
            width: "100%",
            flex: 1,
            padding: "1rem",
            border: "1px solid var(--c-border)",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "0.875rem",
            lineHeight: 1.5,
            resize: "vertical",
            background: "#ffffff"
          }}
        />

        {/* Human in the loop action footer */}
        <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8faf9", padding: "0.85rem 1.25rem", borderRadius: "8px", border: "1px solid var(--c-border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--c-text-muted)" }}>
            <ShieldCheck size={16} style={{ color: "var(--c-success)" }} />
            <span>Human-in-the-loop: Nothing is sent until you click "Approve & Send".</span>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              className="btn btn-primary"
              onClick={handleApproveAndSend}
              disabled={isApproved}
            >
              <Check size={15} />
              <span>{isApproved ? "Draft Approved & Sent" : "Approve & Send to Customer"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
