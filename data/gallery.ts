export type GalleryCategory = "All" | "VR" | "Racing" | "Arcade" | "Events";

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: Exclude<GalleryCategory, "All">;
  /** Masonry footprint. */
  shape: "tall" | "wide" | "square";
};

export const galleryCategories: GalleryCategory[] = [
  "All",
  "VR",
  "Racing",
  "Arcade",
  "Events",
];

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1636070759654-5c93bbca2862",
    alt: "Neon-lit arcade cabinets receding down a dark aisle",
    caption: "The arcade floor after dark",
    category: "Arcade",
    shape: "tall",
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1699862464645-d9de40a30d13",
    alt: "A driver in a hooded top concentrating at a racing simulator",
    caption: "Qualifying, F1 Night",
    category: "Racing",
    shape: "wide",
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1530825894095-9c184b068fcb",
    alt: "A player reaching out while wearing a virtual reality headset",
    caption: "First run in the VR arena",
    category: "VR",
    shape: "square",
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1558008258-7ff8888b42b0",
    alt: "Rows of players at monitors during a LAN tournament",
    caption: "Monthly open, main floor",
    category: "Events",
    shape: "wide",
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1759171053096-e7dbe7c36eb6",
    alt: "Retro arcade machines glowing in a darkened room",
    caption: "Cabinets from four decades",
    category: "Arcade",
    shape: "square",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1771920800290-53f22e5ac3f8",
    alt: "Gloved hands gripping a competition racing wheel",
    caption: "Direct-drive, full lock",
    category: "Racing",
    shape: "tall",
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1525540810550-5032f5d191b1",
    alt: "A player in a VR headset beside a workstation",
    caption: "Calibration before the session",
    category: "VR",
    shape: "wide",
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1585676264910-f3b939b562d0",
    alt: "Friends playing a shared arcade cabinet",
    caption: "Two-player, one cabinet",
    category: "Arcade",
    shape: "square",
  },
  {
    id: "g9",
    src: "https://images.unsplash.com/photo-1560419284-6c2d2b5e0483",
    alt: "A room full of gamers at stations lit by screen glow",
    caption: "Saturday, 9:40 PM",
    category: "Events",
    shape: "tall",
  },
  {
    id: "g10",
    src: "https://images.unsplash.com/photo-1602940819863-2905852243ad",
    alt: "A driver in a blue jacket at the wheel mid-session",
    caption: "Endurance hour",
    category: "Racing",
    shape: "square",
  },
  {
    id: "g11",
    src: "https://images.unsplash.com/photo-1633521184087-cba52bd78fd1",
    alt: "A player wearing a modern VR headset against a dark backdrop",
    caption: "Headsets, ready room",
    category: "VR",
    shape: "wide",
  },
  {
    id: "g12",
    src: "https://images.unsplash.com/photo-1548003693-b55d51032288",
    alt: "Two players side by side in front of bright monitors",
    caption: "Duos ladder night",
    category: "Events",
    shape: "square",
  },
];
