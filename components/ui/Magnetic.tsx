"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useIsoLayoutEffect, isDesktopPointer, isLowMotion } from "@/lib/motion";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Maximum travel in px. Kept small on purpose — this should be felt, not seen. */
  strength?: number;
};

/**
 * Subtle magnetic pull toward the pointer. Desktop pointers only, and disabled
 * whenever motion is dialled down.
 */
export function Magnetic({ children, className, strength = 14 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || !isDesktopPointer() || isLowMotion()) return;

    const target = (el.firstElementChild as HTMLElement | null) ?? el;
    const xTo = gsap.quickTo(target, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(target, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      xTo(gsap.utils.clamp(-1, 1, dx) * strength);
      yTo(gsap.utils.clamp(-1, 1, dy) * (strength * 0.55));
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.set(target, { x: 0, y: 0 });
    };
  }, [strength]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-flex" }}>
      {children}
    </span>
  );
}
