"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { gsap, motionFactor, useGsapContext, isLowMotion } from "@/lib/motion";
import { useBooking } from "@/components/providers/BookingProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { photo } from "@/lib/utils";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const booking = useBooking();

  useGsapContext(() => {
    const root = ref.current;
    if (!root) return;
    const f = motionFactor();
    const q = gsap.utils.selector(root);

    // ---- Load sequence: media first, then type, then the supporting rail ----
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.fromTo(
      q(".hero-media"),
      {
        clipPath: f > 0 ? "inset(12% 14% 22% 14%)" : "inset(0% 0% 0% 0%)",
        opacity: f > 0 ? 0 : 1,
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: f === 0 ? 0.5 : 1.5,
      }
    )
      .fromTo(
        q(".hero-img"),
        { scale: f > 0 ? 1.16 : 1 },
        { scale: 1, duration: f === 0 ? 0.5 : 1.9, ease: "power2.out" },
        0
      )
      .fromTo(
        q(".hero-eyebrow"),
        { opacity: 0, y: 12 * f },
        { opacity: 1, y: 0, duration: 0.8 },
        f === 0 ? 0 : 0.5
      )
      .fromTo(
        q(".hero-line > span"),
        { yPercent: f > 0 ? 112 : 0, opacity: f > 0 ? 1 : 0 },
        { yPercent: 0, opacity: 1, duration: f === 0 ? 0.4 : 1.15, stagger: 0.085 },
        f === 0 ? 0 : 0.62
      )
      .fromTo(
        q(".hero-body"),
        { opacity: 0, y: 18 * f },
        { opacity: 1, y: 0, duration: 0.9 },
        f === 0 ? 0 : 1.02
      )
      .fromTo(
        q(".hero-cta"),
        { opacity: 0, y: 16 * f },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
        f === 0 ? 0 : 1.12
      )
      .fromTo(
        q(".hero-rail"),
        { opacity: 0, y: 14 * f },
        { opacity: 1, y: 0, duration: 0.8 },
        f === 0 ? 0 : 1.24
      )
      .fromTo(
        q(".hero-rule"),
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "power3.inOut" },
        f === 0 ? 0 : 1.1
      );

    // ---- Restrained parallax: media drifts, type lifts away ----
    if (!isLowMotion()) {
      gsap.to(q(".hero-img"), {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      gsap.to(q(".hero-type"), {
        yPercent: -9,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    }
  }, ref);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-canvas-deep"
      aria-label="Introduction"
    >
      {/* Media layer */}
      <div className="hero-media absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-img media-graded absolute inset-[-6%]">
          <Image
            src={photo(siteConfig.hero.image.src, 2400, 72)}
            alt={siteConfig.hero.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="hero-scrim absolute inset-0" aria-hidden="true" />
      </div>

      {/* Top rail */}
      <div className="shell relative flex items-center justify-between pt-[calc(84px+clamp(1.5rem,4vw,3rem))]">
        <p className="hero-eyebrow eyebrow t-meta !text-accent">
          {siteConfig.hero.eyebrow}
        </p>
        <p className="hero-eyebrow t-meta hidden !text-ink-2 md:block">
          Est. {siteConfig.brand.established}
        </p>
      </div>

      {/* Type block */}
      <div className="shell relative flex flex-1 items-end pb-10 pt-14 md:pb-14">
        <div className="hero-type grid w-full gap-x-12 gap-y-9 lg:grid-cols-12 lg:items-end">
          <h1 className="t-hero text-ink lg:col-span-7 xl:col-span-8">
            {siteConfig.hero.headlineLines.map((line, i) => (
              <span key={line} className="hero-line split-line">
                <span className={i === 2 ? "text-accent" : undefined}>{line}</span>
              </span>
            ))}
          </h1>

          <div className="flex flex-col gap-7 lg:col-span-5 xl:col-span-4 lg:pb-3">
            <p className="hero-body t-lead max-w-md text-balance">
              {siteConfig.hero.body}
            </p>
            <div className="flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <span className="hero-cta w-full xs:w-auto">
                <Magnetic strength={16} className="w-full xs:w-auto">
                  <a
                    href={siteConfig.hero.primaryCta.href}
                    data-cursor="cta"
                    className="btn btn-primary w-full xs:w-auto"
                  >
                    {siteConfig.hero.primaryCta.label}
                    <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                  </a>
                </Magnetic>
              </span>
              <span className="hero-cta w-full xs:w-auto">
                <Magnetic strength={12} className="w-full xs:w-auto">
                  <button
                    type="button"
                    onClick={() => booking.open()}
                    className="btn btn-ghost w-full xs:w-auto"
                  >
                    {siteConfig.hero.secondaryCta.label}
                  </button>
                </Magnetic>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom metadata rail */}
      <div className="shell relative pb-7">
        <div
          className="hero-rule h-px w-full origin-left bg-line"
          aria-hidden="true"
        />
        <div className="hero-rail flex flex-wrap items-center justify-between gap-x-10 gap-y-4 pt-5">
          <dl className="flex flex-wrap items-center gap-x-8 gap-y-3 sm:gap-x-12">
            {siteConfig.hero.meta.map((m, i) => (
              <div key={m.label} className="flex items-center gap-3">
                {i === 1 && (
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-accent"
                    style={{ boxShadow: "0 0 0 3px var(--accent-soft)" }}
                  />
                )}
                <div>
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="t-label text-ink">{m.value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <a
            href="#experiences"
            className="group flex items-center gap-3 text-ink-2 transition-colors hover:text-ink"
          >
            <span className="t-meta group-hover:text-ink">Scroll</span>
            <span className="grid size-9 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-accent">
              <ArrowDown
                size={14}
                strokeWidth={1.5}
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:translate-y-0.5"
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
