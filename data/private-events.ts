export type EventCategory = {
  id: string;
  title: string;
  blurb: string;
  detail: string;
};

export const eventCategories: EventCategory[] = [
  {
    id: "birthday",
    title: "Birthday Parties",
    blurb: "Ages 8 to 80, same reaction.",
    detail: "Private zone, host on hand, cake cut on the main screen.",
  },
  {
    id: "corporate",
    title: "Corporate Events",
    blurb: "Offsites that people actually enjoy.",
    detail: "Bracketed tournaments, branded screens, GST invoicing.",
  },
  {
    id: "college",
    title: "College Events",
    blurb: "Fests, farewells and LAN nights.",
    detail: "Group rates from 20 players, student ID pricing.",
  },
  {
    id: "private",
    title: "Private Events",
    blurb: "The whole arena, just yours.",
    detail: "Full venue buyout up to 120 guests, catering included.",
  },
];

export const partyPackage = {
  name: "Party Package",
  price: 5999,
  unit: "for the group",
  includes: [
    "10 players",
    "2 hours",
    "Gaming access across all zones",
    "Private area with seating",
    "Food & beverages",
    "Dedicated host",
  ],
  cta: "Plan Your Event",
  addOns: [
    { label: "Extra player", price: "₹499" },
    { label: "Extra hour", price: "₹1,999" },
    { label: "Cake & decor", price: "₹1,250" },
  ],
};

export const privateEventsMedia = {
  primary: {
    src: "https://images.unsplash.com/photo-1786989906332-775bbf6c918b",
    alt: "A group playing side-by-side arcade racing cabinets in a dim neon room",
  },
  secondary: {
    src: "https://images.unsplash.com/photo-1775887758079-6df6481cd9e7",
    alt: "A rainbow neon sign reading happy birthday on a dark wall",
  },
};
