export const staffMembers = [
  {
    id: "user-admin",
    name: "Founder-MD",
    email: "md@companya-kochi.com",
    role: "Admin",
    title: "Managing Director & Operations Head",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "user-editor",
    name: "Arun K.",
    email: "arun.editor@companya-kochi.com",
    role: "Editor",
    title: "Content & Web Editor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "user-consultant-1",
    name: "Rahul M.",
    email: "rahul.tours@companya-kochi.com",
    role: "Consultant",
    title: "Senior Kerala Tour Specialist",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "user-consultant-2",
    name: "Priya S.",
    email: "priya.honeymoon@companya-kochi.com",
    role: "Consultant",
    title: "Honeymoon & Luxury Retreats Specialist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
  }
];

export const initialActivityLog = [
  {
    id: "log-1",
    timestamp: "2026-11-02T10:12:00Z",
    user: "System AI",
    role: "Automation",
    action: "Enquiry Ingestion & Parsing",
    details: "New WhatsApp enquiry from Vikram Nair (ENQ-2026-101) parsed. Extracted 2 adults + 1 kid, Dec, Houseboat. Matched PKG-KL-07 (98% match).",
    type: "ai"
  },
  {
    id: "log-2",
    timestamp: "2026-11-02T09:45:00Z",
    user: "Arun K.",
    role: "Editor",
    action: "Package Price Revision",
    details: "Updated PKG-KL-07 Peak Season pricing from ₹31,000 to ₹32,500/person twin sharing. Version 3 created.",
    type: "package"
  },
  {
    id: "log-3",
    timestamp: "2026-11-02T09:10:00Z",
    user: "Priya S.",
    role: "Consultant",
    action: "Consultant Assignment",
    details: "Assigned ENQ-2026-102 (Honeymoon Luxury Villa) to Priya S. Checked resort availability.",
    type: "enquiry"
  },
  {
    id: "log-4",
    timestamp: "2026-11-01T17:30:00Z",
    user: "Founder-MD",
    role: "Admin",
    action: "Quote Approval & Dispatch",
    details: "Dispatched Quote QT-2026-094 to Mr. Henderson (London) for 8-day Spice Route. Value: ₹2,45,000.",
    type: "quote"
  },
  {
    id: "log-5",
    timestamp: "2026-10-31T15:20:00Z",
    user: "Arun K.",
    role: "Editor",
    action: "Blog Post Published",
    details: "Published 'The Insider Guide to Alleppey Houseboats' with 2 linked packages.",
    type: "blog"
  }
];
