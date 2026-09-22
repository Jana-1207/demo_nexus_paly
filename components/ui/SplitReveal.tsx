"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGsapContext, motionFactor, REVEAL_START } from "@/lib/motion";

type SplitRevealProps = {
  /** One entry per rendered line. Lines are masked and rise independently. */
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** Play immediately (hero) instead of waiting for the element to scroll in. */
  immediate?: boolean;
  start?: string;
  id?: string;
};

/**
 * Masked line reveal. Each line sits inside an overflow-hidden block and slides
 * up from below the mask — the core typographic move used across the page.
 */
export function SplitReveal({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.085,
  immediate = false,
  start = REVEAL_START,
  id,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useGsapContext(
    () => {
      const root = ref.current;
      if (!root) return;
      const inner = root.querySelectorAll<HTMLElement>(".split-line > span");
      if (!inner.length) return;

      const f = motionFactor();

      // A single fromTo keeps the start state owned by the tween, so a
      // context revert (React strict mode remounts) restores it cleanly.
      gsap.fromTo(
        inner,
        { yPercent: f > 0 ? 108 : 0, opacity: f > 0 ? 1 : 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: f === 0 ? 0.45 : 1.02 * (0.78 + 0.22 * f),
          ease: "expo.out",
          delay,
          stagger: stagger * (f || 1),
          overwrite: "auto",
          immediateRender: true,
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: root, start, once: true } }),
        }
      );
    },
    ref,
    [delay, stagger, immediate]
  );

  return (
    <Tag ref={ref as never} className={className} id={id}>
      {lines.map((line, i) => (
        <span className={`split-line ${lineClassName ?? ""}`} key={i}>
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
