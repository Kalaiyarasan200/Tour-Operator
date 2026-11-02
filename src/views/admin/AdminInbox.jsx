import React, { useState, useEffect } from "react";
import { 
  Clock, Search, Filter, MessageCircle, Mail, Globe, Phone, 
  User, CheckCircle2, AlertCircle, FileText, Send, Sparkles, Plus 
} from "lucide-react";
import { AiExtractionDrawer } from "./AiExtractionDrawer";
import { storageService } from "../../services/storageService";
import { staffMembers } from "../../data/teamData";

export function AdminInbox({ 
  enquiries = [], 
  packages = [], 
  onUpdateEnquiry, 
  onBuildQuote,
  selectedEnquiryId,
  setSelectedEnquiryId 
}) {
  const [activeTab, setActiveTab] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [internalNoteText, setInternalNoteText] = useState("");

  // Pick first enquiry if none selected
  const selectedEnquiry = enquiries.find(e => e.id === selectedEnquiryId) || enquiries[0];

  // Helper to calculate live SLA remaining minutes based on 60 min commitment
  const getSlaStatus = (enquiry) => {
    const receivedMs = new Date(enquiry.receivedAt).getTime();
    const elapsedMinutes = Math.floor((Date.now() - receivedMs) / 60000);
    const targetMinutes = enquiry.slaTargetMinutes || 60;
    const remainingMinutes = targetMinutes - elapsedMinutes;

    if (enquiry.status === "Quoted" || enquiry.status === "Booked") {
      return { label: "Replied < 1h", class: "sla-good", remaining: remainingMinutes, done: true };
    }

    if (remainingMinutes <= 0) {
      return { label: `Breached (+${Math.abs(remainingMinutes)}m)`, class: "sla-urgent", remaining: remainingMinutes };
    } else if (remainingMinutes < 15) {
      return { label: `Urgent (${remainingMinutes}m left)`, class: "sla-urgent", remaining: remainingMinutes };
    } else if (remainingMinutes < 35) {
      return { label: `Warning (${remainingMinutes}m left)`, class: "sla-warning", remaining: remainingMinutes };
    } else {
      return { label: `On-time (${remainingMinutes}m left)`, class: "sla-good", remaining: remainingMinutes };
    }
  };

  // Filter enquiries
  const filteredEnquiries = enquiries.filter(enq => {
    if (activeTab !== "all" && enq.status.toLowerCase() !== activeTab.toLowerCase()) {
      return false;
    }
    if (channelFilter !== "all" && enq.channel.toLowerCase() !== channelFilter.toLowerCase()) {
      return false;
    }
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      const match = (enq.customerName + " " + enq.originalMessage + " " + (enq.phone || "")).toLowerCase();
      if (!match.includes(q)) return false;
    }
    return true;
  });

  // Handle Consultant Assignment
  const handleAssignConsultant = (consultantName) => {
    if (!selectedEnquiry) return;
    onUpdateEnquiry(selectedEnquiry.id, {
      assignedTo: consultantName,
      status: selectedEnquiry.status === "New" ? "Assigned" : selectedEnquiry.status
    });
  };

  // Handle Adding Internal Note
  const handleAddInternalNote = (e) => {
    e.preventDefault();
    if (!internalNoteText.trim() || !selectedEnquiry) return;

    const newNote = {
      id: `note-${Date.now()}`,
      author: "Active Consultant",
      timestamp: new Date().toISOString(),
      text: internalNoteText
    };

    const updatedNotes = [...(selectedEnquiry.consultantNotes || []), newNote];
    onUpdateEnquiry(selectedEnquiry.id, { consultantNotes: updatedNotes });
    setInternalNoteText("");
  };

  // Handle Send Reply
  const handleSendReply = (enquiryId, replyContent) => {
    onUpdateEnquiry(enquiryId, {
      status: "Quoted",
      aiDraftReply: replyContent,
      repliedAt: new Date().toISOString()
    });
    alert(`Draft approved and reply dispatched to ${selectedEnquiry.customerName} via ${selectedEnquiry.channel}! SLA stopped on time.`);
  };

  return (
    <div className="container" style={{ padding: "1.5rem 0 3rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "0.2rem" }}>
            Unified Admin Enquiry Inbox
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--c-text-muted)" }}>
            Centralized hub for all WhatsApp, Web, Email and Phone enquiries • 1-Hour SLA guarantee
          </p>
        </div>

        {/* Quick KPI badge */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ background: "#ffffff", border: "1px solid var(--c-border)", borderRadius: "8px", padding: "0.5rem 1rem", textAlign: "right" }}>
            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--c-text-light)", fontWeight: 700 }}>
              SLA Compliance
            </span>
            <div style={{ fontWeight: 700, color: "var(--c-success)", fontSize: "1.1rem" }}>
              94.2% &lt; 1 Hour
            </div>
          </div>
          <div style={{ background: "#ffffff", border: "1px solid var(--c-border)", borderRadius: "8px", padding: "0.5rem 1rem", textAlign: "right" }}>
            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--c-text-light)", fontWeight: 700 }}>
              Active Enquiries
            </span>
            <div style={{ fontWeight: 700, color: "var(--c-primary-dark)", fontSize: "1.1rem" }}>
              {enquiries.length} Ingested
            </div>
          </div>
        </div>
      </div>

      {/* Main Inbox Two-Column Layout */}
      <div className="inbox-layout">
        {/* Left Column: Filterable List of Enquiries */}
        <div className="inbox-sidebar">
          <div className="inbox-header">
            {/* Search Input */}
            <div style={{ position: "relative", marginBottom: "0.75rem" }}>
              <input
                type="text"
                placeholder="Search by name, message, phone..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem 0.5rem 2rem",
                  border: "1px solid var(--c-border)",
                  borderRadius: "6px",
                  fontSize: "0.825rem",
                  background: "#ffffff"
                }}
              />
              <Search size={14} style={{ position: "absolute", left: "9px", top: "11px", color: "var(--c-text-light)" }} />
            </div>

            {/* Channel Tabs */}
            <div style={{ display: "flex", gap: "0.35rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
              {["all", "whatsapp", "web form", "email"].map(ch => (
                <button
                  key={ch}
                  onClick={() => setChannelFilter(ch)}
                  style={{
                    background: channelFilter === ch ? "var(--c-primary)" : "#ffffff",
                    color: channelFilter === ch ? "#ffffff" : "var(--c-text-muted)",
                    border: "1px solid var(--c-border)",
                    fontSize: "0.72rem",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    textTransform: "capitalize",
                    fontWeight: 600
                  }}
                >
                  {ch}
                </button>
              ))}
            </div>

            {/* Status Tabs */}
            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
              {["all", "ai draft ready", "assigned", "quoted"].map(st => (
                <button
                  key={st}
                  onClick={() => setActiveTab(st)}
                  style={{
                    background: activeTab === st ? "var(--c-accent)" : "transparent",
                    color: activeTab === st ? "#ffffff" : "var(--c-text-muted)",
                    border: "none",
                    fontSize: "0.72rem",
                    padding: "0.15rem 0.45rem",
                    borderRadius: "3px",
                    cursor: "pointer",
                    textTransform: "capitalize",
                    fontWeight: 600
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* List Items */}
          <div className="inbox-list">
            {filteredEnquiries.map(enq => {
              const isSelected = selectedEnquiry?.id === enq.id;
              const sla = getSlaStatus(enq);

              return (
                <div
                  key={enq.id}
                  className={`enquiry-item ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelectedEnquiryId(enq.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                    <span style={{ fontWeight: 700, color: "var(--c-primary-dark)", fontSize: "0.875rem" }}>
                      {enq.customerName}
                    </span>
                    <span className={`sla-countdown ${sla.class}`}>
                      <Clock size={11} />
                      <span>{sla.label}</span>
                    </span>
                  </div>

                  <div style={{ fontSize: "0.75rem", color: "var(--c-accent-dark)", fontWeight: 600, marginBottom: "0.25rem" }}>
                    Via {enq.channel} • {enq.id}
                  </div>

                  <div style={{ 
                    fontSize: "0.8rem", 
                    color: "var(--c-text-muted)", 
                    whiteSpace: "nowrap", 
                    overflow: "hidden", 
                    textOverflow: "ellipsis",
                    marginBottom: "0.35rem"
                  }}>
                    {enq.originalMessage}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--c-text-light)" }}>
                    <span>Assigned: <strong>{enq.assignedTo ? enq.assignedTo.split(' ')[0] : 'None'}</strong></span>
                    <span style={{ 
                      background: enq.status === 'Quoted' ? '#dcfce7' : '#f1f5f9',
                      color: enq.status === 'Quoted' ? '#16a34a' : '#475569',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '4px',
                      fontWeight: 600
                    }}>
                      {enq.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed View & AI Extraction Drawer */}
        <div className="inbox-main">
          {selectedEnquiry ? (
            <div>
              {/* Header with Consultant Assignment & Status Pipeline */}
              <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--c-border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#ffffff" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <h3 style={{ fontSize: "1.25rem", color: "var(--c-primary-dark)" }}>
                      {selectedEnquiry.customerName}
                    </h3>
                    <span style={{ fontSize: "0.75rem", background: "#f1f5f9", padding: "0.2rem 0.6rem", borderRadius: "4px", color: "var(--c-text-muted)" }}>
                      {selectedEnquiry.id}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--c-text-muted)", marginTop: "2px" }}>
                    Phone: {selectedEnquiry.phone} | Email: {selectedEnquiry.email} | Channel: {selectedEnquiry.channel}
                  </div>
                </div>

                {/* Assignment Controls */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <User size={14} style={{ color: "var(--c-text-light)" }} />
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)" }}>
                      Assignee:
                    </label>
                    <select
                      value={selectedEnquiry.assignedTo || "Unassigned"}
                      onChange={(e) => handleAssignConsultant(e.target.value)}
                      style={{
                        padding: "0.35rem 0.65rem",
                        border: "1px solid var(--c-border)",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        background: "var(--c-surface-subtle)"
                      }}
                    >
                      <option value="Unassigned">Unassigned</option>
                      {staffMembers.map(s => (
                        <option key={s.id} value={`${s.name} (${s.role})`}>
                          {s.name} ({s.role})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => onBuildQuote(selectedEnquiry, null, selectedEnquiry.aiExtracted)}
                    style={{ borderColor: "var(--c-accent)", color: "var(--c-accent-dark)" }}
                  >
                    <FileText size={13} />
                    <span>Create Quote</span>
                  </button>
                </div>
              </div>

              {/* AI Co-Pilot & Extraction Drawer */}
              <AiExtractionDrawer
                enquiry={selectedEnquiry}
                packages={packages}
                onUpdateEnquiry={onUpdateEnquiry}
                onBuildQuote={onBuildQuote}
                onSendReply={handleSendReply}
              />

              {/* Internal Consultant Notes Section */}
              <div style={{ padding: "1.5rem", borderTop: "1px solid var(--c-border)", background: "#fafaf8" }}>
                <h4 style={{ fontSize: "0.95rem", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span>Internal Staff Notes & Resort Availability Logs</span>
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                  {selectedEnquiry.consultantNotes?.length > 0 ? (
                    selectedEnquiry.consultantNotes.map(n => (
                      <div key={n.id} style={{ background: "#ffffff", border: "1px solid var(--c-border)", padding: "0.6rem 0.9rem", borderRadius: "6px", fontSize: "0.825rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", color: "var(--c-text-light)", fontSize: "0.72rem", marginBottom: "2px" }}>
                          <span style={{ fontWeight: 700, color: "var(--c-primary)" }}>{n.author}</span>
                          <span>{new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div style={{ color: "var(--c-text-main)" }}>{n.text}</div>
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: "0.8rem", color: "var(--c-text-light)", fontStyle: "italic" }}>
                      No internal notes recorded yet. Add hotel checks, room categories, or client special requests below.
                    </div>
                  )}
                </div>

                <form onSubmit={handleAddInternalNote} style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    placeholder="Add team note (e.g. 'Checked Lake Resort plunge villa availability for Dec 12')..."
                    value={internalNoteText}
                    onChange={(e) => setInternalNoteText(e.target.value)}
                    style={{ flex: 1, padding: "0.5rem 0.75rem", border: "1px solid var(--c-border)", borderRadius: "6px", fontSize: "0.825rem" }}
                  />
                  <button type="submit" className="btn btn-outline btn-sm">
                    <Plus size={13} />
                    <span>Post Note</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div style={{ padding: "3rem", textAlign: "center", color: "var(--c-text-muted)" }}>
              No enquiries match the current filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
