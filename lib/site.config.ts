/**
 * BOAVIE — single source of truth for brand + business information.
 *
 * Everything a client would want changed lives here. No component hardcodes
 * a business detail; they all read from this object.
 */

export const siteConfig = {
  brand: {
    name: "Boavie",
    nameLines: ["Boa", "vie"] as const,
    shortName: "BVE",
    tagline: "Where Reality Meets Play.",
    description:
      "Chennai's next-generation gaming and entertainment arena. Free-roam VR, professional sim racing, arcade, esports and escape rooms under one roof.",
    established: "2021",
    legalName: "Boavie Entertainment LLP",
  },

  contact: {
    phoneDisplay: "+91 81108 23730",
    phoneHref: "tel:+81108 23730",
    whatsappDisplay: "+91 81108 23730",
    whatsappHref: "https://wa.me/81108 23730",
    email: "boaive.tech@gmail.com",
    emailHref: "mailto:boaive.tech@gmail.com",
  },

  location: {
    venueName: "Boavie",
    line1: "123 Example Road, Thousand Lights",
    line2: "Chennai, Tamil Nadu 600006",
    city: "Chennai",
    region: "Tamil Nadu",
    country: "India",
    /** Key-free OpenStreetMap embed — no API key, swap the bbox for a real venue. */
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=80.24%2C13.04%2C80.27%2C13.07&layer=mapnik&marker=13.0569%2C80.2555",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=13.0569,80.2555",
    notes: [
      { label: "Parking", detail: "Free on-site parking for 40 vehicles" },
      { label: "Public transport", detail: "Bus stop 200 m — routes 21G, 47D, M7" },
      { label: "Metro", detail: "Thousand Lights Metro — 6 minute walk" },
    ],
  },

  hours: {
    summary: "10:00 AM – 11:00 PM",
    weekly: [
      { days: "Monday – Thursday", time: "10:00 AM – 11:00 PM" },
      { days: "Friday – Saturday", time: "10:00 AM – 1:00 AM" },
      { days: "Sunday", time: "9:00 AM – 11:00 PM" },
    ],
    openLabel: "Open Today",
    /** 24h window used for the "open now" indicator. */
    openFrom: 10,
    openTo: 23,
  },

  social: [
    { label: "Instagram", handle: "@boavie", href: "https://instagram.com" },
    { label: "YouTube", handle: "boavie", href: "https://youtube.com" },
    { label: "Facebook", handle: "boavie", href: "https://facebook.com" },
  ],

  nav: [
    { label: "Home", href: "#top" },
    { label: "Experiences", href: "#experiences" },
    { label: "Pricing", href: "#pricing" },
    { label: "Events", href: "#events" },
    { label: "Gallery", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "Location", href: "#location" },
  ],

  hero: {
    eyebrow: "Chennai · Gaming & Entertainment Arena",
    headlineLines: ["Play", "Without", "Limits."] as const,
    body: "Experience next-generation gaming, immersive simulations and unforgettable entertainment.",
    primaryCta: { label: "Explore Experiences", href: "#experiences" },
    secondaryCta: { label: "Book Your Slot", href: "#book" },
    meta: [
      { label: "Location", value: "Chennai" },
      { label: "Status", value: "Open Today" },
      { label: "Hours", value: "10:00 AM – 11:00 PM" },
    ],
    image: {
      src: "https://images.unsplash.com/photo-1633545495735-25df17fb9f31",
      alt: "The Boavie esports floor at night, rows of gaming stations lit in violet and blue",
    },
  },

  /** Rotating line under the hero. */
  infoStrip: [
    "50+ Games On Floor",
    "Free-Roam VR Arena",
    "Direct-Drive Sim Racing",
    "Walk-Ins Welcome",
    "Birthday & Corporate Packages",
    "Open 365 Days",
    "Free Parking",
    "Cafe On Site",
  ],

  about: {
    eyebrow: "About the arena",
    title: "Built for people who take play seriously.",
    body: [
      "Boavie opened in 2021 with one rule: no compromises on the hardware. Every rig, headset and cabinet on our floor is the same equipment competitive players train on — because a great night out should feel like the real thing.",
      "Twelve thousand square feet across five zones, a full-service cafe, and a crew that actually plays. Come for an hour, stay for the tournament.",
    ],
    facts: [
      { label: "Floor area", value: "12,000 sq ft" },
      { label: "Zones", value: "5" },
      { label: "Opened", value: "2021" },
      { label: "Staff on floor", value: "18" },
    ],
  },

  cta: {
    title: "Let's Play.",
    body: "Have a question, planning an event, or looking for a private experience? Our team replies within the hour during opening times.",
  },

  booking: {
    /** Demo-only. Everything is stored in the browser. */
    storageKey: "nexusplay.booking.v1",
    idPrefix: "NP",
    currency: "₹",
  },

  meta: {
    url: "https://boavie.com",
    ogImage: "https://images.unsplash.com/photo-1633545495735-25df17fb9f31?w=1200&q=70",
  },
} as const;

export type SiteConfig = typeof siteConfig;
