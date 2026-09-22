"use client";

import { stats } from "@/data/stats";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

/** A quiet band of numbers between two louder sections. Type does the work. */
export function Stats() {
  return (
    <section className="relative border-y border-line" aria-label="Nexus Play in numbers">
      <div className="shell py-14 md:py-20">
        <Reveal
          as="dl"
          variant="up"
          stagger={0.09}
          className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-10"
        >
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="border-t border-line pt-5 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0 lg:first:border-l-0 lg:first:pl-0"
            >
              <dd className="t-num text-[clamp(2.6rem,6.5vw,4.5rem)] leading-[0.88] text-ink">
                <Counter
                  value={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              </dd>
              <dt className="t-label mt-4 text-ink">{stat.label}</dt>
              <p className="t-body mt-2 max-w-[24ch] !text-[0.85rem] leading-[1.55]">
                {stat.note}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
