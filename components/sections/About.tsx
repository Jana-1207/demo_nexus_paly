"use client";

import { useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site.config";
import { gsap, useGsapContext, motionFactor, isLowMotion } from "@/lib/motion";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { photo } from "@/lib/utils";

const ABOUT_IMAGE = {
  src: "https://images.unsplash.com/photo-1633545491399-54a16aa6a871",
  alt: "The Boaive Play esports floor lit in magenta, stations lined up along the wall",
};

export function About() {
  const ref = useRef<HTMLElement | null>(null);

  useGsapContext(() => {
    const root = ref.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    const f = motionFactor();

    gsap.fromTo(
      q(".about-frame"),
      { clipPath: f > 0 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: f === 0 ? 0.4 : 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: root, start: "top 74%", once: true },
      }
    );

    if (!isLowMotion()) {
      gsap.fromTo(
        q(".about-img"),
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.7 },
        }
      );
    }
  }, ref);

  return (
    <section
      ref={ref}
      id="about"
      className="section border-t border-line"
      aria-labelledby="about-title"
    >
      <div className="shell">
        <Reveal variant="fade" className="flex items-baseline gap-5">
          <span className="t-meta text-ink-3">06</span>
          <span className="eyebrow t-meta !text-accent">{siteConfig.about.eyebrow}</span>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-x-14">
          <div className="lg:col-span-7">
            <SplitReveal
              as="h2"
              id="about-title"
              lines={["Built for people who", "take play seriously."]}
              className="t-display text-[clamp(1.9rem,4.4vw,3.4rem)] normal-case text-ink"
            />

            <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-8">
              {siteConfig.about.body.map((para, i) => (
                <Reveal key={i} variant="up" delay={0.08 * i}>
                  <p className="t-body">{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal
              as="dl"
              variant="up"
              stagger={0.07}
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4"
            >
              {siteConfig.about.facts.map((fact) => (
                <div key={fact.label} className="border-t border-line pt-4">
                  <dd className="t-num text-[1.5rem] text-ink">{fact.value}</dd>
                  <dt className="t-meta mt-2">{fact.label}</dt>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <div className="about-frame media relative aspect-[4/3] overflow-hidden rounded-[var(--r-sm)] lg:aspect-[3/4]">
              <div className="about-img absolute inset-[-6%]">
                <Image
                  src={photo(ABOUT_IMAGE.src, 1100, 72)}
                  alt={ABOUT_IMAGE.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 92vw, 38vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
