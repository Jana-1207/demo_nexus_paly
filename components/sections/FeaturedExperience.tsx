"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { featuredExperience } from "@/data/experiences";
import { gsap, useGsapContext, isLowMotion, motionFactor } from "@/lib/motion";
import { useBooking } from "@/components/providers/BookingProvider";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { photo } from "@/lib/utils";

export function FeaturedExperience() {
  const ref = useRef<HTMLElement | null>(null);
  const booking = useBooking();
  const f = featuredExperience;

  useGsapContext(() => {
    const root = ref.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    const factor = motionFactor();

    // Masked image reveal
    gsap.fromTo(
      q(".feat-frame"),
      { clipPath: factor > 0 ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: factor === 0 ? 0.4 : 1.25,
        ease: "expo.out",
        scrollTrigger: { trigger: root, start: "top 72%", once: true },
      }
    );

    gsap.fromTo(
      q(".feat-inset"),
      { opacity: 0, y: 28 * factor, scale: factor > 0 ? 0.96 : 1 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: factor === 0 ? 0.4 : 1,
        delay: 0.25,
        ease: "expo.out",
        scrollTrigger: { trigger: root, start: "top 72%", once: true },
      }
    );

    if (!isLowMotion()) {
      gsap.fromTo(
        q(".feat-img"),
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.7 },
        }
      );
    }
  }, ref);

  return (
    <section
      ref={ref}
      className="section relative overflow-hidden wash-accent"
      aria-labelledby="featured-title"
    >
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-x-14">
          {/* Media column */}
          <div className="relative lg:col-span-6 xl:col-span-5">
            <div className="feat-frame media relative aspect-[4/5] w-full overflow-hidden rounded-[var(--r-sm)] sm:aspect-[3/4] lg:aspect-[4/5]">
              <div className="feat-img absolute inset-[-8%]">
                <Image
                  src={photo(f.image, 1200, 74)}
                  alt={f.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 92vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Overlapping inset — the one deliberate overlap on the page */}
            <div className="feat-inset absolute -bottom-7 right-3 w-[38%] max-w-[190px] sm:-right-5 sm:w-[34%] lg:-right-8">
              <div className="media aspect-square overflow-hidden rounded-[var(--r-sm)] border border-line-strong">
                <Image
                  src={photo(f.insetImage, 500, 72)}
                  alt={f.insetAlt}
                  width={400}
                  height={400}
                  loading="lazy"
                  sizes="190px"
                  className="size-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="lg:col-span-5 lg:col-start-8 xl:col-span-6 xl:col-start-7">
            <Reveal variant="fade" className="flex items-baseline gap-5">
              <span className="t-meta text-ink-3">02</span>
              <span className="eyebrow t-meta !text-accent">{f.eyebrow}</span>
            </Reveal>

            <Reveal variant="up" delay={0.08} className="mt-7">
              <p className="t-label text-ink-2">{f.kicker}</p>
            </Reveal>

            <SplitReveal
              as="h2"
              id="featured-title"
              lines={[...f.headlineLines]}
              className="t-section mt-3 text-ink"
            />

            <Reveal variant="up" delay={0.12} className="mt-6">
              <p className="t-lead max-w-prose">{f.body}</p>
            </Reveal>

            <Reveal
              as="ul"
              variant="up"
              stagger={0.07}
              delay={0.1}
              className="mt-9 grid gap-x-8 gap-y-0 xl:grid-cols-2"
            >
              {f.points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 border-t border-line py-3.5"
                >
                  <span
                    aria-hidden="true"
                    className="size-1 rotate-45 shrink-0"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                  <span className="text-[0.95rem] text-ink">{point}</span>
                </li>
              ))}
            </Reveal>

            <Reveal variant="up" delay={0.15} className="mt-9">
              <div className="flex flex-wrap items-center gap-7">
                <Magnetic strength={14}>
                  <button
                    type="button"
                    data-cursor="cta"
                    onClick={() => booking.open(f.cta.experienceId)}
                    className="btn btn-primary"
                  >
                    {f.cta.label}
                    <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                  </button>
                </Magnetic>
                <p className="flex items-baseline gap-3">
                  <span className="t-num text-[1.6rem] text-ink">{f.stat.value}</span>
                  <span className="t-meta max-w-[20ch] leading-[1.5] normal-case tracking-[0.08em]">
                    {f.stat.label}
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
