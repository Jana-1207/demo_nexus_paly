export type GameEvent = {
  id: string;
  title: string;
  discipline: string;
  /** 0 = Sunday … 6 = Saturday. The countdown resolves the next occurrence client-side. */
  weekday: number;
  dayLabel: string;
  timeLabel: string;
  /** 24h start time used for the countdown. */
  startHour: number;
  startMinute: number;
  entry: number;
  capacity: string;
  format: string;
  prize: string;
  image: string;
  alt: string;
};

export const events: GameEvent[] = [
  {
    id: "f1-night",
    title: "F1 Night",
    discipline: "Sim Racing Tournament",
    weekday: 6,
    dayLabel: "Saturday",
    timeLabel: "7:00 PM",
    startHour: 19,
    startMinute: 0,
    entry: 499,
    capacity: "24 drivers",
    format: "Qualifying + 12-lap final",
    prize: "₹10,000 prize pool",
    image: "https://images.unsplash.com/photo-1760553121003-93afc4d88ae0",
    alt: "A driver at a racing simulator with a competition wheel and race display",
  },
  {
    id: "fifa-championship",
    title: "FIFA Championship",
    discipline: "Console Tournament",
    weekday: 0,
    dayLabel: "Sunday",
    timeLabel: "5:00 PM",
    startHour: 17,
    startMinute: 0,
    entry: 299,
    capacity: "32 players",
    format: "Single elimination",
    prize: "₹6,000 + season trophy",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8",
    alt: "Two players holding controllers during a console tournament match",
  },
  {
    id: "vr-night",
    title: "VR Night",
    discipline: "Multiplayer VR",
    weekday: 5,
    dayLabel: "Friday",
    timeLabel: "8:00 PM",
    startHour: 20,
    startMinute: 0,
    entry: 599,
    capacity: "8 per squad",
    format: "Co-op survival ladder",
    prize: "Winning squad plays free",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
    alt: "A player wearing a VR headset lit by coloured stage light",
  },
];
