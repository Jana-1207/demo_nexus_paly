/**
 * Appearance system definition.
 *
 * Themes, accents, card styles and motion levels are *hand-authored* sets.
 * Nothing here is generated — each option maps to CSS written in globals.css.
 */

export const THEMES = [
  {
    id: "dark",
    label: "Dark",
    note: "Signature. Near-black with cool neutrals.",
    swatch: ["#08080a", "#17171b", "#f5f5f6"],
  },
  {
    id: "light",
    label: "Light",
    note: "Warm paper, editorial contrast.",
    swatch: ["#f7f6f4", "#e6e4de", "#131315"],
  },
  {
    id: "graphite",
    label: "Graphite",
    note: "Neutral studio grey, low glare.",
    swatch: ["#16181b", "#2b2f34", "#e9ebee"],
  },
  {
    id: "midnight",
    label: "Midnight",
    note: "Deep navy, late-session mood.",
    swatch: ["#070b17", "#1a2542", "#e8ecf7"],
  },
  {
    id: "neon",
    label: "Neon",
    note: "Arcade after dark. Higher glow.",
    swatch: ["#07040a", "#22152b", "#f8f3fb"],
  },
] as const;

export const ACCENTS = [
  { id: "cyan", label: "Cyan", dot: "#22d3ee" },
  { id: "purple", label: "Purple", dot: "#a855f7" },
  { id: "blue", label: "Blue", dot: "#3b82f6" },
  { id: "red", label: "Red", dot: "#f0434f" },
  { id: "orange", label: "Orange", dot: "#f97316" },
  { id: "green", label: "Green", dot: "#26c665" },
] as const;

export const CARD_STYLES = [
  { id: "glass", label: "Glass", note: "Frosted surfaces" },
  { id: "minimal", label: "Minimal", note: "Hairline only" },
  { id: "elevated", label: "Elevated", note: "Solid + shadow" },
  { id: "border", label: "Border", note: "Outlined, flat" },
] as const;

export const MOTION_LEVELS = [
  { id: "minimal", label: "Minimal", note: "Essential motion only" },
  { id: "smooth", label: "Smooth", note: "Balanced — recommended" },
  { id: "cinematic", label: "Cinematic", note: "Longer, richer sequences" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
export type AccentId = (typeof ACCENTS)[number]["id"];
export type CardStyleId = (typeof CARD_STYLES)[number]["id"];
export type MotionId = (typeof MOTION_LEVELS)[number]["id"];

export type Appearance = {
  theme: ThemeId;
  accent: AccentId;
  card: CardStyleId;
  motion: MotionId;
};

export const DEFAULT_APPEARANCE: Appearance = {
  theme: "dark",
  accent: "cyan",
  card: "glass",
  motion: "smooth",
};

export const APPEARANCE_STORAGE_KEY = "nexusplay.appearance.v1";

const THEME_IDS = THEMES.map((t) => t.id) as readonly string[];
const ACCENT_IDS = ACCENTS.map((a) => a.id) as readonly string[];
const CARD_IDS = CARD_STYLES.map((c) => c.id) as readonly string[];
const MOTION_IDS = MOTION_LEVELS.map((m) => m.id) as readonly string[];

/** Narrow arbitrary stored JSON back into a valid Appearance. */
export function sanitizeAppearance(input: unknown): Appearance {
  if (!input || typeof input !== "object") return DEFAULT_APPEARANCE;
  const v = input as Record<string, unknown>;
  return {
    theme: THEME_IDS.includes(v.theme as string)
      ? (v.theme as ThemeId)
      : DEFAULT_APPEARANCE.theme,
    accent: ACCENT_IDS.includes(v.accent as string)
      ? (v.accent as AccentId)
      : DEFAULT_APPEARANCE.accent,
    card: CARD_IDS.includes(v.card as string)
      ? (v.card as CardStyleId)
      : DEFAULT_APPEARANCE.card,
    motion: MOTION_IDS.includes(v.motion as string)
      ? (v.motion as MotionId)
      : DEFAULT_APPEARANCE.motion,
  };
}

/**
 * Runs before first paint (inlined into <head>) so a stored theme never flashes.
 * Kept dependency-free and defensive — private mode can throw on localStorage.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{
var d=document.documentElement;
var s=localStorage.getItem(${JSON.stringify(APPEARANCE_STORAGE_KEY)});
var a=${JSON.stringify(DEFAULT_APPEARANCE)};
if(s){var p=JSON.parse(s);
if(${JSON.stringify(THEME_IDS)}.indexOf(p.theme)>-1)a.theme=p.theme;
if(${JSON.stringify(ACCENT_IDS)}.indexOf(p.accent)>-1)a.accent=p.accent;
if(${JSON.stringify(CARD_IDS)}.indexOf(p.card)>-1)a.card=p.card;
if(${JSON.stringify(MOTION_IDS)}.indexOf(p.motion)>-1)a.motion=p.motion;}
d.setAttribute('data-theme',a.theme);
d.setAttribute('data-accent',a.accent);
d.setAttribute('data-card',a.card);
d.setAttribute('data-motion',a.motion);
}catch(e){}})();`;
