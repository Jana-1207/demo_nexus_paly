export type Plan = {
  id: string;
  name: string;
  price: number;
  unit: string;
  summary: string;
  benefits: string[];
  featured?: boolean;
  cta: string;
};

export const plans: Plan[] = [
  {
    id: "single",
    name: "Single Play",
    price: 399,
    unit: "per person",
    summary: "15-minute experience",
    benefits: [
      "Any one experience",
      "Equipment & safety briefing",
      "Digital score card",
      "Valid all week",
    ],
    cta: "Book Single Play",
  },
  {
    id: "pass",
    name: "Experience Pass",
    price: 999,
    unit: "per person",
    summary: "3 experiences",
    benefits: [
      "Choose any three zones",
      "Skip-the-queue entry",
      "Arcade credits worth ₹150",
      "Cafe discount 10%",
    ],
    featured: true,
    cta: "Book Experience Pass",
  },
  {
    id: "group",
    name: "Group Pass",
    price: 2499,
    unit: "up to 6 players",
    summary: "Up to 6 players",
    benefits: [
      "Two experiences per player",
      "Reserved group area",
      "Team leaderboard setup",
      "Photos from the floor",
    ],
    cta: "Book Group Pass",
  },
  {
    id: "vip",
    name: "VIP Pass",
    price: 4999,
    unit: "per person",
    summary: "3 hours unlimited access",
    benefits: [
      "Unlimited access, all zones",
      "Priority rig reservation",
      "Host for your session",
      "Food & beverage credit ₹500",
    ],
    cta: "Book VIP Pass",
  },
];

export const pricingNote =
  "All prices include taxes. Walk-ins are welcome, but weekend evenings run near capacity — booking ahead is the safer bet.";
