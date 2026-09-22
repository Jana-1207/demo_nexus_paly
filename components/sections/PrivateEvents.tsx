"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  eventCategories,
  partyPackage,
  privateEventsMedia,
} from "@/data/private-events";
import { useBooking } from "@/components/providers/BookingProvider";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { formatPrice, photo } from "@/lib/utils";

export function PrivateEvents() {
  const booking = useBooking();

  return (
    <section
      className="section relative overflow-hidden border-t border-line wash-accent"
      aria-labelledby="private-events-title"
    >
      <div className="shell">
        <Reveal variant="fade" className="flex items-baseline gap-5">
          <span className="t-meta text-ink-3">07</span>
          <span className="eyebrow t-meta !text-accent">Private hire</span>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-14">
          <SplitReveal
            as="h2"
            id="private-events-title"
            lines={["Make Your Event", "Different."]}
            className="t-section text-ink lg:col-span-7"
          />
          <Reveal variant="up" delay={0.12} className="lg:col-span-5 lg:pb-2">
            <p className="t-lead max-w-prose">
              Birthdays, offsites, college fests and full venue buyouts. We handle the
              brackets, the food and the noise — you turn up and play.
            </p>
          </Reveal>
        </div>

        {/* Categories */}
        <Reveal
          as="ul"
          variant="up"
          stagger={0.07}
          className="mt-14 grid gap-0 sm:grid-cols-2 lg:grid-cols-4"
        >
          {eventCategories.map((category) => (
            <li
              key={category.id}
              className="group border-t border-line py-6 transition-colors duration-500 hover:border-accent sm:pr-8"
            >
              <h3 className="t-title text-[1.15rem] uppercase text-ink">
                {category.title}
              </h3>
              <p className="mt-2.5 text-[0.95rem] text-ink-2">{category.blurb}</p>
              <p className="mt-4 text-[0.85rem] leading-[1.6] text-ink-3">
                {category.detail}
              </p>
            </li>
          ))}
        </Reveal>

        {/* Package + media */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-x-10">
          <Reveal variant="clip" className="lg:col-span-7">
            <div className="grid h-full gap-3 sm:grid-cols-5">
              <div
                className="media media-zoom relative aspect-[4/3] overflow-hidden rounded-[var(--r-sm)] sm:col-span-3 sm:aspect-auto"
                data-cursor="view"
              >
                <Image
                  src={photo(privateEventsMedia.primary.src, 1000, 72)}
                  alt={privateEventsMedia.primary.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 92vw, 42vw"
                  className="object-cover"
                />
              </div>
              <div
                className="media media-zoom relative aspect-[4/3] overflow-hidden rounded-[var(--r-sm)] sm:col-span-2 sm:aspect-auto"
                data-cursor="view"
              >
                <Image
                  src={photo(privateEventsMedia.secondary.src, 800, 72)}
                  alt={privateEventsMedia.secondary.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 92vw, 28vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={0.1} className="lg:col-span-5">
            <article className="card flex h-full flex-col p-7 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <h3 className="t-label text-ink-2">{partyPackage.name}</h3>
                <span className="t-meta !text-accent">Most popular</span>
              </div>

              <p className="mt-6 flex items-baseline gap-3">
                <span className="t-num text-[clamp(2.4rem,5.5vw,3.2rem)] leading-none text-ink">
                  {formatPrice(partyPackage.price)}
                </span>
                <span className="t-meta">{partyPackage.unit}</span>
              </p>

              <ul className="mt-7 grid gap-2.5 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {partyPackage.includes.map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1 shrink-0 rotate-45"
                      style={{ backgroundColor: "var(--accent)" }}
                    />
                    <span className="t-body !text-[0.9rem]">{line}</span>
                  </li>
                ))}
              </ul>

              <dl className="mt-7 flex flex-wrap gap-x-7 gap-y-2 border-t border-line pt-5">
                {partyPackage.addOns.map((addOn) => (
                  <div key={addOn.label} className="flex items-baseline gap-2">
                    <dt className="t-meta">{addOn.label}</dt>
                    <dd className="t-num text-[0.9rem] text-ink">{addOn.price}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-auto pt-8">
                <Magnetic strength={12} className="w-full">
                  <button
                    type="button"
                    data-cursor="cta"
                    onClick={() => booking.open()}
                    className="btn btn-primary w-full"
                  >
                    {partyPackage.cta}
                    <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                  </button>
                </Magnetic>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
