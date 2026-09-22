"use client";

import { useRef, useState } from "react";
import { experiences } from "@/data/experiences";
import { gsap, ScrollTrigger, useGsapContext, isLowMotion } from "@/lib/motion";
import { useAppearance } from "@/components/providers/AppearanceProvider";
import { SectionHead } from "@/components/ui/SectionHead";
import { ExperienceCard } from "./ExperienceCard";
import { cn } from "@/lib/utils";

/**
 * Desktop: vertical scroll drives a horizontal track inside a pinned viewport.
 * Below lg: the same track becomes a snap-scrolling swipe rail.
 */
export function Experiences() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const [current, setCurrent] = useState(1);
  /** False when the pinned drive is unavailable — the rail then scrolls natively. */
  const [pinned, setPinned] = useState(true);
  const { appearance } = useAppearance();

  useGsapContext(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!pin || !track) return;

    const mm = gsap.matchMedia();
    const canPin = !isLowMotion();
    setPinned(canPin);

    // ---- Desktop: pinned horizontal drive ----
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      if (!canPin) return;

      const distance = () => Math.max(0, track.scrollWidth - pin.clientWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.12}`,
          scrub: 0.75,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar) gsap.set(bar, { scaleX: self.progress });
            const i = Math.min(
              experiences.length,
              Math.floor(self.progress * experiences.length) + 1
            );
            setCurrent(i);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { x: 0 });
      };
    });

    // ---- Touch / reduced motion: report position from native scrolling ----
    mm.add(canPin ? "(max-width: 1023.98px)" : "all", () => {
      const onScroll = () => {
        const max = track.scrollWidth - track.clientWidth;
        const p = max > 0 ? track.scrollLeft / max : 0;
        if (bar) gsap.set(bar, { scaleX: p });
        setCurrent(
          Math.min(experiences.length, Math.floor(p * experiences.length) + 1)
        );
      };
      track.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => track.removeEventListener("scroll", onScroll);
    });

    ScrollTrigger.refresh();
    return () => mm.revert();
  }, sectionRef, [appearance.motion]);

  return (
    <section
      ref={sectionRef}
      id="experiences"
      className="relative"
      aria-labelledby="experiences-title"
    >
      <div className="shell pt-[var(--section-y)] pb-12 md:pb-16">
        <SectionHead
          id="experiences-title"
          index="01"
          eyebrow="Five zones, one floor"
          titleLines={["Choose Your", "Experience"]}
          body="Every zone runs competition-grade hardware and its own booking window. Pick one, or move between all five on a single pass."
        />
      </div>

      {/* Pinned viewport (desktop) / swipe rail (touch) */}
      <div
        ref={pinRef}
        className={cn("relative", pinned && "lg:h-[100svh] lg:overflow-hidden")}
      >
        <div className="flex h-full flex-col justify-center">
          <div
            ref={trackRef}
            className={cn(
              "no-scrollbar flex snap-x snap-mandatory scroll-pl-[var(--gutter)] gap-4 overflow-x-auto overscroll-x-contain px-[var(--gutter)] pb-4 sm:gap-5",
              pinned && "lg:snap-none lg:overflow-visible lg:pb-0 lg:will-change-transform"
            )}
            style={{ scrollbarWidth: "none" }}
          >
            {experiences.map((experience, i) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                priority={i === 0}
              />
            ))}
            {/* Tail spacer so the last card can clear the right gutter */}
            <div
              aria-hidden="true"
              className="w-[var(--gutter)] shrink-0 lg:w-[calc(var(--gutter)*1.5)]"
            />
          </div>

          {/* Progress rail */}
          <div className="shell mt-7 flex items-center gap-5 lg:mt-10">
            <span className="t-meta tabnum shrink-0 text-ink">
              {String(current).padStart(2, "0")}
              <span className="text-ink-3"> / {String(experiences.length).padStart(2, "0")}</span>
            </span>
            <span className="relative h-px flex-1 bg-line" aria-hidden="true">
              <span
                ref={barRef}
                className="absolute inset-0 origin-left bg-accent"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
            <span className="t-meta shrink-0">
              {pinned ? (
                <>
                  <span className="lg:hidden">Swipe</span>
                  <span className="hidden lg:inline">Scroll to advance</span>
                </>
              ) : (
                <span>Swipe</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
