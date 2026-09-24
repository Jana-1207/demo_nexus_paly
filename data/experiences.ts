export type Experience = {
  id: string;
  index: string;
  title: string;
  category: string;
  blurb: string;
  duration: string;
  players: string;
  priceFrom: number;
  image: string;
  alt: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    id: "vr-arena",
    index: "01",
    title: "VR Arena",
    category: "Free-roam virtual reality",
    blurb: "Immersive multiplayer VR experiences.",
    duration: "20 – 40 min",
    players: "1 – 8 players",
    priceFrom: 499,
    image: "https://images.unsplash.com/photo-1640823127518-65e1ad563576",
    alt: "Two players in free-roam VR headsets with backpack computers inside the Boaive Play VR arena",
    highlights: ["Untethered free-roam", "Full body tracking", "12 worlds on rotation"],
  },
  {
    id: "sim-racing",
    index: "02",
    title: "Sim Racing",
    category: "Professional simulation",
    blurb: "Professional-grade racing simulation.",
    duration: "15 – 60 min",
    players: "1 – 6 players",
    priceFrom: 599,
    image: "https://images.unsplash.com/photo-1743649978995-c76212449e15",
    alt: "Numbered racing simulator rigs with triple screens and blue neon lighting",
    highlights: ["Direct-drive wheels", "Motion platforms", "Live leaderboards"],
  },
  {
    id: "arcade",
    index: "03",
    title: "Arcade",
    category: "Classic & modern cabinets",
    blurb: "Classic and modern arcade games.",
    duration: "Play all day",
    players: "1 – 4 per cabinet",
    priceFrom: 299,
    image: "https://images.unsplash.com/photo-1558324190-c940eb141401",
    alt: "A dark arcade aisle lined with neon-lit cabinets in red, green and blue",
    highlights: ["40 cabinets", "No tokens — one tap card", "Ticket redemption store"],
  },
  {
    id: "esports",
    index: "04",
    title: "Esports Arena",
    category: "Competitive gaming",
    blurb: "Competitive gaming and tournaments.",
    duration: "1 – 3 hrs",
    players: "1 – 24 players",
    priceFrom: 349,
    image: "https://images.unsplash.com/photo-1548686304-5c3be888a00b",
    alt: "Two competitive players at gaming PCs wearing headsets on the esports floor",
    highlights: ["240 Hz / RTX floor", "Casting desk", "Weekly ladders"],
  },
  {
    id: "escape-room",
    index: "05",
    title: "Escape Room",
    category: "Live puzzle experience",
    blurb: "Immersive puzzle experiences.",
    duration: "60 min",
    players: "2 – 7 players",
    priceFrom: 649,
    image: "https://images.unsplash.com/photo-1658478084716-d0447ed4f1b3",
    alt: "A dim escape room interior with a single lit doorway at the far end",
    highlights: ["3 original rooms", "Live game master", "Difficulty tiers"],
  },
];

export const featuredExperience = {
  experienceId: "sim-racing",
  eyebrow: "Featured experience",
  kicker: "Sim Racing",
  headlineLines: ["Feel Every", "Turn."],
  body: "Six competition rigs bolted to motion platforms, wrapped in triple 32-inch screens. Direct-drive force feedback puts the road surface in your hands — every kerb, every lock-up, every apex you miss.",
  points: [
    "Professional simulation rigs",
    "Direct-drive steering",
    "Motion simulation",
    "Triple-screen setup",
    "Competitive leaderboards",
  ],
  cta: { label: "Book Sim Racing", experienceId: "sim-racing" },
  image: "https://images.unsplash.com/photo-1771440571270-e27b63085a48",
  alt: "A driver strapped into a motion-platform racing rig facing a wide race display",
  insetImage: "https://images.unsplash.com/photo-1771920800290-53f22e5ac3f8",
  insetAlt: "Gloved hands gripping a competition-spec racing wheel",
  stat: { value: "1,240", label: "Lap records set this year" },
};
