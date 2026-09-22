"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  APPEARANCE_STORAGE_KEY,
  DEFAULT_APPEARANCE,
  sanitizeAppearance,
  type Appearance,
} from "@/lib/theme.config";
import { storage } from "@/lib/utils";

type AppearanceContextValue = {
  appearance: Appearance;
  /** True once the stored preference has been read — panels use it to avoid a flicker of the default. */
  ready: boolean;
  set: <K extends keyof Appearance>(key: K, value: Appearance[K]) => void;
  reset: () => void;
};

const AppearanceContext = createContext<AppearanceContextValue | null>(null);

const ATTR: Record<keyof Appearance, string> = {
  theme: "data-theme",
  accent: "data-accent",
  card: "data-card",
  motion: "data-motion",
};

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearance] = useState<Appearance>(DEFAULT_APPEARANCE);
  const [ready, setReady] = useState(false);
  const shiftTimer = useRef<number | null>(null);

  // Adopt whatever the pre-paint boot script already applied.
  useEffect(() => {
    const stored = storage.get<unknown>(APPEARANCE_STORAGE_KEY, null);
    setAppearance(sanitizeAppearance(stored));
    setReady(true);
  }, []);

  const set = useCallback<AppearanceContextValue["set"]>((key, value) => {
    setAppearance((prev) => {
      if (prev[key] === value) return prev;
      const next = { ...prev, [key]: value };
      const root = document.documentElement;
      root.setAttribute(ATTR[key], String(value));
      storage.set(APPEARANCE_STORAGE_KEY, next);

      // A brief global cross-fade, only while the palette is actually changing.
      if (key === "theme" || key === "accent") {
        root.setAttribute("data-theme-shifting", "true");
        if (shiftTimer.current) window.clearTimeout(shiftTimer.current);
        shiftTimer.current = window.setTimeout(() => {
          root.removeAttribute("data-theme-shifting");
          shiftTimer.current = null;
        }, 520);
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    const root = document.documentElement;
    (Object.keys(ATTR) as Array<keyof Appearance>).forEach((k) =>
      root.setAttribute(ATTR[k], String(DEFAULT_APPEARANCE[k]))
    );
    root.setAttribute("data-theme-shifting", "true");
    window.setTimeout(() => root.removeAttribute("data-theme-shifting"), 520);
    storage.set(APPEARANCE_STORAGE_KEY, DEFAULT_APPEARANCE);
    setAppearance(DEFAULT_APPEARANCE);
  }, []);

  useEffect(
    () => () => {
      if (shiftTimer.current) window.clearTimeout(shiftTimer.current);
    },
    []
  );

  const value = useMemo(
    () => ({ appearance, ready, set, reset }),
    [appearance, ready, set, reset]
  );

  return (
    <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>
  );
}

export function useAppearance(): AppearanceContextValue {
  const ctx = useContext(AppearanceContext);
  if (!ctx) throw new Error("useAppearance must be used inside AppearanceProvider");
  return ctx;
}
