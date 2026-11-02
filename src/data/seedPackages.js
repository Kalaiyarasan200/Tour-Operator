export const initialPackages = [
  {
    id: "PKG-KL-07",
    slug: "munnar-thekkady-alleppey-houseboat",
    title: "Munnar, Thekkady and Alleppey Houseboat",
    subtitle: "Misty tea hills, wildlife sanctuary cruise, and a luxury overnight Kettuvallam backwater voyage",
    destination: "Kerala",
    days: 6,
    nights: 5,
    style: "Family & Leisure",
    featured: true,
    coverImage: "/images/hero-munnar.jpg",
    gallery: [
      "/images/hero-munnar.jpg",
      "/images/alleppey-houseboat.jpg",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80"
    ],
    status: "Published",
    publishedAt: "2026-09-15T09:00:00Z",
    hotelCategory: "4 Star Premium",
    hotels: [
      { city: "Munnar", name: "Fragrant Nature Resort / Amber Dale", rating: "4 Star", nights: 2 },
      { city: "Thekkady", name: "Cardamom County / Poetree Sarovar", rating: "4 Star", nights: 1 },
      { city: "Alleppey", name: "Private Air-Conditioned Deluxe Houseboat", rating: "Deluxe Kettuvallam", nights: 1 },
      { city: "Marari / Cochin", name: "Marari Green Villas / Brunton Boatyard", rating: "4 Star Heritage", nights: 1 }
    ],
    seasonalPricing: [
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
        twinSharingNotes: "Rates per adult on double/twin sharing basis. Special Ayurveda rejuvenating discount included. 5% GST extra."
      },
      {
        id: "sp-3",
        season: "Summer (Apr - May)",
        months: "April to May",
        pricePerPerson: 28400,
        extraBedPrice: 11000,
        childNoBedPrice: 5800,
        hotelRating: "4 Star",
        twinSharingNotes: "Rates per adult on double/twin sharing basis. 5% GST extra."
      }
    ],
    basePriceDisplay: 24900,
    peakPriceDisplay: 32500,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cochin & Ascend to Munnar Tea Country",
        description: "Warm traditional greeting at Cochin International Airport (COK) or Ernakulam Junction. Begin scenic drive through the Western Ghats with stops at Valara and Cheeyappara cascading waterfalls. Check into your mist-draped tea estate resort.",
        stay: "Munnar (4 Star Resort)",
        meals: "Dinner included"
      },
      {
        day: 2,
        title: "Eravikulam National Park, Nilgiri Tahr & Tea Museum",
        description: "Early morning drive to Rajamalai in Eravikulam National Park to witness the endangered Nilgiri Tahr. Afternoon tour of the KDHP Tea Museum and fresh tea tasting session, followed by a walk through Mattupetty Dam and Echo Point.",
        stay: "Munnar (4 Star Resort)",
        meals: "Breakfast & Dinner included"
      },
      {
        day: 3,
        title: "Spice Plantations & Periyar Lake Boating in Thekkady",
        description: "Scenic 3.5-hour journey through cardamom and pepper plantations. Guided spice walk with botanist explaining organic cinnamon, clove, and nutmeg cultivation. Sunset safari boat ride on Lake Periyar with elephant spotting.",
        stay: "Thekkady (4 Star Forest Lodge)",
        meals: "Breakfast included"
      },
      {
        day: 4,
        title: "Board Luxury Houseboat in Alleppey Backwaters",
        description: "Descend to Alleppey jetty by midday. Step aboard your private traditional thatch-roofed Kettuvallam houseboat. Cruise tranquil palm-fringed canals, witnessing village duck farming and coir making. Authentic Kerala Karimeen lunch and night anchor in tranquil lake.",
        stay: "Alleppey (Private Deluxe Houseboat)",
        meals: "Lunch, Sunset Tea, Dinner & Kerala Breakfast onboard"
      },
      {
        day: 5,
        title: "Marari Fishing Village & Sunset on the Arabian Sea",
        description: "Disembark after morning cruise and breakfast. Drive 40 minutes to peaceful Marari Beach. Stroll along golden sands, relax under coconut groves, or book an optional Ayurvedic herbal massage.",
        stay: "Marari / Cochin Heritage Hotel",
        meals: "Breakfast included"
      },
      {
        day: 6,
        title: "Fort Kochi Heritage Walk & Airport Departure",
        description: "Explore Fort Kochi: iconic Chinese Fishing Nets, St. Francis Church, Santa Cruz Basilica, and Jewish Synagogue in Mattancherry with antique spice shops. Drop-off at Cochin International Airport with sweet Kerala memories.",
        stay: "Departure",
        meals: "Breakfast included"
      }
    ],
    inclusions: [
      "5 nights accommodation in verified 4-star hotels & private AC houseboat",
      "Dedicated chauffeur-driven private AC sedan / Innova throughout the tour",
      "Daily gourmet buffet breakfast at all hotels",
      "All meals onboard the private houseboat (Traditional Kerala cuisine)",
      "Guided organic spice plantation tour with tasting",
      "Periyar Wildlife Sanctuary boat cruise passes",
      "All interstate permits, toll charges, parking fees, and driver allowances",
      "24/7 dedicated local tour concierge support from our Kochi headquarters"
    ],
    exclusions: [
      "Airfare / Train tickets to and from Cochin",
      "5% Government GST (itemized transparently on final quote)",
      "Personal expenses, laundry, telephone calls, camera fees at monuments",
      "Optional Ayurvedic spa therapies and Kathakali cultural show tickets"
    ],
    routeStops: ["Cochin", "Munnar", "Thekkady", "Alleppey", "Marari", "Cochin"],
    version: 3,
    versionHistory: [
      {
        version: 3,
        timestamp: "2026-10-18T14:30:00Z",
        author: "Arun K. (Content Editor)",
        summary: "Updated 2026/2027 Peak season rate to ₹32,500; refined Day 4 Houseboat gourmet meal inclusions.",
        dataSnapshot: {
          peakPrice: 32500,
          monsoonPrice: 24900,
          days: 6
        }
      },
      {
        version: 2,
        timestamp: "2026-06-10T11:15:00Z",
        author: "Rahul M. (Consultant)",
        summary: "Added Marari Beach overnight stay on Day 5 based on family guest feedback.",
        dataSnapshot: {
          peakPrice: 31000,
          monsoonPrice: 23500,
          days: 6
        }
      },
      {
        version: 1,
        timestamp: "2026-02-01T10:00:00Z",
        author: "Founder-MD",
        summary: "Initial package creation and publication.",
        dataSnapshot: {
          peakPrice: 29500,
          monsoonPrice: 22000,
          days: 5
        }
      }
    ]
  },
  {
    id: "PKG-SI-12",
    slug: "madurai-rameswaram-kanyakumari",
    title: "Madurai, Rameswaram and Kanyakumari",
    subtitle: "Sacred Dravidian architecture, Pamban sea bridge, and the spiritual confluence of three oceans",
    destination: "Tamil Nadu & South India",
    days: 5,
    nights: 4,
    style: "Heritage & Pilgrimage",
    featured: true,
    coverImage: "/images/madurai-temple.jpg",
    gallery: [
      "/images/madurai-temple.jpg",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"
    ],
    status: "Draft",
    publishedAt: null,
    hotelCategory: "3 Star Standard",
    hotels: [
      { city: "Madurai", name: "Heritage Madurai / Hotel Supreme", rating: "3 Star", nights: 2 },
      { city: "Rameswaram", name: "Hotel Daiwik / Jiwan Residency", rating: "3 Star", nights: 1 },
      { city: "Kanyakumari", name: "Sparsa Resort / Hotel Seaview", rating: "3 Star", nights: 1 }
    ],
    seasonalPricing: [
      {
        id: "sp-10",
        season: "All Year Regular",
        months: "January to December",
        pricePerPerson: 18750,
        extraBedPrice: 7500,
        childNoBedPrice: 3800,
        hotelRating: "3 Star",
        twinSharingNotes: "Rates per adult on twin sharing basis. Includes AC vehicle and temple transfers. 5% GST extra."
      },
      {
        id: "sp-11",
        season: "Festive Season (Nov - Jan)",
        months: "November to January",
        pricePerPerson: 21500,
        extraBedPrice: 8500,
        childNoBedPrice: 4200,
        hotelRating: "3 Star",
        twinSharingNotes: "Rates per adult on twin sharing basis during Karthigai Deepam and Margazhi festival rush. 5% GST extra."
      }
    ],
    basePriceDisplay: 18750,
    peakPriceDisplay: 21500,
    itinerary: [
      {
        day: 1,
        title: "Madurai Arrival & Evening Meenakshi Amman Temple Pooja",
        description: "Arrive at Madurai airport/station. Check in to hotel. Evening visit to the magnificent Meenakshi Sundareswarar Temple to attend the sacred night closing ceremony with silver palanquin procession.",
        stay: "Madurai (3 Star Hotel)",
        meals: "Dinner included"
      },
      {
        day: 2,
        title: "Thirumalai Nayak Palace & Cross Pamban Bridge to Rameswaram",
        description: "Explore Indo-Saracenic Thirumalai Nayakkar Mahal. Scenic 3-hour drive across the historic Pamban Sea Bridge connecting mainland to Rameswaram island. Evening holy dip at Agni Theertham.",
        stay: "Rameswaram (3 Star Hotel)",
        meals: "Breakfast included"
      },
      {
        day: 3,
        title: "Ramanathaswamy Temple Corridors, Dhanushkodi Ghost Town",
        description: "Early darshan at Ramanathaswamy Temple through the longest corridor of 1,212 granite pillars. Jeep excursion to Dhanushkodi ruins and the Indo-Sri Lanka maritime border sand spit. Afternoon drive to Kanyakumari.",
        stay: "Kanyakumari (3 Star Seaview Hotel)",
        meals: "Breakfast included"
      },
      {
        day: 4,
        title: "Vivekananda Rock Memorial, Thiruvalluvar Statue & Sunset",
        description: "Ferry ride to Vivekananda Rock Memorial and 133-ft stone Thiruvalluvar Statue at the confluence of Bay of Bengal, Indian Ocean, and Arabian Sea. Sunset viewing at Gandhi Memorial beach.",
        stay: "Kanyakumari (3 Star Seaview Hotel)",
        meals: "Breakfast included"
      },
      {
        day: 5,
        title: "Padmanabhapuram Wooden Palace & Trivandrum Departure",
        description: "Morning visit to Padmanabhapuram Palace, the 400-year-old architectural marvel of Travancore kings in rosewood and teak. Transfer to Trivandrum (TRV) airport for departure.",
        stay: "Departure",
        meals: "Breakfast included"
      }
    ],
    inclusions: [
      "4 nights accommodation in clean, curated 3-star hotels",
      "Dedicated AC private car with professional driver",
      "Daily breakfast at all hotels",
      "Pamban Bridge crossing tolls and local permits",
      "Dhanushkodi 4x4 permitted vehicle transfer",
      "Ferry tickets to Vivekananda Rock Memorial"
    ],
    exclusions: [
      "Special temple VIP darshan tickets",
      "5% GST",
      "Lunches and dinners not specified"
    ],
    routeStops: ["Madurai", "Rameswaram", "Dhanushkodi", "Kanyakumari", "Trivandrum"],
    version: 1,
    versionHistory: [
      {
        version: 1,
        timestamp: "2026-10-25T16:00:00Z",
        author: "Arun K. (Content Editor)",
        summary: "Created draft package based on popular South India pilgrimage requests.",
        dataSnapshot: {
          peakPrice: 21500,
          monsoonPrice: 18750,
          days: 5
        }
      }
    ]
  },
  {
    id: "PKG-KL-15",
    slug: "kumarakom-marari-honeymoon-retreat",
    title: "Kumarakom & Marari Backwater-Beach Romance",
    subtitle: "Secluded plunge pool villas, candlelit lake cruises, and rejuvenating couples Ayurveda",
    destination: "Kerala",
    days: 5,
    nights: 4,
    style: "Honeymoon & Luxury",
    featured: true,
    coverImage: "/images/alleppey-houseboat.jpg",
    gallery: [
      "/images/alleppey-houseboat.jpg",
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
    ],
    status: "Published",
    publishedAt: "2026-09-01T10:00:00Z",
    hotelCategory: "5 Star Luxury",
    hotels: [
      { city: "Kumarakom", name: "Kumarakom Lake Resort / Coconut Lagoon", rating: "5 Star Luxury", nights: 2 },
      { city: "Marari", name: "Marari Beach Resort (CGH Earth)", rating: "5 Star Eco-Luxury", nights: 2 }
    ],
    seasonalPricing: [
      {
        id: "sp-20",
        season: "Peak Romance (Oct - Mar)",
        months: "October to March",
        pricePerPerson: 44500,
        extraBedPrice: 18000,
        childNoBedPrice: 9000,
        hotelRating: "5 Star Luxury",
        twinSharingNotes: "Rates per adult on twin sharing basis. Includes daily candlelit private dinner & honeymoon cake. 5% GST extra."
      },
      {
        id: "sp-21",
        season: "Monsoon Serenade (Jun - Sep)",
        months: "June to September",
        pricePerPerson: 34900,
        extraBedPrice: 14000,
        childNoBedPrice: 7000,
        hotelRating: "5 Star Luxury",
        twinSharingNotes: "Special monsoon package including complimentary 60-minute Ayurvedic Abhyanga session for the couple. 5% GST extra."
      }
    ],
    basePriceDisplay: 34900,
    peakPriceDisplay: 44500,
    itinerary: [
      {
        day: 1,
        title: "Cochin to Kumarakom Lake Sanctuary",
        description: "Arrive at Cochin. Chauffeur driven transfer in Mercedes-Benz or Crysta to Kumarakom. Welcome with fresh tender coconut and floral garland. Check in to your heritage pool villa overlooking Vembanad Lake.",
        stay: "Kumarakom Lake Resort",
        meals: "Candlelight Dinner with live Flute player"
      },
      {
        day: 2,
        title: "Private Shikara Lake Cruise & Ayurvedic Massage",
        description: "Sunrise bird watching cruise into Kumarakom Bird Sanctuary in a private silent wooden shikara boat. Afternoon authentic couples Abhyanga rejuvenation at the Ayurmana spa.",
        stay: "Kumarakom Lake Resort",
        meals: "Breakfast & Gourmet Seafood Dinner"
      },
      {
        day: 3,
        title: "Transfer to Secluded Thatched Beach Villa at Marari",
        description: "Short 45-minute drive past coir weaving villages to Marari. Check into your eco-luxury thatched cottage nestled among 30 acres of organic coconut groves and butterfly gardens.",
        stay: "Marari Beach Resort",
        meals: "Breakfast included"
      },
      {
        day: 4,
        title: "Barefoot Beach Walks, Coconut Groves & Sunset",
        description: "Spend an unhurried day swimming in the infinity pool, cycling along the fishermen's coastal lanes, and savoring fresh coastal catch prepared with Malabar spices under starlit skies.",
        stay: "Marari Beach Resort",
        meals: "Breakfast & Private Beachside Dinner"
      },
      {
        day: 5,
        title: "Spice Souvenirs & Cochin Airport Departure",
        description: "Leisurely breakfast. Private transfer to Cochin International Airport with custom curated gift hampers of organic Munnar tea and Wayanad spices.",
        stay: "Departure",
        meals: "Breakfast included"
      }
    ],
    inclusions: [
      "4 nights stay in award-winning 5-star luxury heritage resorts",
      "Private luxury AC SUV transfers with dedicated senior chauffeur",
      "Complimentary honeymoon floral bed decoration and artisanal cake",
      "One candlelit beachfront 4-course dinner for the couple",
      "One 60-minute Ayurvedic couple rejuvenation session",
      "Private sunrise Shikara boat cruise in Vembanad Lake"
    ],
    exclusions: [
      "Flight tickets",
      "5% GST",
      "Alcoholic beverages and personal extras"
    ],
    routeStops: ["Cochin", "Kumarakom", "Marari", "Cochin"],
    version: 2,
    versionHistory: [
      {
        version: 2,
        timestamp: "2026-08-20T12:00:00Z",
        author: "Priya S. (Honeymoon Specialist)",
        summary: "Added complimentary couples spa session to the Monsoon pricing tier.",
        dataSnapshot: {
          peakPrice: 44500,
          monsoonPrice: 34900,
          days: 5
        }
      }
    ]
  },
  {
    id: "PKG-KL-03",
    slug: "wayanad-rainforest-wildlife",
    title: "Wayanad Rainforest, Bamboo Groves & Wildlife",
    subtitle: "Treehouse stays, Edakkal neolithic caves, Chembra heart-shaped lake, and wild elephant safaris",
    destination: "Kerala",
    days: 4,
    nights: 3,
    style: "Nature & Adventure",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "/images/hero-munnar.jpg"
    ],
    status: "Published",
    publishedAt: "2026-08-10T10:00:00Z",
    hotelCategory: "4 Star Eco-Lodge",
    hotels: [
      { city: "Vythiri / Lakkidi", name: "Vythiri Resort / Windflower Spa", rating: "4 Star", nights: 2 },
      { city: "Sulthan Bathery", name: "Pepper Trail Plantation Bungalow", rating: "4 Star Heritage", nights: 1 }
    ],
    seasonalPricing: [
      {
        id: "sp-30",
        season: "Oct - May (High Season)",
        months: "October to May",
        pricePerPerson: 16500,
        extraBedPrice: 6500,
        childNoBedPrice: 3200,
        hotelRating: "4 Star",
        twinSharingNotes: "Rates per adult on twin sharing basis. Includes forest entry permits. 5% GST extra."
      },
      {
        id: "sp-31",
        season: "Jun - Sep (Rainforest Monsoon)",
        months: "June to September",
        pricePerPerson: 13900,
        extraBedPrice: 5200,
        childNoBedPrice: 2800,
        hotelRating: "4 Star",
        twinSharingNotes: "Witness lush misty waterfalls and rainforest canopy. 5% GST extra."
      }
    ],
    basePriceDisplay: 13900,
    peakPriceDisplay: 16500,
    itinerary: [
      {
        day: 1,
        title: "Calicut to Lakkidi Rainforest Gateway",
        description: "Pickup from Calicut (CCJ) airport or railway station. Ascend the famous 9 hairpin bends of Thamarassery Churam. Check in to treehouse or eco-villa surrounded by dense coffee and cardamom groves.",
        stay: "Vythiri Resort",
        meals: "Dinner included"
      },
      {
        day: 2,
        title: "Edakkal Caves & Banasura Sagar Earthen Dam",
        description: "Hike up Ambukuthi Mala to inspect the 6,000 BCE Neolithic stone age petroglyphs at Edakkal Caves. Afternoon boating at Banasura Sagar, India's largest earthen dam.",
        stay: "Vythiri Resort",
        meals: "Breakfast & Dinner"
      },
      {
        day: 3,
        title: "Muthanga Wildlife Sanctuary Safari & Bamboo Rafting",
        description: "Early morning jeep safari into Muthanga Sanctuary tracking spotted deer, bison, and wild elephants. Bamboo rafting along Kabini river tributaries.",
        stay: "Pepper Trail Bungalow",
        meals: "Breakfast & Traditional Malabar Dinner"
      },
      {
        day: 4,
        title: "Pookode Natural Freshwater Lake & Calicut Drop",
        description: "Morning pedal boat ride on evergreen forest-fringed Pookode lake. Transfer to Calicut airport with stop for famous Malabar banana chips and halwa.",
        stay: "Departure",
        meals: "Breakfast included"
      }
    ],
    inclusions: [
      "3 nights accommodation in award-winning rainforest eco-resort",
      "Private AC vehicle from Calicut and back",
      "Daily breakfast and 2 curated dinners",
      "Muthanga Wildlife Sanctuary jeep safari passes",
      "Edakkal Caves entry tickets"
    ],
    exclusions: [
      "Travel to Calicut",
      "5% GST",
      "Camera charges"
    ],
    routeStops: ["Calicut", "Vythiri", "Edakkal", "Muthanga", "Calicut"],
    version: 1,
    versionHistory: [
      {
        version: 1,
        timestamp: "2026-08-10T10:00:00Z",
        author: "Arun K. (Content Editor)",
        summary: "Created Wayanad Rainforest 4-day itinerary.",
        dataSnapshot: {
          peakPrice: 16500,
          monsoonPrice: 13900,
          days: 4
        }
      }
    ]
  }
];
