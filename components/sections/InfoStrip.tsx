import { siteConfig } from "@/lib/site.config";

/**
 * Quick-information strip. Doubles as the transition out of the hero: a single
 * hairline band of facts, moving slowly enough to read.
 */
export function InfoStrip() {
  const items = siteConfig.infoStrip;
  return (
    <section
      aria-label="At a glance"
      className="marquee relative overflow-hidden border-y border-line bg-surface-2/40 py-4"
    >
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li key={`${copy}-${item}`} className="flex items-center">
                <span className="t-label whitespace-nowrap px-6 text-ink-2 sm:px-9">
                  {item}
                </span>
                <span
                  className="size-1 rotate-45 bg-accent/70"
                  style={{ backgroundColor: "var(--accent)" }}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
      {/* Accessible, static equivalent of the moving text. */}
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
