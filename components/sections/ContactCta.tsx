"use client";

import { useRef } from "react";
import Image from "next/image";
import { Phone, MessageCircle, Navigation } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { gsap, useGsapContext, isLowMotion } from "@/lib/motion";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { photo } from "@/lib/utils";

const CTA_IMAGE = {
  src: "https://images.unsplash.com/photo-1766766465602-d8f891879cb8",
  alt: "A crowd cheering under stage lighting at a tournament final",
};

export function ContactCta() {
  const ref = useRef<HTMLElement | null>(null);

  useGsapContext(() => {
    const root = ref.current;
    if (!root || isLowMotion()) return;
    gsap.fromTo(
      gsap.utils.selector(root)(".cta-img"),
      { yPercent: -8, scale: 1.06 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.7 },
      }
    );
  }, ref);

  return (
    <section
      ref={ref}
      id="book"
      className="relative isolate overflow-hidden border-t border-line"
      aria-labelledby="cta-title"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="cta-img media-graded absolute inset-[-10%]">
          <Image
            src={photo(CTA_IMAGE.src, 1800, 66)}
            alt=""
            aria-hidden="true"
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="band-scrim absolute inset-0" aria-hidden="true" />
      </div>

      <div className="shell py-[clamp(5rem,12vw,9rem)]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-14">
          <div className="lg:col-span-7">
            <Reveal variant="fade" className="flex items-baseline gap-5">
              <span className="t-meta text-ink-3">11</span>
              <span className="eyebrow t-meta !text-accent">Get in touch</span>
            </Reveal>

            <SplitReveal
              as="h2"
              id="cta-title"
              lines={["Let's", "Play."]}
              className="t-hero mt-8 text-ink"
            />
          </div>

          <div className="lg:col-span-5 lg:pb-4">
            <Reveal variant="up">
              <p className="t-lead max-w-prose">{siteConfig.cta.body}</p>
            </Reveal>

            <Reveal variant="up" delay={0.1} className="mt-8">
              <div className="flex flex-wrap gap-3">
                <Magnetic strength={12}>
                  <a
                    href={siteConfig.contact.phoneHref}
                    data-cursor="cta"
                    className="btn btn-primary"
                  >
                    <Phone size={15} strokeWidth={1.75} aria-hidden="true" />
                    Call Now
                  </a>
                </Magnetic>
                <a
                  href={siteConfig.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  <MessageCircle size={15} strokeWidth={1.75} aria-hidden="true" />
                  WhatsApp
                </a>
                <a
                  href={siteConfig.location.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-quiet"
                >
                  <Navigation size={15} strokeWidth={1.75} aria-hidden="true" />
                  Get Directions
                </a>
              </div>
            </Reveal>

            <Reveal variant="up" delay={0.16} className="mt-9">
              <dl className="flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
                <div>
                  <dt className="t-meta">Call</dt>
                  <dd className="mt-1.5">
                    <a
                      href={siteConfig.contact.phoneHref}
                      className="link-u text-[0.95rem] text-ink"
                    >
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="t-meta">Email</dt>
                  <dd className="mt-1.5">
                    <a
                      href={siteConfig.contact.emailHref}
                      className="link-u text-[0.95rem] text-ink"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
