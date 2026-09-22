"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqItems } from "@/data/faq";
import { siteConfig } from "@/lib/site.config";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** One panel open at a time — the list stays scannable. */
export function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section className="section border-t border-line" aria-labelledby="faq-title">
      <div className="shell">
        <SectionHead
          id="faq-title"
          index="10"
          eyebrow="Good to know"
          titleLines={["Questions,", "Answered"]}
          body="Anything not covered here, call the floor — someone picks up during opening hours."
          action={
            <a href={siteConfig.contact.phoneHref} className="link-u t-label text-ink">
              {siteConfig.contact.phoneDisplay}
            </a>
          }
        />

        <Reveal as="div" variant="up" stagger={0.05} className="mt-14">
          {faqItems.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="border-t border-line last:border-b">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    id={`faq-trigger-${item.id}`}
                    className="group flex w-full items-center gap-5 py-6 text-left"
                  >
                    <span className="t-meta w-6 shrink-0 text-ink-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-[clamp(1.05rem,2.2vw,1.35rem)] leading-snug transition-colors duration-300",
                        "font-[family-name:var(--font-display-family)] tracking-[-0.02em]",
                        isOpen ? "text-ink" : "text-ink-2 group-hover:text-ink"
                      )}
                    >
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isOpen
                          ? "rotate-[135deg] border-accent text-accent"
                          : "border-line text-ink-2 group-hover:border-line-strong"
                      )}
                    >
                      <Plus size={15} strokeWidth={1.5} />
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  className="acc-panel"
                  data-open={isOpen}
                >
                  <div>
                    <p className="t-body max-w-[68ch] pb-7 pl-11 pr-12">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
