import React, { useState } from "react";
import { X, Send, ShieldCheck, Sparkles, MessageCircle, Mail, Globe, Phone, CheckCircle2 } from "lucide-react";
import { aiService } from "../../services/aiService";
import { storageService } from "../../services/storageService";

export function EnquiryModal({ isOpen, onClose, selectedPackage, onSuccess }) {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState("WhatsApp");
  const [message, setMessage] = useState(
    selectedPackage ? `Interested in booking ${selectedPackage.title} (${selectedPackage.days} days). Please share itinerary, twin sharing rates and availability.` : ""
  );
  const [dpdpConsent, setDpdpConsent] = useState(true);
  const [whatsappConsent, setWhatsappConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);

  // 1-click test button to inject the prompt's exact sample enquiry
  const handleInsertSampleEnquiry = () => {
    setCustomerName("Vikram Nair");
    setPhone("+91 98401 23456");
    setEmail("vikram.nair@example.com");
    setChannel("WhatsApp");
    setMessage("Hi, 2 adults and 1 kid, Kerala 5-6 nights in December, budget around 1.2 lakh total, houseboat a must");
    setDpdpConsent(true);
    setWhatsappConsent(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dpdpConsent) {
      alert("Please accept the DPDP Act 2023 consent to allow Company A to process your enquiry.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // 1. AI Extraction
      const extracted = aiService.extractEnquiryDetails(message);

      // 2. Package matching
      const allPkgs = storageService.getPackages();
      const suggested = aiService.suggestPackages(extracted, allPkgs);

      // 3. Strict DB Reply generation
      const matchedPkg = selectedPackage || allPkgs.find(p => p.id === suggested[0]?.packageId) || allPkgs[0];
      const draftReply = aiService.generateStrictDbReply({
        customerName: customerName || "Guest",
        enquiryText: message,
        extracted,
        selectedPackage: matchedPkg,
        selectedSeasonIndex: 0,
        consultantName: "Rahul M. (Senior Kerala Specialist)"
      });

      // 4. Ingest new enquiry
      const newEnquiry = storageService.addEnquiry({
        customerName: customerName || "Valued Traveller",
        phone: phone || "+91 98400 00000",
        email: email || "guest@traveler.com",
        channel,
        originalMessage: message,
        dpdpConsentGiven: dpdpConsent,
        whatsappConsentGiven: whatsappConsent,
        sourcePackageId: selectedPackage?.id || matchedPkg?.id,
        aiExtracted: extracted,
        suggestedPackages: suggested,
        aiDraftReply: draftReply,
        status: "AI Draft Ready",
        assignedTo: "Rahul M. (Kerala Specialist)"
      });

      // 5. Generate Instant Template Acknowledgement
      const ack = aiService.getAutoAcknowledgement(customerName, channel);

      setSubmittedResult({
        enquiryId: newEnquiry.id,
        ackTemplate: ack.templateText,
        extracted,
        matchedPkg
      });

      setIsSubmitting(false);
      if (onSuccess) onSuccess(newEnquiry);
    }, 600);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog">
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: "1.45rem", marginBottom: "0.2rem" }}>
              {selectedPackage ? `Enquire for ${selectedPackage.title}` : "Plan Your Kerala & South India Journey"}
            </h2>
            <p style={{ fontSize: "0.825rem", color: "var(--c-text-muted)" }}>
              Guaranteed personalized consultant response within 1 hour • Zero pressure
            </p>
          </div>
          <button 
            onClick={onClose} 
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-text-muted)" }}
          >
            <X size={20} />
          </button>
        </div>

        {submittedResult ? (
          <div className="modal-body" style={{ textAlign: "center", padding: "2.5rem 2rem" }}>
            <div style={{ width: 56, height: 56, background: "#dcfce7", color: "#16a34a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "var(--c-primary-dark)" }}>
              Enquiry Received ({submittedResult.enquiryId})
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--c-text-muted)", marginBottom: "1.5rem" }}>
              Our Kochi desk has received your request. The 1-hour response countdown has started.
            </p>

            {/* Instant Automated Acknowledgement preview */}
            <div style={{ background: "#f8faf9", border: "1px solid var(--c-border)", borderRadius: "8px", padding: "1.25rem", textAlign: "left", marginBottom: "1.5rem", fontSize: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontWeight: 700, color: "var(--c-primary)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Sparkles size={14} style={{ color: "var(--c-accent)" }} />
                  <span>Instant Automated Acknowledgement Sent</span>
                </span>
                <span style={{ fontSize: "0.72rem", background: "#e0f2fe", color: "#0369a1", padding: "0.2rem 0.5rem", borderRadius: "99px", fontWeight: 600 }}>
                  Via {channel}
                </span>
              </div>
              <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", color: "var(--c-text-muted)", fontSize: "0.825rem" }}>
                {submittedResult.ackTemplate}
              </pre>
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button className="btn btn-outline" onClick={onClose}>
                Close
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  onClose();
                  // navigate to inbox
                  window.dispatchEvent(new CustomEvent("navToInbox", { detail: submittedResult.enquiryId }));
                }}
              >
                <span>View in Admin Inbox</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Quick sample enquiry filler */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--c-accent-subtle)", border: "1px solid rgba(196,139,56,0.3)", padding: "0.6rem 0.9rem", borderRadius: "6px", marginBottom: "1.25rem" }}>
                <div style={{ fontSize: "0.8rem", color: "var(--c-primary-dark)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Sparkles size={14} style={{ color: "var(--c-accent)" }} />
                  <span><strong>Candidate Prompt Test:</strong> Load the sample enquiry text</span>
                </div>
                <button
                  type="button"
                  onClick={handleInsertSampleEnquiry}
                  style={{
                    background: "var(--c-accent)",
                    color: "#fff",
                    border: "none",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    fontWeight: 600
                  }}
                >
                  Insert Sample Enquiry
                </button>
              </div>

              {/* Ingestion Channel Simulator */}
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: "0.4rem" }}>
                  Channel Simulator
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {[
                    { id: "WhatsApp", icon: MessageCircle, label: "WhatsApp" },
                    { id: "Web Form", icon: Globe, label: "Web Form" },
                    { id: "Email", icon: Mail, label: "Email" },
                    { id: "Phone Call", icon: Phone, label: "Phone Log" }
                  ].map(c => {
                    const Icon = c.icon;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setChannel(c.id)}
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.4rem",
                          padding: "0.45rem",
                          borderRadius: "6px",
                          border: channel === c.id ? "2px solid var(--c-primary)" : "1px solid var(--c-border)",
                          background: channel === c.id ? "var(--c-primary-subtle)" : "#ffffff",
                          color: channel === c.id ? "var(--c-primary)" : "var(--c-text-muted)",
                          fontSize: "0.8rem",
                          fontWeight: channel === c.id ? 700 : 500,
                          cursor: "pointer"
                        }}
                      >
                        <Icon size={14} />
                        <span>{c.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Information */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Vikram Nair"
                    style={{ width: "100%", padding: "0.6rem 0.8rem", border: "1px solid var(--c-border)", borderRadius: "6px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98401 23456"
                    style={{ width: "100%", padding: "0.6rem 0.8rem", border: "1px solid var(--c-border)", borderRadius: "6px" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. vikram.nair@example.com"
                  style={{ width: "100%", padding: "0.6rem 0.8rem", border: "1px solid var(--c-border)", borderRadius: "6px" }}
                />
              </div>

              {/* Natural language message for AI Parsing */}
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)" }}>
                    Travel Requirements & Preferences *
                  </label>
                  <span style={{ fontSize: "0.72rem", color: "var(--c-accent-dark)", fontWeight: 600 }}>
                    AI extracts dates, guests & budget automatically
                  </span>
                </div>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g., Hi, 2 adults and 1 kid, Kerala 5-6 nights in December, budget around 1.2 lakh total, houseboat a must"
                  style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--c-border)", borderRadius: "6px", resize: "vertical", fontSize: "0.9rem" }}
                />
              </div>

              {/* DPDP Act 2023 Compliance & WhatsApp Consent */}
              <div className="dpdp-box">
                <label style={{ marginBottom: "0.5rem" }}>
                  <input
                    type="checkbox"
                    checked={dpdpConsent}
                    onChange={(e) => setDpdpConsent(e.target.checked)}
                  />
                  <span>
                    <strong>DPDP Act 2023 Consent:</strong> I agree to Company A, Kochi processing my contact and travel information strictly for tailoring this holiday proposal. Data will not be shared with third parties without consent.
                  </span>
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={whatsappConsent}
                    onChange={(e) => setWhatsappConsent(e.target.checked)}
                  />
                  <span>
                    Send me instant itinerary updates and quote PDF directly via WhatsApp.
                  </span>
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                <Send size={15} />
                <span>{isSubmitting ? "Ingesting & Analyzing..." : "Submit Enquiry (1-Hr SLA)"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
