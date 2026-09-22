"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, isDesktopPointer, prefersReducedMotion } from "@/lib/motion";

type CursorState = "idle" | "link" | "view" | "cta" | "drag";

const RING_SCALE: Record<CursorState, number> = {
  idle: 0.26,
  link: 1,
  view: 1.12,
  cta: 0.82,
  drag: 1.12,
};

const LABEL: Record<CursorState, string> = {
  idle: "",
  link: "",
  view: "View",
  cta: "→",
  drag: "Drag",
};

/**
 * Minimal two-part cursor: a dot that tracks exactly, and a ring that lags and
 * changes state over interactive elements. Desktop pointers only.
 */
export function Cursor() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<CursorState>("idle");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!isDesktopPointer() || prefersReducedMotion()) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const root = rootRef.current;
    if (!ring || !dot || !root) return;

    gsap.set([ring, dot], { opacity: 0 });
    gsap.set(ring, { scale: RING_SCALE.idle });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3.out" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "none" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "none" });

    let shown = false;
    const onMove = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([ring, dot], { opacity: 1, duration: 0.3 });
        gsap.set(ring, { x: e.clientX, y: e.clientY });
        gsap.set(dot, { x: e.clientX, y: e.clientY });
      }
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const resolve = (target: EventTarget | null): CursorState => {
      const el = (target as HTMLElement | null)?.closest?.(
        "[data-cursor], a, button, input, select, textarea, [role='button']"
      ) as HTMLElement | null;
      if (!el) return "idle";
      const explicit = el.getAttribute("data-cursor");
      if (explicit === "view" || explicit === "cta" || explicit === "drag") return explicit;
      if (explicit === "none") return "idle";
      return "link";
    };

    const onOver = (e: PointerEvent) => setState(resolve(e.target));
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) setState("idle");
    };
    const onLeaveWindow = () => gsap.to([ring, dot], { opacity: 0, duration: 0.2 });
    const onEnterWindow = () => gsap.to([ring, dot], { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("pointerleave", onLeaveWindow);
    document.addEventListener("pointerenter", onEnterWindow);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerleave", onLeaveWindow);
      document.removeEventListener("pointerenter", onEnterWindow);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !ringRef.current) return;
    gsap.to(ringRef.current, {
      scale: RING_SCALE[state],
      duration: 0.38,
      ease: "power3.out",
    });
    gsap.to(dotRef.current, {
      opacity: state === "idle" ? 1 : 0,
      duration: 0.2,
    });
  }, [state, enabled]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} className="cursor-root" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring">
        <span
          style={{
            opacity: LABEL[state] ? 1 : 0,
            transition: "opacity 200ms var(--ease-out)",
            transform: state === "cta" ? "scale(1.8)" : "none",
          }}
        >
          {LABEL[state]}
        </span>
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
