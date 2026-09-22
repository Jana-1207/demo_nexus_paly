"use client";

import { useLayoutEffect, useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
export function registerMotion() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out" });
  registered = true;
}
registerMotion();

export { gsap, ScrollTrigger };

export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type MotionLevel = "minimal" | "smooth" | "cinematic";

export function motionLevel(): MotionLevel {
  if (typeof document === "undefined") return "smooth";
  const v = document.documentElement.getAttribute("data-motion");
  return v === "minimal" || v === "cinematic" ? v : "smooth";
}

/**
 * Scales distance and duration. `minimal` collapses travel to zero so reveals
 * become a plain fade; `cinematic` stretches them out.
 */
export function motionFactor(): number {
  if (prefersReducedMotion()) return 0;
  const level = motionLevel();
  return level === "minimal" ? 0 : level === "cinematic" ? 1.45 : 1;
}

/** True when heavy scroll work (pinning, parallax) should be skipped entirely. */
export function isLowMotion(): boolean {
  return prefersReducedMotion() || motionLevel() === "minimal";
}

export function isDesktopPointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/**
 * Runs a GSAP setup function inside a context scoped to `ref`, and re-runs it
 * when the appearance-level motion setting changes.
 */
export function useGsapContext(
  setup: (ctx: { self: gsap.Context }) => void,
  ref: RefObject<HTMLElement | null>,
  deps: unknown[] = []
) {
  useIsoLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context((self) => setup({ self }), ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export const REVEAL_START = "top 84%";
