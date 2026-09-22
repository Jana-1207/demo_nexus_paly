/** Tiny class joiner — no dependency needed for what we do here. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Builds a sized Unsplash source URL. Keeping the upstream request modest means
 * next/image never has to pull a 6 MB original just to emit a 600 px card.
 */
export function photo(base: string, width = 1400, quality = 72): string {
  return `${base}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

export function formatPrice(amount: number): string {
  return `₹${inr.format(amount)}`;
}

export function formatNumber(amount: number, decimals = 0): string {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/** Resolves the next occurrence of a weekday at a given time. Client-only. */
export function nextOccurrence(weekday: number, hour: number, minute: number): Date {
  const now = new Date();
  const target = new Date(now);
  target.setHours(hour, minute, 0, 0);
  let delta = (weekday - now.getDay() + 7) % 7;
  if (delta === 0 && target.getTime() <= now.getTime()) delta = 7;
  target.setDate(target.getDate() + delta);
  return target;
}

export function countdownParts(target: Date, from: Date = new Date()) {
  const total = Math.max(0, target.getTime() - from.getTime());
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** Safe localStorage access — private mode and SSR both throw or are absent. */
export const storage = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: unknown): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* quota or blocked — appearance simply will not persist */
    }
  },
  remove(key: string): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};
