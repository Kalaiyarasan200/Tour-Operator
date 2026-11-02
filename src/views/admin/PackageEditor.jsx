import React, { useState } from "react";
import { 
  ArrowLeft, Save, Eye, History, Copy, Trash2, Plus, 
  RotateCcw, Check, Sparkles, Calendar, DollarSign, Hotel, MapPin, ShieldAlert 
} from "lucide-react";
import { quoteCalculator } from "../../services/quoteCalculator";
import { PackageDetail } from "../public/PackageDetail";

export function PackageEditor({ 
  initialPackage, 
  onSave, 
  onBack, 
  onDuplicate, 
  onRollback 
}) {
  const isNew = !initialPackage?.id;

  const [formData, setFormData] = useState({
    id: initialPackage?.id || `PKG-KL-${Math.floor(Math.random() * 89) + 10}`,
    slug: initialPackage?.slug || "new-kerala-package",
    title: initialPackage?.title || "",
    subtitle: initialPackage?.subtitle || "",
    destination: initialPackage?.destination || "Kerala",
    days: initialPackage?.days || 6,
    nights: initialPackage?.nights || 5,
    style: initialPackage?.style || "Family & Leisure",
    status: initialPackage?.status || "Draft",
    coverImage: initialPackage?.coverImage || "/images/hero-munnar.jpg",
    hotelCategory: initialPackage?.hotelCategory || "4 Star Premium",
    hotels: initialPackage?.hotels || [
      { city: "Munnar", name: "Fragrant Nature Resort", rating: "4 Star", nights: 2 },
      { city: "Thekkady", name: "Cardamom County", rating: "4 Star", nights: 1 },
      { city: "Alleppey", name: "Private AC Houseboat", rating: "Deluxe Kettuvallam", nights: 1 }
    ],
    seasonalPricing: initialPackage?.seasonalPricing || [
      {
        id: "sp-1",
        season: "Peak (Oct - Mar)",
        months: "October to March",
        pricePerPerson: 32500,
        extraBedPrice: 12500,
        childNoBedPrice: 6500,
        hotelRating: "4 Star",
        twinSharingNotes: "Rates per adult on double/twin sharing basis. 5% GST extra."
      },
      {
        id: "sp-2",
        season: "Monsoon (Jun - Sep)",
        months: "June to September",
        pricePerPerson: 24900,
        extraBedPrice: 9800,
        childNoBedPrice: 4900,
        hotelRating: "4 Star",
        twinSharingNotes: "Rates per adult on double/twin sharing basis. 5% GST extra."
      }
    ],
    itinerary: initialPackage?.itinerary || [
      {
        day: 1,
        title: "Arrival in Cochin & Drive to Munnar Hills",
        description: "Scenic drive through Western Ghats with Cheeyappara waterfalls view.",
        stay: "Munnar",
        meals: "Dinner included"
      },
      {
        day: 2,
        title: "Eravikulam National Park & Tea Gardens",
        description: "Spot Nilgiri Tahr and visit tea factory for fresh tasting.",
        stay: "Munnar",
        meals: "Breakfast & Dinner"
      }
    ],
    inclusions: initialPackage?.inclusions || [
      "Accommodation in 4-star hotels & private AC houseboat",
      "Private AC vehicle with dedicated chauffeur",
      "Daily breakfast at all hotels & all meals on houseboat",
      "Guided spice plantation tour"
    ],
    exclusions: initialPackage?.exclusions || [
      "Flight tickets",
      "5% GST (itemized transparently on final quote)",
      "Personal extras"
    ],
    routeStops: initialPackage?.routeStops || ["Cochin", "Munnar", "Thekkady", "Alleppey", "Cochin"],
    version: initialPackage?.version || 1,
    versionHistory: initialPackage?.versionHistory || []
  });

  const [activeTab, setActiveTab] = useState("pricing"); // pricing, itinerary, general, versions
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [versionSummary, setVersionSummary] = useState("");

  // Handle Field Updates
  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  // Seasonal Pricing Row updates
  const handleSeasonChange = (index, field, value) => {
    const updated = [...formData.seasonalPricing];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, seasonalPricing: updated }));
  };

  const handleAddSeason = () => {
    const newSeason = {
      id: `sp-${Date.now()}`,
      season: "Summer Season (Apr - May)",
      months: "April to May",
      pricePerPerson: 27500,
      extraBedPrice: 10500,
      childNoBedPrice: 5500,
      hotelRating: "4 Star",
      twinSharingNotes: "Rates per adult on twin sharing basis. 5% GST extra."
    };
    setFormData(prev => ({ ...prev, seasonalPricing: [...prev.seasonalPricing, newSeason] }));
  };

  const handleRemoveSeason = (idx) => {
    const updated = formData.seasonalPricing.filter((_, i) => i !== idx);
    setFormData(prev => ({ ...prev, seasonalPricing: updated }));
  };

  // Itinerary Day updates
  const handleDayChange = (index, field, value) => {
    const updated = [...formData.itinerary];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, itinerary: updated }));
  };

  const handleAddDay = () => {
    const nextDayNum = formData.itinerary.length + 1;
    const newDay = {
      day: nextDayNum,
      title: `Day ${nextDayNum} Exploration`,
      description: "Detailed daily activity and highlights.",
      stay: "Boutique Resort",
      meals: "Breakfast included"
    };
    setFormData(prev => ({
      ...prev,
      days: nextDayNum,
      nights: nextDayNum - 1,
      itinerary: [...prev.itinerary, newDay]
    }));
  };

  const handleRemoveDay = (idx) => {
    const updated = formData.itinerary.filter((_, i) => i !== idx).map((d, i) => ({ ...d, day: i + 1 }));
    setFormData(prev => ({
      ...prev,
      days: updated.length,
      nights: Math.max(1, updated.length - 1),
      itinerary: updated
    }));
  };

  // Save handler
  const handleSave = (e) => {
    e.preventDefault();
    const pkgToSave = {
      ...formData,
      basePriceDisplay: formData.seasonalPricing?.[0]?.pricePerPerson || 25000,
      versionSummary: versionSummary || `Updated pricing matrix and package settings in in-house CMS.`
    };
    onSave(pkgToSave);
  };

  // Rollback to specific historic version
  const handleRollbackClick = (targetVersion) => {
    if (window.confirm(`Are you sure you want to restore Version ${targetVersion}? A new version entry will be created.`)) {
      onRollback(formData.id, targetVersion);
    }
  };

  return (
    <div className="container" style={{ padding: "1.5rem 0 4rem" }}>
      {/* Top CMS Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", background: "#ffffff", padding: "1rem 1.5rem", borderRadius: "8px", border: "1px solid var(--c-border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={onBack} className="btn btn-outline btn-sm">
            <ArrowLeft size={14} />
            <span>Back to CMS List</span>
          </button>
          <div>
            <h2 style={{ fontSize: "1.35rem", marginBottom: "2px" }}>
              {isNew ? "Create New Package" : `Editing: ${formData.title || formData.id}`}
            </h2>
            <div style={{ fontSize: "0.78rem", color: "var(--c-text-muted)" }}>
              Package ID: <strong>{formData.id}</strong> • Current Version: <strong>v{formData.version}</strong>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            type="button"
            className={`btn ${isPreviewMode ? "btn-accent" : "btn-outline"} btn-sm`}
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            <Eye size={14} />
            <span>{isPreviewMode ? "Exit Preview" : "Live Traveller Preview"}</span>
          </button>

          {!isNew && (
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => onDuplicate(formData.id)}
            >
              <Copy size={14} />
              <span>Duplicate</span>
            </button>
          )}

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleSave}
          >
            <Save size={14} />
            <span>Save & Publish (v{formData.version + 1})</span>
          </button>
        </div>
      </div>

      {/* If Preview Mode is active, render full Public Traveller Package Detail */}
      {isPreviewMode ? (
        <div style={{ border: "3px dashed var(--c-accent)", borderRadius: "12px", background: "#ffffff", overflow: "hidden" }}>
          <div style={{ background: "var(--c-accent)", color: "#fff", padding: "0.5rem 1rem", fontSize: "0.8rem", fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
            <span>LIVE SERVER-RENDERED PREVIEW MODE — EXACT TRAVELLER VIEW</span>
            <button 
              onClick={() => setIsPreviewMode(false)}
              style={{ background: "#fff", color: "var(--c-accent-dark)", border: "none", padding: "0.15rem 0.6rem", borderRadius: "4px", cursor: "pointer", fontWeight: 700, fontSize: "0.75rem" }}
            >
              Return to Editor
            </button>
          </div>
          <PackageDetail
            packageData={formData}
            onBack={() => setIsPreviewMode(false)}
            onOpenEnquiry={() => alert("Preview mode: Enquiry modal triggered.")}
          />
        </div>
      ) : (
        /* Edit Form with Tabs */
        <div style={{ background: "#ffffff", borderRadius: "12px", border: "1px solid var(--c-border)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
          {/* Sub Navigation Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid var(--c-border)", background: "#fafaf8" }}>
            {[
              { id: "pricing", label: "Seasonal Pricing Matrix (Under 5 Min Update)" },
              { id: "itinerary", label: "Day-Wise Itinerary" },
              { id: "general", label: "Package Overview & Hotels" },
              { id: "versions", label: `Version History & Rollback (${formData.versionHistory?.length || 1})` }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "0.85rem 1.25rem",
                  border: "none",
                  borderBottom: activeTab === tab.id ? "3px solid var(--c-primary)" : "3px solid transparent",
                  background: activeTab === tab.id ? "#ffffff" : "transparent",
                  color: activeTab === tab.id ? "var(--c-primary-dark)" : "var(--c-text-muted)",
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  fontSize: "0.875rem",
                  cursor: "pointer"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding: "2rem" }}>
            {/* TAB 1: Seasonal Pricing Matrix */}
            {activeTab === "pricing" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1.3rem", marginBottom: "0.3rem" }}>
                      Seasonal Price Table
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--c-text-muted)" }}>
                      Every price change can be executed in under 5 minutes without technical assistance. All quotes reflect per-person twin sharing rates and 5% GST.
                    </p>
                  </div>
                  <button type="button" className="btn btn-outline btn-sm" onClick={handleAddSeason}>
                    <Plus size={14} />
                    <span>Add Season Tier</span>
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {formData.seasonalPricing.map((sp, idx) => (
                    <div 
                      key={sp.id || idx}
                      style={{ 
                        border: "1px solid var(--c-border)", 
                        borderRadius: "8px", 
                        padding: "1.25rem", 
                        background: "#fafaf8" 
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <span style={{ fontWeight: 700, color: "var(--c-primary-dark)", fontSize: "0.95rem" }}>
                          Season #{idx + 1}: {sp.season}
                        </span>
                        {formData.seasonalPricing.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSeason(idx)}
                            style={{ background: "none", border: "none", color: "var(--c-danger)", cursor: "pointer" }}
                            title="Remove season"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr 1fr 1fr 1fr", gap: "1rem" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.2rem" }}>
                            Season Name
                          </label>
                          <input
                            type="text"
                            value={sp.season}
                            onChange={(e) => handleSeasonChange(idx, "season", e.target.value)}
                            style={{ width: "100%", padding: "0.45rem", border: "1px solid var(--c-border)", borderRadius: "4px" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.2rem" }}>
                            Months Applicable
                          </label>
                          <input
                            type="text"
                            value={sp.months}
                            onChange={(e) => handleSeasonChange(idx, "months", e.target.value)}
                            style={{ width: "100%", padding: "0.45rem", border: "1px solid var(--c-border)", borderRadius: "4px" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "var(--c-primary)", marginBottom: "0.2rem" }}>
                            Price / Person (₹) *
                          </label>
                          <input
                            type="number"
                            step={100}
                            value={sp.pricePerPerson}
                            onChange={(e) => handleSeasonChange(idx, "pricePerPerson", parseInt(e.target.value, 10))}
                            style={{ width: "100%", padding: "0.45rem", border: "2px solid var(--c-primary)", borderRadius: "4px", fontWeight: 700 }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.2rem" }}>
                            Extra Bed (Child) ₹
                          </label>
                          <input
                            type="number"
                            step={100}
                            value={sp.extraBedPrice || 0}
                            onChange={(e) => handleSeasonChange(idx, "extraBedPrice", parseInt(e.target.value, 10))}
                            style={{ width: "100%", padding: "0.45rem", border: "1px solid var(--c-border)", borderRadius: "4px" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.2rem" }}>
                            Child No Bed ₹
                          </label>
                          <input
                            type="number"
                            step={100}
                            value={sp.childNoBedPrice || 0}
                            onChange={(e) => handleSeasonChange(idx, "childNoBedPrice", parseInt(e.target.value, 10))}
                            style={{ width: "100%", padding: "0.45rem", border: "1px solid var(--c-border)", borderRadius: "4px" }}
                          />
                        </div>
                      </div>

                      <div style={{ marginTop: "0.75rem" }}>
                        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.2rem" }}>
                          Twin Sharing Terms & GST Notice
                        </label>
                        <input
                          type="text"
                          value={sp.twinSharingNotes}
                          onChange={(e) => handleSeasonChange(idx, "twinSharingNotes", e.target.value)}
                          style={{ width: "100%", padding: "0.45rem", border: "1px solid var(--c-border)", borderRadius: "4px", fontSize: "0.825rem" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Day-Wise Itinerary */}
            {activeTab === "itinerary" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1.3rem" }}>Day-Wise Itinerary Editor</h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--c-text-muted)" }}>
                      Total Days: {formData.days} ({formData.nights} Nights)
                    </p>
                  </div>
                  <button type="button" className="btn btn-outline btn-sm" onClick={handleAddDay}>
                    <Plus size={14} />
                    <span>Add Next Day</span>
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {formData.itinerary.map((d, idx) => (
                    <div 
                      key={idx}
                      style={{ border: "1px solid var(--c-border)", borderRadius: "8px", padding: "1.25rem", background: "#fafaf8" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                        <span style={{ fontWeight: 700, color: "var(--c-primary)", fontSize: "0.95rem" }}>
                          Day {d.day}
                        </span>
                        {formData.itinerary.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDay(idx)}
                            style={{ background: "none", border: "none", color: "var(--c-danger)", cursor: "pointer" }}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "1rem", marginBottom: "0.75rem" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.2rem" }}>
                            Day Title
                          </label>
                          <input
                            type="text"
                            value={d.title}
                            onChange={(e) => handleDayChange(idx, "title", e.target.value)}
                            style={{ width: "100%", padding: "0.45rem", border: "1px solid var(--c-border)", borderRadius: "4px" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.2rem" }}>
                            Overnight Stay Location
                          </label>
                          <input
                            type="text"
                            value={d.stay}
                            onChange={(e) => handleDayChange(idx, "stay", e.target.value)}
                            style={{ width: "100%", padding: "0.45rem", border: "1px solid var(--c-border)", borderRadius: "4px" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.2rem" }}>
                            Meals Included
                          </label>
                          <input
                            type="text"
                            value={d.meals}
                            onChange={(e) => handleDayChange(idx, "meals", e.target.value)}
                            style={{ width: "100%", padding: "0.45rem", border: "1px solid var(--c-border)", borderRadius: "4px" }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.2rem" }}>
                          Activity & Sightseeing Description
                        </label>
                        <textarea
                          rows={2}
                          value={d.description}
                          onChange={(e) => handleDayChange(idx, "description", e.target.value)}
                          style={{ width: "100%", padding: "0.5rem", border: "1px solid var(--c-border)", borderRadius: "4px", fontSize: "0.85rem" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: General Details */}
            {activeTab === "general" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                    Package Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    style={{ width: "100%", padding: "0.6rem", border: "1px solid var(--c-border)", borderRadius: "6px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                    Publishing Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    style={{ width: "100%", padding: "0.6rem", border: "1px solid var(--c-border)", borderRadius: "6px" }}
                  >
                    <option value="Published">Published (Live on Public Site)</option>
                    <option value="Draft">Draft (Internal Only)</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                    Subtitle / Summary
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => handleChange("subtitle", e.target.value)}
                    style={{ width: "100%", padding: "0.6rem", border: "1px solid var(--c-border)", borderRadius: "6px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                    Destination Region
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => handleChange("destination", e.target.value)}
                    style={{ width: "100%", padding: "0.6rem", border: "1px solid var(--c-border)", borderRadius: "6px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                    Travel Style
                  </label>
                  <input
                    type="text"
                    value={formData.style}
                    onChange={(e) => handleChange("style", e.target.value)}
                    style={{ width: "100%", padding: "0.6rem", border: "1px solid var(--c-border)", borderRadius: "6px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                    Hotel Standard
                  </label>
                  <input
                    type="text"
                    value={formData.hotelCategory}
                    onChange={(e) => handleChange("hotelCategory", e.target.value)}
                    style={{ width: "100%", padding: "0.6rem", border: "1px solid var(--c-border)", borderRadius: "6px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => handleChange("coverImage", e.target.value)}
                    style={{ width: "100%", padding: "0.6rem", border: "1px solid var(--c-border)", borderRadius: "6px" }}
                  />
                </div>
              </div>
            )}

            {/* TAB 4: Version History & Rollback System */}
            {activeTab === "versions" && (
              <div>
                <h3 style={{ fontSize: "1.3rem", marginBottom: "0.3rem" }}>
                  Version History & One-Click Rollback
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--c-text-muted)", marginBottom: "1.5rem" }}>
                  Every change is tracked with timestamp, author, and snapshot diffs. Restore any historical version in 1 click.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {formData.versionHistory && formData.versionHistory.length > 0 ? (
                    formData.versionHistory.map((ver, idx) => (
                      <div 
                        key={idx}
                        style={{
                          border: "1px solid var(--c-border)",
                          borderRadius: "8px",
                          padding: "1.25rem",
                          background: idx === 0 ? "var(--c-primary-subtle)" : "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between"
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                            <span style={{ fontWeight: 700, color: "var(--c-primary-dark)", fontSize: "0.95rem" }}>
                              Version {ver.version}
                            </span>
                            {idx === 0 && (
                              <span style={{ background: "var(--c-primary)", color: "#fff", fontSize: "0.7rem", padding: "0.1rem 0.45rem", borderRadius: "99px", fontWeight: 700 }}>
                                Current Active
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: "0.78rem", color: "var(--c-text-muted)", marginBottom: "0.35rem" }}>
                            Modified by <strong>{ver.author}</strong> on {new Date(ver.timestamp).toLocaleString()}
                          </div>
                          <div style={{ fontSize: "0.85rem", color: "var(--c-text-main)" }}>
                            {ver.summary}
                          </div>
                          {ver.dataSnapshot && (
                            <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--c-accent-dark)", fontWeight: 600 }}>
                              Snapshot: Peak {quoteCalculator.formatINR(ver.dataSnapshot.peakPrice)} • {ver.dataSnapshot.days} Days • Status: {ver.dataSnapshot.status || 'Published'}
                            </div>
                          )}
                        </div>

                        {idx !== 0 && (
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => handleRollbackClick(ver.version)}
                            style={{ borderColor: "var(--c-accent)", color: "var(--c-accent-dark)" }}
                          >
                            <RotateCcw size={13} />
                            <span>Rollback to v{ver.version}</span>
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <div style={{ color: "var(--c-text-muted)", fontStyle: "italic" }}>
                      Initial version recorded.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Version Note before saving */}
            <div style={{ marginTop: "2rem", borderTop: "1px solid var(--c-border)", paddingTop: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-text-muted)", marginBottom: "0.3rem" }}>
                Revision Summary Note (for Version History Log)
              </label>
              <input
                type="text"
                placeholder="e.g., Updated Peak Season rates for 2026/2027 and added Alleppey lunch cruise..."
                value={versionSummary}
                onChange={(e) => setVersionSummary(e.target.value)}
                style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid var(--c-border)", borderRadius: "6px", fontSize: "0.85rem" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
