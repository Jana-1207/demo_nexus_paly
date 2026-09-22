"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

type ScrollApi = {
  scrollTo: (target: string | HTMLElement | number, offset?: number) => void;
  lock: (locked: boolean) => void;
};

const ScrollContext = createContext<ScrollApi | null>(null);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const locksRef = useRef(0);

  useEffect(() => {
    // Smooth scrolling is a motion effect — honour the OS setting.
    if (prefersReducedMotion()) {
      document.documentElement.style.scrollBehavior = "auto";
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Native momentum on touch feels better than an emulated one.
      syncTouch: false,
    });
    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback<ScrollApi["scrollTo"]>((target, offset = -72) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.15 });
      return;
    }
    // Reduced-motion / no-Lenis path.
    const el =
      typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    if (typeof el === "number") {
      window.scrollTo({ top: el });
    } else if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top });
    }
  }, []);

  const lock = useCallback((locked: boolean) => {
    locksRef.current = Math.max(0, locksRef.current + (locked ? 1 : -1));
    const shouldLock = locksRef.current > 0;
    const lenis = lenisRef.current;
    if (lenis) {
      if (shouldLock) lenis.stop();
      else lenis.start();
    }
    document.documentElement.style.overflow = shouldLock ? "hidden" : "";
  }, []);

  // One delegated handler for every in-page anchor on the site.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.("a[href^='#']");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector<HTMLElement>(href);
      if (!el) return;
      e.preventDefault();
      scrollTo(el, href === "#top" ? 0 : -72);
      history.replaceState(null, "", href);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  return (
    <ScrollContext.Provider value={{ scrollTo, lock }}>{children}</ScrollContext.Provider>
  );
}

export function useSmoothScroll(): ScrollApi {
  const ctx = useContext(ScrollContext);
  // Components can render outside the provider in isolation; degrade quietly.
  return (
    ctx ?? {
      scrollTo: () => {},
      lock: () => {},
    }
  );
}
