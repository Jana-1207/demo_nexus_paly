"use client";

import { useRef } from "react";
import { gsap, useGsapContext, prefersReducedMotion } from "@/lib/motion";
import { formatNumber } from "@/lib/utils";

type CounterProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
};

/** Counts up once, when the number first scrolls into view. */
export function Counter({ value, decimals = 0, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useGsapContext(
    () => {
      const el = ref.current;
      if (!el) return;
      const target = el.querySelector<HTMLElement>("[data-num]");
      if (!target) return;

      if (prefersReducedMotion()) {
        target.textContent = formatNumber(value, decimals);
        return;
      }

      const state = { n: 0 };
      target.textContent = formatNumber(0, decimals);

      gsap.to(state, {
        n: value,
        duration: 1.9,
        ease: "power2.out",
        onUpdate: () => {
          target.textContent = formatNumber(state.n, decimals);
        },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    ref,
    [value, decimals]
  );

  return (
    <span
      ref={ref}
      className={className}
      aria-label={`${formatNumber(value, decimals)}${suffix}`}
    >
      {/* The server renders the final value, so the number is never missing. */}
      <span aria-hidden="true">
        <span data-num className="tabnum">
          {formatNumber(value, decimals)}
        </span>
        {suffix}
      </span>
    </span>
  );
}
