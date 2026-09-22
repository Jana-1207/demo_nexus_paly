"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGsapContext, motionFactor, REVEAL_START } from "@/lib/motion";

type Variant = "up" | "clip" | "scale" | "fade" | "left";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variant?: Variant;
  delay?: number;
  duration?: number;
  /** Stagger direct children instead of animating the wrapper itself. */
  stagger?: number;
  /** CSS selector for the items to stagger, relative to the wrapper. */
  items?: string;
  start?: string;
};

/**
 * Scroll-triggered reveal. The start state is written in JS on the layout pass,
 * so content stays visible when JavaScript never runs.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  variant = "up",
  delay = 0,
  duration = 0.9,
  stagger,
  items = ":scope > *",
  start = REVEAL_START,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useGsapContext(
    () => {
      const root = ref.current;
      if (!root) return;

      const f = motionFactor();
      const targets: Element[] =
        stagger !== undefined ? Array.from(root.querySelectorAll(items)) : [root];
      if (!targets.length) return;

      const from: gsap.TweenVars = { opacity: 0 };
      const to: gsap.TweenVars = { opacity: 1 };

      if (f > 0) {
        if (variant === "up") from.y = 34 * f;
        if (variant === "left") from.x = -30 * f;
        if (variant === "scale") {
          from.scale = 1 - 0.04 * f;
          from.y = 18 * f;
        }
        if (variant === "clip") {
          from.clipPath = "inset(0% 0% 100% 0%)";
          from.y = 22 * f;
          to.clipPath = "inset(0% 0% 0% 0%)";
        }
      }
      if (variant === "up" || variant === "scale") to.y = 0;
      if (variant === "left") to.x = 0;
      if (variant === "scale") to.scale = 1;

      gsap.fromTo(targets, from, {
        ...to,
        duration: f === 0 ? 0.4 : duration * (0.75 + 0.25 * f),
        delay,
        ease: "power3.out",
        stagger: stagger !== undefined ? stagger * (f || 1) : 0,
        overwrite: "auto",
        immediateRender: true,
        scrollTrigger: { trigger: root, start, once: true },
      });
    },
    ref,
    [variant, stagger, delay, duration]
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
