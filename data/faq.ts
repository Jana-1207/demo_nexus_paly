export type FaqItem = { id: string; question: string; answer: string };

export const faqItems: FaqItem[] = [
  {
    id: "q1",
    question: "Do I need to book in advance?",
    answer:
      "Walk-ins are welcome and we hold a share of every hour for them. That said, Friday through Sunday after 6 PM regularly runs at capacity, so booking a slot is the difference between playing and waiting.",
  },
  {
    id: "q2",
    question: "Is there an age limit?",
    answer:
      "The arcade and esports floors are open to all ages. VR requires players to be 9 or older, sim racing 12 or older on the motion rigs, and under-13s need an accompanying adult in the building.",
  },
  {
    id: "q3",
    question: "Can I cancel my booking?",
    answer:
      "Yes — cancel or reschedule free of charge up to 4 hours before your slot from the confirmation link. Inside 4 hours we can move you to another slot the same week, subject to availability.",
  },
  {
    id: "q4",
    question: "Do you host birthday parties?",
    answer:
      "Every weekend. The Party Package covers 10 players for 2 hours with a private area, gaming access and food. Larger groups are quoted individually — tell us the headcount and we'll build it.",
  },
  {
    id: "q5",
    question: "Do you host corporate events?",
    answer:
      "Regularly. Team offsites, client evenings, product launches and full-venue buyouts. We handle tournament brackets, custom branding on the screens and invoicing with GST.",
  },
  {
    id: "q6",
    question: "How many players can participate?",
    answer:
      "Up to 8 in a single VR session, 6 across the racing rigs, 24 on the esports floor and 7 in an escape room. For a full buyout we comfortably run 120 guests at once.",
  },
  {
    id: "q7",
    question: "Do you provide parking?",
    answer:
      "Free on-site parking for 40 vehicles, plus two-wheeler parking at the rear entrance. Thousand Lights Metro is a six minute walk if you would rather not drive.",
  },
];
