export type Review = {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  source: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    quote:
      "The racing simulator was insane. It genuinely felt like being inside a race car — I walked out with sore forearms and a new hobby.",
    name: "Arun K.",
    role: "Visited for F1 Night",
    rating: 5,
    source: "Google",
  },
  {
    id: "r2",
    quote:
      "Booked the VR arena for my brother's birthday. Eight of us running around the same map, shouting at each other for an hour. Nobody touched their phone once.",
    name: "Divya R.",
    role: "Birthday party, 12 guests",
    rating: 5,
    source: "Google",
  },
  {
    id: "r3",
    quote:
      "We do our quarterly team offsite here now. It's the only activity where the interns and the directors end up on a level playing field.",
    name: "Sriram V.",
    role: "Corporate offsite organiser",
    rating: 5,
    source: "Google",
  },
  {
    id: "r4",
    quote:
      "Proper hardware, no queues on a weekday, and the staff actually know the games. That last part is rarer than it should be.",
    name: "Meera S.",
    role: "Weekly regular",
    rating: 5,
    source: "Instagram",
  },
  {
    id: "r5",
    quote:
      "The escape room beat us with four minutes left and I've been thinking about it since. Already booked the second room.",
    name: "Hari P.",
    role: "Escape room, The Signal",
    rating: 4,
    source: "Google",
  },
];

export const reviewSummary = {
  rating: "4.8",
  count: "1,240+",
  label: "Average rating across Google and Instagram",
};
