"use client";

import { useEffect, useState } from "react";
import { countdownParts, nextOccurrence, pad2 } from "@/lib/utils";

type CountdownProps = {
  weekday: number;
  hour: number;
  minute: number;
  className?: string;
};

/**
 * Time until the next occurrence of a weekly fixture. Rendered client-side only
 * — the server has no business guessing the visitor's clock.
 */
export function Countdown({ weekday, hour, minute, className }: CountdownProps) {
  const [parts, setParts] = useState<ReturnType<typeof countdownParts> | null>(null);

  useEffect(() => {
    const tick = () => setParts(countdownParts(nextOccurrence(weekday, hour, minute)));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [weekday, hour, minute]);

  const cells = parts
    ? [
        { v: pad2(parts.days), l: "D" },
        { v: pad2(parts.hours), l: "H" },
        { v: pad2(parts.minutes), l: "M" },
        { v: pad2(parts.seconds), l: "S" },
      ]
    : [
        { v: "––", l: "D" },
        { v: "––", l: "H" },
        { v: "––", l: "M" },
        { v: "––", l: "S" },
      ];

  return (
    <div className={className}>
      <p className="t-meta">Starts in</p>
      <div className="mt-2 flex items-baseline gap-1.5" aria-hidden="true">
        {cells.map((cell, i) => (
          <span key={cell.l} className="flex items-baseline">
            <span className="t-num tabnum text-[1.15rem] leading-none text-ink">
              {cell.v}
            </span>
            <span className="t-meta ml-0.5 !text-[0.6rem]">{cell.l}</span>
            {i < cells.length - 1 && (
              <span className="mx-1 text-ink-3" aria-hidden="true">
                ·
              </span>
            )}
          </span>
        ))}
      </div>
      <p className="sr-only">
        {parts
          ? `Starts in ${parts.days} days, ${parts.hours} hours and ${parts.minutes} minutes.`
          : "Start time loading."}
      </p>
    </div>
  );
}
