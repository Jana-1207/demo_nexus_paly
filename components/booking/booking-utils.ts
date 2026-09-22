import { siteConfig } from "@/lib/site.config";

export type BookingDraft = {
  experienceId: string;
  date: string;
  time: string;
  players: number;
  name: string;
  phone: string;
  email: string;
};

export const emptyDraft: BookingDraft = {
  experienceId: "",
  date: "",
  time: "",
  players: 2,
  name: "",
  phone: "",
  email: "",
};

export const STEPS = [
  { id: 1, label: "Experience" },
  { id: 2, label: "Date" },
  { id: 3, label: "Time" },
  { id: 4, label: "Players" },
  { id: 5, label: "Details" },
  { id: 6, label: "Review" },
] as const;

export type DayOption = {
  /** ISO yyyy-mm-dd */
  value: string;
  weekday: string;
  day: string;
  month: string;
  isToday: boolean;
};

const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

/** The next 14 bookable days, starting today. */
export function buildDays(count = 14): DayOption[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return {
      value: toISO(d),
      weekday: d.toLocaleDateString("en-IN", { weekday: "short" }),
      day: String(d.getDate()).padStart(2, "0"),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
      isToday: i === 0,
    };
  });
}

export type SlotOption = { value: string; disabled: boolean };

/** Half-hour slots across opening hours; past slots on today are closed off. */
export function buildSlots(dateISO: string): SlotOption[] {
  const openFrom: number = siteConfig.hours.openFrom;
  const openTo: number = siteConfig.hours.openTo;
  const now = new Date();
  const todayISO = toISO(now);
  const isToday = dateISO === todayISO;

  const slots: SlotOption[] = [];
  for (let h = openFrom; h <= openTo; h++) {
    for (const m of [0, 30]) {
      if (h === openTo && m === 30) continue;
      const label = formatSlot(h, m);
      const past = isToday && (h < now.getHours() || (h === now.getHours() && m <= now.getMinutes()));
      slots.push({ value: label, disabled: past });
    }
  }
  return slots;
}

function formatSlot(hour: number, minute: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:${String(minute).padStart(2, "0")} ${period}`;
}

/** e.g. "24 September 2026" */
export function formatLongDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const PLAYER_RANGE = { min: 1, max: 8 };

export function validateDetails(draft: BookingDraft) {
  const errors: Partial<Record<"name" | "phone" | "email", string>> = {};
  if (draft.name.trim().length < 2) errors.name = "Please enter your name.";
  const digits = draft.phone.replace(/\D/g, "");
  if (digits.length < 10) errors.phone = "Enter a 10-digit mobile number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(draft.email.trim()))
    errors.email = "Enter a valid email address.";
  return errors;
}

export function canAdvance(step: number, draft: BookingDraft): boolean {
  switch (step) {
    case 1:
      return Boolean(draft.experienceId);
    case 2:
      return Boolean(draft.date);
    case 3:
      return Boolean(draft.time);
    case 4:
      return draft.players >= PLAYER_RANGE.min && draft.players <= PLAYER_RANGE.max;
    case 5:
      return Object.keys(validateDetails(draft)).length === 0;
    default:
      return true;
  }
}
