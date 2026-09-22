export type Stat = {
  id: string;
  value: number;
  /** Rendered after the counter, e.g. "+" or "K+". */
  suffix: string;
  /** Decimal places for the counter. */
  decimals?: number;
  label: string;
  note: string;
};

export const stats: Stat[] = [
  {
    id: "games",
    value: 50,
    suffix: "+",
    label: "Games",
    note: "Across five zones, rotated monthly",
  },
  {
    id: "players",
    value: 12,
    suffix: "K+",
    label: "Players",
    note: "Through the doors since 2021",
  },
  {
    id: "rating",
    value: 4.8,
    suffix: "",
    decimals: 1,
    label: "Average Rating",
    note: "From 1,240+ verified reviews",
  },
  {
    id: "days",
    value: 365,
    suffix: "",
    label: "Days Open",
    note: "Including every public holiday",
  },
];
