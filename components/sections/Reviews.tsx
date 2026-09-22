"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { reviews, reviewSummary } from "@/data/reviews";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { cn } from "@/lib/utils";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={13}
          strokeWidth={1.5}
          aria-hidden="true"
          className={cn(
            n <= rating ? "text-accent" : "text-ink-3",
            n <= rating && "fill-current"
          )}
        />
      ))}
    </div>
  );
}

/**
 * A horizontal quote rail. Scroll-snapped, arrow-driven and keyboard reachable —
 * deliberately not a star-rating widget.
 */
export function Reviews() {
  const railRef = useRef<HTMLUListElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setAtStart(rail.scrollLeft < 8);
    setAtEnd(rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 8);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    sync();
    rail.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      rail.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const nudge = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("li");
    const step = card ? card.offsetWidth + 16 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section className="section border-t border-line" aria-labelledby="reviews-title">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-14">
          <div className="lg:col-span-7">
            <Reveal variant="fade" className="flex items-baseline gap-5">
              <span className="t-meta text-ink-3">08</span>
              <span className="eyebrow t-meta !text-accent">What people say</span>
            </Reveal>
            <SplitReveal
              as="h2"
              id="reviews-title"
              lines={["Reviewed By", "The Regulars"]}
              className="t-section mt-7 text-ink"
            />
          </div>

          <div className="flex items-end justify-between gap-6 lg:col-span-5 lg:pb-2">
            <Reveal variant="up">
              <div className="flex items-baseline gap-3">
                <span className="t-num text-[clamp(2.6rem,6vw,3.4rem)] leading-none text-ink">
                  {reviewSummary.rating}
                </span>
                <div>
                  <Stars rating={5} />
                  <p className="t-meta mt-2">{reviewSummary.count} reviews</p>
                </div>
              </div>
            </Reveal>

            <Reveal variant="up" delay={0.1}>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => nudge(-1)}
                  disabled={atStart}
                  className="grid size-11 place-items-center rounded-full border border-line-strong text-ink transition-colors duration-300 hover:border-accent disabled:opacity-35 disabled:hover:border-line-strong"
                  aria-label="Previous reviews"
                >
                  <ChevronLeft size={17} strokeWidth={1.5} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => nudge(1)}
                  disabled={atEnd}
                  className="grid size-11 place-items-center rounded-full border border-line-strong text-ink transition-colors duration-300 hover:border-accent disabled:opacity-35 disabled:hover:border-line-strong"
                  aria-label="Next reviews"
                >
                  <ChevronRight size={17} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Rail — breaks the container on purpose so quotes run off the right edge */}
      <Reveal variant="fade" delay={0.05}>
        <ul
          ref={railRef}
          data-cursor="drag"
          tabIndex={0}
          aria-label="Customer reviews"
          className="no-scrollbar mt-12 flex snap-x snap-mandatory scroll-pl-[var(--gutter)] gap-4 overflow-x-auto overscroll-x-contain px-[var(--gutter)] pb-2"
        >
          {reviews.map((review) => (
            <li
              key={review.id}
              className="flex w-[80vw] max-w-[440px] shrink-0 snap-start sm:w-[54vw] lg:w-[clamp(340px,26vw,400px)]"
            >
              <figure className="card card-hover flex w-full flex-col p-6 md:p-7">
                <Stars rating={review.rating} />
                <blockquote className="mt-6 flex-1">
                  <p className="text-[1.02rem] leading-[1.6] text-ink">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-7 flex items-end justify-between gap-4 border-t border-line pt-5">
                  <div>
                    <p className="t-label text-ink">{review.name}</p>
                    <p className="t-meta mt-1.5 leading-[1.4]">{review.role}</p>
                  </div>
                  <span className="t-meta shrink-0">{review.source}</span>
                </figcaption>
              </figure>
            </li>
          ))}
          <li aria-hidden="true" className="w-[max(0px,calc(var(--gutter)-1rem))] shrink-0" />
        </ul>
      </Reveal>
    </section>
  );
}
