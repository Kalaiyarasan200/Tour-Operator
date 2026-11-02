export const initialEnquiries = [
  {
    id: "ENQ-2026-101",
    customerName: "Vikram Nair",
    phone: "+91 98401 23456",
    email: "vikram.nair@example.com",
    channel: "WhatsApp",
    channelIcon: "message-circle",
    receivedAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(), // 18 mins ago (SLA remaining ~42m)
    slaTargetMinutes: 60,
    status: "AI Draft Ready", // New, AI Draft Ready, Assigned, Quoted, Booked, Lost
    assignedTo: "Rahul M. (Kerala Specialist)",
    originalMessage: "Hi, 2 adults and 1 kid, Kerala 5-6 nights in December, budget around 1.2 lakh total, houseboat a must",
    dpdpConsentGiven: true,
    whatsappConsentGiven: true,
    sourcePackageId: "PKG-KL-07",
    aiExtracted: {
      travellersAdults: 2,
      travellersChildren: 1,
      travelDates: "December (Peak Season)",
      durationNights: "5-6 nights",
      destination: "Kerala (Munnar, Thekkady, Alleppey)",
      totalBudget: 120000,
      mustHaves: ["Houseboat a must", "Family friendly", "Western Ghats scenery"],
      confidenceScore: 0.96
    },
    suggestedPackages: [
      {
        packageId: "PKG-KL-07",
        matchReason: "Direct match: 6 days / 5 nights, includes private deluxe houseboat in Alleppey, and fits within the ₹1.2L total budget.",
        matchScore: 98,
        priceSnapshotSeason: "Peak (Oct - Mar)",
        pricePerPerson: 32500,
        extraBedPrice: 12500,
        twinSharingNotes: "Rates per adult on double sharing basis. 5% GST extra."
      },
      {
        packageId: "PKG-KL-15",
        matchReason: "5-star luxury backwater option with private villa, but Peak rate (₹44,500 pp) will slightly exceed the ₹1.2L budget limit.",
        matchScore: 78,
        priceSnapshotSeason: "Peak Romance (Oct - Mar)",
        pricePerPerson: 44500,
        extraBedPrice: 18000,
        twinSharingNotes: "Rates per adult on twin sharing basis. 5% GST extra."
      },
      {
        packageId: "PKG-KL-03",
        matchReason: "Excellent 4-day nature break in Wayanad with treehouse option, but does not feature backwater houseboats.",
        matchScore: 62,
        priceSnapshotSeason: "Oct - May (High Season)",
        pricePerPerson: 16500,
        extraBedPrice: 6500,
        twinSharingNotes: "Rates per adult on twin sharing basis. 5% GST extra."
      }
    ],
    aiDraftReply: `Dear Vikram,

Greetings from Company A, Kochi!

Thank you for reaching out to us. We would be delighted to host you and your family for your 6-day holiday in Kerala this December. 

Based on your wish for an authentic private houseboat experience and family leisure, our most popular itinerary—PKG-KL-07: Munnar, Thekkady and Alleppey Houseboat (6 Days / 5 Nights)—is an ideal match:

• 2 Nights in misty Munnar (4-star resort overlooking tea valleys)
• 1 Night in Thekkady (wildlife sanctuary boating & spice walk)
• 1 Night on your private Deluxe Air-Conditioned Houseboat in Alleppey (all Kerala meals included)
• 1 Night at serene Marari Beach / Fort Kochi heritage

Price Breakdown (Peak Season, December):
- 2 Adults on Double/Twin Sharing: ₹32,500 per person = ₹65,000
- 1 Child (Extra Bed with mattress): ₹12,500
- Base Subtotal: ₹77,500
- 5% Tour Operator GST: ₹3,875
- Grand Total: ₹81,375 net (Well comfortably within your ₹1.2 Lakh budget, leaving ample room for flight travel & personal indulgences!)

Includes private AC vehicle with dedicated chauffeur, daily breakfasts, houseboat meals, and spice plantation tours.

Would you prefer arrival into Cochin Airport in the morning so you can enjoy the waterfall drives on Day 1?

Warm regards,
Rahul M. | Senior Kerala Consultant
Company A, Kochi • +91 484 266 8000`,
    consultantNotes: [
      {
        id: "note-1",
        author: "System AI",
        timestamp: new Date(Date.now() - 17 * 60 * 1000).toISOString(),
        text: "Auto-acknowledgement template sent to WhatsApp +91 98401 23456. Matched PKG-KL-07 with 98% confidence."
      }
    ],
    quotesGenerated: []
  },
  {
    id: "ENQ-2026-102",
    customerName: "Dr. Ananya Sen & Rohit Roy",
    phone: "+91 98200 45678",
    email: "ananya.sen@gmail.com",
    channel: "Web Form",
    channelIcon: "globe",
    receivedAt: new Date(Date.now() - 34 * 60 * 1000).toISOString(), // 34 mins ago
    slaTargetMinutes: 60,
    status: "Assigned",
    assignedTo: "Priya S. (Honeymoon Specialist)",
    originalMessage: "Planning a 5-day honeymoon in late October. We want private plunge pool or luxury backwater villa with ayurvedic couples massage. Budget flexible around 90k.",
    dpdpConsentGiven: true,
    whatsappConsentGiven: true,
    sourcePackageId: "PKG-KL-15",
    aiExtracted: {
      travellersAdults: 2,
      travellersChildren: 0,
      travelDates: "Late October",
      durationNights: "5 days / 4 nights",
      destination: "Kumarakom & Marari",
      totalBudget: 90000,
      mustHaves: ["Plunge pool villa", "Couples massage", "Luxury honeymoon"],
      confidenceScore: 0.98
    },
    suggestedPackages: [
      {
        packageId: "PKG-KL-15",
        matchReason: "Exact honeymoon retreat with luxury pool villa and couples Ayurveda massage.",
        matchScore: 99,
        priceSnapshotSeason: "Peak Romance (Oct - Mar)",
        pricePerPerson: 44500,
        extraBedPrice: 18000,
        twinSharingNotes: "Rates per adult on twin sharing basis. 5% GST extra."
      }
    ],
    aiDraftReply: `Dear Dr. Ananya & Rohit,

Congratulations on your upcoming wedding! Greetings from Company A, Kochi.

Our 5-Day Kumarakom & Marari Backwater-Beach Romance (PKG-KL-15) was designed specifically for couples seeking privacy and understated luxury:

• 2 Nights in Vembanad Lake Heritage Pool Villa at Kumarakom
• 2 Nights in Thatched Eco-Luxury Beach Villa at Marari
• Complimentary couples 60-min Ayurvedic Abhyanga massage
• Candlelit 4-course beachfront dinner with live flute music

Price: ₹44,500 per person on twin sharing basis × 2 = ₹89,000 + 5% GST (₹4,450) = ₹93,450 total.

Shall we lock your dates for late October?

Warmly,
Priya S. | Honeymoon Specialist, Company A`,
    consultantNotes: [
      {
        id: "note-2",
        author: "Priya S.",
        timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
        text: "Checked Kumarakom Lake Resort availability for Oct 24-28. Villas available. Preparing custom quote with flower decor."
      }
    ],
    quotesGenerated: []
  },
  {
    id: "ENQ-2026-103",
    customerName: "Thomas Becker",
    phone: "+49 170 8891234",
    email: "t.becker@berlin-travelers.de",
    channel: "Email",
    channelIcon: "mail",
    receivedAt: new Date(Date.now() - 52 * 60 * 1000).toISOString(), // 52 mins ago (SLA countdown urgent: 8m left!)
    slaTargetMinutes: 60,
    status: "New",
    assignedTo: "Unassigned",
    originalMessage: "Hello, group of 4 adults from Germany visiting South India in January. Interested in Dravidian temple architecture, Pamban bridge, and heritage palaces. Need English speaking driver.",
    dpdpConsentGiven: true,
    whatsappConsentGiven: false,
    sourcePackageId: "PKG-SI-12",
    aiExtracted: {
      travellersAdults: 4,
      travellersChildren: 0,
      travelDates: "January",
      durationNights: "5 days",
      destination: "Madurai, Rameswaram, Kanyakumari",
      totalBudget: 100000,
      mustHaves: ["English driver", "Dravidian temples", "Pamban bridge"],
      confidenceScore: 0.94
    },
    suggestedPackages: [
      {
        packageId: "PKG-SI-12",
        matchReason: "Madurai, Rameswaram and Kanyakumari 5-day circuit covering key heritage points.",
        matchScore: 95,
        priceSnapshotSeason: "Festive Season (Nov - Jan)",
        pricePerPerson: 21500,
        extraBedPrice: 8500,
        twinSharingNotes: "Rates per adult on twin sharing basis. 5% GST extra."
      }
    ],
    aiDraftReply: `Dear Mr. Becker,

Warm greetings from Company A in Kochi, South India.

We are delighted to welcome your German travel party in January. Our curated heritage circuit (PKG-SI-12: Madurai, Rameswaram & Kanyakumari) covers the grand 1,000-pillar halls of Meenakshi Temple, the iconic Pamban Sea Bridge, and the 400-year-old Padmanabhapuram Teak Palace.

Rates for January:
- 4 Adults (2 Double/Twin rooms): ₹21,500 per person on twin sharing basis = ₹86,000
- Private Toyota Innova Crysta with fluent English-speaking senior chauffeur included
- 5% GST: ₹4,300
- Total: ₹90,300

We provide airport meet-and-greet in Madurai and departure transfer at Trivandrum.

Best regards,
Company A Reservations Team`,
    consultantNotes: [],
    quotesGenerated: []
  }
];
