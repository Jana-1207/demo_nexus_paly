"use client";

import type { ReactNode } from "react";
import { SplitReveal } from "./SplitReveal";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type SectionHeadProps = {
  index: string;
  eyebrow: string;
  titleLines: ReactNode[];
  body?: string;
  action?: ReactNode;
  className?: string;
  align?: "split" | "left";
  id?: string;
};

/**
 * The page's one section header pattern: numbered index, hairline eyebrow,
 * masked title lines, and an optional body/action column on the right.
 */
export function SectionHead({
  index,
  eyebrow,
  titleLines,
  body,
  action,
  className,
  align = "split",
  id,
}: SectionHeadProps) {
  return (
    <header className={cn("relative", className)}>
      <Reveal variant="fade" className="flex items-baseline gap-4 md:gap-6">
        <span className="t-meta text-ink-3">{index}</span>
        <span className="eyebrow t-meta !text-accent">{eyebrow}</span>
      </Reveal>

      <div
        className={cn(
          "mt-7 md:mt-9",
          align === "split" &&
            "grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-12"
        )}
      >
        <SplitReveal
          as="h2"
          id={id}
          lines={titleLines}
          className={cn("t-section text-ink", align === "split" && "lg:col-span-7")}
        />

        {(body || action) && (
          <div
            className={cn(
              "flex flex-col gap-6",
              align === "split" && "lg:col-span-5 lg:pb-2"
            )}
          >
            {body && (
              <Reveal variant="up" delay={0.12}>
                <p className="t-lead max-w-prose">{body}</p>
              </Reveal>
            )}
            {action && (
              <Reveal variant="up" delay={0.2}>
                <div>{action}</div>
              </Reveal>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
