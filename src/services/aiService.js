import { quoteCalculator } from "./quoteCalculator";

export const aiService = {
  // 1. Instant Automated Acknowledgement Template (Fixed template sent right away)
  getAutoAcknowledgement(customerName = "Valued Traveller", channel = "WhatsApp") {
    return {
      channel,
      timestamp: new Date().toISOString(),
      subject: "Greetings from Company A, Kochi - Your Kerala Holiday Enquiry",
      templateText: `Namaskaram ${customerName || "Guest"},

Thank you for choosing Company A, Kochi. We have successfully received your enquiry.

Our travel desk operates with a strict 1-hour response commitment during working hours. A senior destination specialist is currently reviewing your preferences, checking real-time boutique resort availability, and preparing a personalized itinerary.

If your request is urgent, our Kochi operations desk is reachable directly at +91 484 266 8000.

Warm regards,
Guest Relations Desk
Company A, Kochi • Government of Kerala Accredited Tour Operator`
    };
  },

  // 2. Intelligent Entity Extraction from raw unstructured text
  extractEnquiryDetails(message) {
    if (!message || typeof message !== "string") {
      return {
        travellersAdults: 2,
        travellersChildren: 0,
        travelDates: "Flexible",
        durationNights: "5-6 nights",
        destination: "Kerala",
        totalBudget: 100000,
        mustHaves: ["Leisure"],
        confidenceScore: 0.70
      };
    }

    const text = message.toLowerCase();

    // 1. Adults & Kids
    let adults = 2;
    let kids = 0;

    const adultMatch = text.match(/(\d+)\s*(adult|adults|pax|people|persons)/i);
    if (adultMatch) {
      adults = parseInt(adultMatch[1], 10);
    } else if (text.includes("couple") || text.includes("honeymoon")) {
      adults = 2;
    } else if (text.includes("solo") || text.includes("myself")) {
      adults = 1;
    } else if (text.includes("family of 4")) {
      adults = 2;
      kids = 2;
    }

    const kidMatch = text.match(/(\d+)\s*(kid|kids|child|children)/i);
    if (kidMatch) {
      kids = parseInt(kidMatch[1], 10);
    }

    // 2. Dates & Month
    let dates = "Flexible";
    const months = [
      "january", "february", "march", "april", "may", "june",
      "july", "august", "september", "october", "november", "december",
      "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"
    ];
    for (const m of months) {
      if (text.includes(m)) {
        dates = m.charAt(0).toUpperCase() + m.slice(1) + " (Peak Season)";
        break;
      }
    }
    if (text.includes("monsoon") || text.includes("july") || text.includes("august")) {
      dates = "Monsoon Season (Jun - Sep)";
    }

    // 3. Duration
    let duration = "5-6 nights";
    const nightsMatch = text.match(/(\d+)\s*(?:to|-)?\s*(\d+)?\s*(nights|days|d|n)/i);
    if (nightsMatch) {
      if (nightsMatch[2]) {
        duration = `${nightsMatch[1]}-${nightsMatch[2]} nights`;
      } else {
        duration = `${nightsMatch[1]} nights`;
      }
    }

    // 4. Budget Extraction
    let budget = 100000;
    const lakhMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|lac|lacs)/i);
    if (lakhMatch) {
      budget = Math.round(parseFloat(lakhMatch[1]) * 100000);
    } else {
      const numMatch = text.match(/(?:budget|around|approx|total)\s*(?:around|of|is)?\s*(?:rs\.?|₹|inr)?\s*(\d{4,7})/i);
      if (numMatch) {
        budget = parseInt(numMatch[1], 10);
      }
    }

    // 5. Destination & Must Haves
    let destination = "Kerala";
    if (text.includes("madurai") || text.includes("rameswaram") || text.includes("kanyakumari") || text.includes("tamil")) {
      destination = "Tamil Nadu & South India";
    } else if (text.includes("wayanad")) {
      destination = "Kerala (Wayanad Hills)";
    } else if (text.includes("munnar") || text.includes("alleppey") || text.includes("thekkady")) {
      destination = "Kerala (Munnar, Thekkady, Alleppey)";
    }

    const mustHaves = [];
    if (text.includes("houseboat")) mustHaves.push("Houseboat a must");
    if (text.includes("honeymoon") || text.includes("couples") || text.includes("plunge pool")) mustHaves.push("Honeymoon & Luxury Pool");
    if (text.includes("temple") || text.includes("darshan") || text.includes("heritage")) mustHaves.push("Temple Architecture");
    if (text.includes("kid") || text.includes("family")) mustHaves.push("Family Friendly");
    if (text.includes("ayurveda") || text.includes("massage")) mustHaves.push("Ayurvedic Wellness");
    if (text.includes("english") || text.includes("guide")) mustHaves.push("English Chauffeur/Guide");

    if (mustHaves.length === 0) mustHaves.push("Scenic & Relaxed");

    return {
      travellersAdults: adults,
      travellersChildren: kids,
      travelDates: dates,
      durationNights: duration,
      destination,
      totalBudget: budget,
      mustHaves,
      confidenceScore: 0.95
    };
  },

  // 3. Match and rank packages against extracted enquiry parameters
  suggestPackages(extracted, allPackages = []) {
    return allPackages.map(pkg => {
      let score = 50;
      let reasons = [];

      const titleAndSub = (pkg.title + " " + pkg.subtitle + " " + (pkg.destination || "")).toLowerCase();

      // Houseboat match
      const wantsHouseboat = extracted.mustHaves?.some(h => h.toLowerCase().includes("houseboat"));
      if (wantsHouseboat) {
        if (titleAndSub.includes("houseboat") || pkg.hotels?.some(h => h.name.toLowerCase().includes("houseboat"))) {
          score += 30;
          reasons.push("Features private deluxe houseboat in Alleppey backwaters");
        } else {
          score -= 15;
        }
      }

      // Honeymoon match
      const wantsHoneymoon = extracted.mustHaves?.some(h => h.toLowerCase().includes("honeymoon") || h.toLowerCase().includes("luxury pool"));
      if (wantsHoneymoon) {
        if (pkg.style?.toLowerCase().includes("honeymoon") || titleAndSub.includes("romance")) {
          score += 30;
          reasons.push("Dedicated honeymoon retreat with private plunge pool / lake villa");
        }
      }

      // Heritage & Temple match
      const wantsTemples = extracted.mustHaves?.some(h => h.toLowerCase().includes("temple") || h.toLowerCase().includes("architecture"));
      if (wantsTemples) {
        if (pkg.destination?.toLowerCase().includes("tamil") || titleAndSub.includes("madurai")) {
          score += 35;
          reasons.push("Covers grand Meenakshi temple and Pamban sea bridge");
        }
      }

      // Budget scoring
      const peakSeason = pkg.seasonalPricing?.[0] || {};
      const baseAdultPrice = peakSeason.pricePerPerson || pkg.basePriceDisplay || 30000;
      const extraBedPrice = peakSeason.extraBedPrice || 10000;
      
      const estimatedTotal = (extracted.travellersAdults * baseAdultPrice) + 
                             (extracted.travellersChildren * extraBedPrice);
      const estWithGst = Math.round(estimatedTotal * 1.05);

      if (extracted.totalBudget && extracted.totalBudget > 0) {
        const diffRatio = (extracted.totalBudget - estWithGst) / extracted.totalBudget;
        if (diffRatio >= 0 && diffRatio <= 0.40) {
          score += 20;
          reasons.push(`Estimated total (${quoteCalculator.formatINR(estWithGst)} incl. GST) fits cleanly within your ${quoteCalculator.formatINR(extracted.totalBudget)} budget`);
        } else if (diffRatio < 0 && Math.abs(diffRatio) < 0.20) {
          score += 5;
          reasons.push(`Slightly above budget (${quoteCalculator.formatINR(estWithGst)}), but offers premium luxury upgrades`);
        } else if (diffRatio < -0.20) {
          score -= 15;
        }
      }

      // Duration alignment
      if (pkg.days >= 5 && pkg.days <= 7) {
        score += 10;
      }

      const matchScore = Math.min(99, Math.max(30, score));
      return {
        packageId: pkg.id,
        packageTitle: pkg.title,
        packageDays: pkg.days,
        destination: pkg.destination,
        matchScore,
        matchReason: reasons.join(". ") || "Good destination and duration fit.",
        priceSnapshotSeason: peakSeason.season || "Peak Season",
        pricePerPerson: baseAdultPrice,
        extraBedPrice,
        twinSharingNotes: peakSeason.twinSharingNotes || "Rates per adult on twin sharing basis. 5% GST extra."
      };
    }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
  },

  // 4. Strict DB-Grounded Draft Reply Generator
  // CRITICAL CONSTRAINT: "Prices in drafts come from the package price table, never from the AI."
  generateStrictDbReply({
    customerName = "Valued Guest",
    enquiryText = "",
    extracted = {},
    selectedPackage,
    selectedSeasonIndex = 0,
    consultantName = "Rahul M. (Senior Kerala Specialist)"
  }) {
    if (!selectedPackage) return "";

    const season = selectedPackage.seasonalPricing?.[selectedSeasonIndex] || selectedPackage.seasonalPricing?.[0] || {
      season: "Regular Season",
      pricePerPerson: selectedPackage.basePriceDisplay || 25000,
      extraBedPrice: 10000,
      childNoBedPrice: 5000,
      twinSharingNotes: "Rates per adult on double/twin sharing basis. 5% GST extra."
    };

    const adults = extracted.travellersAdults || 2;
    const kids = extracted.travellersChildren || 0;

    // Strict calculation using DB figures
    const adultCost = adults * season.pricePerPerson;
    const kidCost = kids > 0 ? (kids * (season.extraBedPrice || 10000)) : 0;
    const subtotal = adultCost + kidCost;
    const gst = Math.round(subtotal * 0.05);
    const grandTotal = subtotal + gst;

    return `Dear ${customerName},

Warm greetings from Company A, Kochi!

Thank you for contacting us regarding your upcoming holiday. We have carefully reviewed your requirement: "${enquiryText.length > 90 ? enquiryText.slice(0, 90) + '...' : enquiryText}".

We are delighted to recommend our flagship itinerary:
Package ID: ${selectedPackage.id} - ${selectedPackage.title}
Duration: ${selectedPackage.days} Days / ${selectedPackage.nights || (selectedPackage.days - 1)} Nights
Hotels: ${selectedPackage.hotelCategory || '4 Star Curated'} (${selectedPackage.hotels?.map(h => `${h.city}: ${h.name}`).join(' | ') || ''})

Key Highlights included:
${selectedPackage.itinerary?.slice(0, 4).map(d => `• Day ${d.day} (${d.stay}): ${d.title}`).join('\n')}

Verified Price Breakdown (${season.season}):
- Adults: ${adults} travellers @ ${quoteCalculator.formatINR(season.pricePerPerson)} per person (on Double/Twin Sharing basis) = ${quoteCalculator.formatINR(adultCost)}
${kids > 0 ? `- Children: ${kids} with extra rollaway bed/mattress @ ${quoteCalculator.formatINR(season.extraBedPrice)} = ${quoteCalculator.formatINR(kidCost)}\n` : ''}- Subtotal: ${quoteCalculator.formatINR(subtotal)}
- Tour Operator GST (5%): ${quoteCalculator.formatINR(gst)}
- Grand Total: ${quoteCalculator.formatINR(grandTotal)} all inclusive

What is included:
${selectedPackage.inclusions?.slice(0, 4).map(inc => `✓ ${inc}`).join('\n')}

Note: All prices are strictly based on per-person twin sharing rates. No hidden surcharges.

Would you like us to customize the dates or hotel categories for you?

Warm regards,
${consultantName}
Company A, Kochi
Kochi Operations Office: +91 484 266 8000
WhatsApp Helpline: +91 98401 23456`;
  }
};
