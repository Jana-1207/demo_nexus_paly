"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { events } from "@/data/events";
import { useBooking } from "@/components/providers/BookingProvider";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { Countdown } from "@/components/ui/Countdown";
import { formatPrice, photo } from "@/lib/utils";

/**
 * A weekly schedule rather than another card grid — rows read faster and keep
 * the page's rhythm varied.
 */
export function Events() {
  const booking = useBooking();

  return (
    <section id="events" className="section" aria-labelledby="events-title">
      <div className="shell">
        <SectionHead
          id="events-title"
          index="04"
          eyebrow="This week on the floor"
          titleLines={["Events &", "Tournaments"]}
          body="Three fixtures run every week, open to walk-ins and regulars alike. Entry includes practice time before the bracket starts."
        />

        <Reveal as="ul" variant="up" stagger={0.1} className="mt-14">
          {events.map((event) => (
            <li key={event.id}>
              <article className="group grid items-center gap-5 border-t border-line py-6 transition-colors duration-500 md:grid-cols-12 md:gap-6 md:py-7 hover:border-line-strong">
                <div className="md:col-span-3 lg:col-span-2">
                  <div
                    className="media media-zoom aspect-[16/10] overflow-hidden rounded-[var(--r-sm)]"
                    data-cursor="view"
                  >
                    <Image
                      src={photo(event.image, 600, 70)}
                      alt={event.alt}
                      width={480}
                      height={300}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 20vw"
                      className="size-full object-cover"
                    />
                  </div>
                </div>

                <div className="md:col-span-4 lg:col-span-4">
                  <h3 className="t-title uppercase text-ink">{event.title}</h3>
                  <p className="t-body mt-1.5">{event.discipline}</p>
                  <p className="t-meta mt-3">
                    {event.format} · {event.capacity}
                  </p>
                </div>

                <div className="md:col-span-2 lg:col-span-2">
                  <p className="t-label text-ink">{event.dayLabel}</p>
                  <p className="t-num mt-1.5 text-[1.05rem] text-ink-2">
                    {event.timeLabel}
                  </p>
                  <p className="t-meta mt-3 !text-accent">{event.prize}</p>
                </div>

                <div className="md:col-span-3 lg:col-span-2">
                  <Countdown
                    weekday={event.weekday}
                    hour={event.startHour}
                    minute={event.startMinute}
                  />
                </div>

                <div className="flex items-center justify-between gap-4 md:col-span-12 md:justify-start lg:col-span-2 lg:flex-col lg:items-end lg:gap-3">
                  <p className="lg:text-right">
                    <span className="t-num text-[1.3rem] text-ink">
                      {formatPrice(event.entry)}
                    </span>
                    <span className="t-meta ml-2 lg:ml-0 lg:mt-1 lg:block">Entry</span>
                  </p>
                  <button
                    type="button"
                    data-cursor="cta"
                    onClick={() => booking.open()}
                    className="btn btn-quiet btn-sm group-hover:border-line-strong"
                  >
                    Register
                    <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
                  </button>
                </div>
              </article>
            </li>
          ))}
        </Reveal>

        <div className="border-t border-line" />
      </div>
    </section>
  );
}
