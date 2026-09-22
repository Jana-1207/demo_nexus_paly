"use client";

import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

const { location, contact, hours } = siteConfig;

export function Location() {
  return (
    <section id="location" className="section border-t border-line" aria-labelledby="location-title">
      <div className="shell">
        <SectionHead
          id="location-title"
          index="09"
          eyebrow="Find us"
          titleLines={["Thousand Lights,", "Chennai"]}
          body="Six minutes from the metro, free parking at the door, and open every day of the year."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-x-10">
          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal as="ul" variant="up" stagger={0.07} className="grid gap-0">
              <li className="flex gap-4 border-t border-line py-5">
                <MapPin
                  size={16}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <div>
                  <p className="t-meta">Address</p>
                  <p className="mt-2 text-[0.98rem] text-ink">{location.venueName}</p>
                  <p className="t-body !text-[0.92rem]">{location.line1}</p>
                  <p className="t-body !text-[0.92rem]">{location.line2}</p>
                </div>
              </li>

              <li className="flex gap-4 border-t border-line py-5">
                <Phone
                  size={16}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <div>
                  <p className="t-meta">Phone</p>
                  <a
                    href={contact.phoneHref}
                    className="link-u mt-2 block text-[0.98rem] text-ink"
                  >
                    {contact.phoneDisplay}
                  </a>
                </div>
              </li>

              <li className="flex gap-4 border-t border-line py-5">
                <Mail
                  size={16}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <div>
                  <p className="t-meta">Email</p>
                  <a
                    href={contact.emailHref}
                    className="link-u mt-2 block text-[0.98rem] text-ink"
                  >
                    {contact.email}
                  </a>
                </div>
              </li>

              <li className="flex gap-4 border-y border-line py-5">
                <Clock
                  size={16}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <div className="w-full">
                  <p className="t-meta">Opening hours</p>
                  <dl className="mt-2.5 grid gap-1.5">
                    {hours.weekly.map((row) => (
                      <div
                        key={row.days}
                        className="flex flex-wrap items-baseline justify-between gap-x-6"
                      >
                        <dt className="t-body !text-[0.92rem]">{row.days}</dt>
                        <dd className="t-num text-[0.92rem] text-ink">{row.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            </Reveal>

            <Reveal variant="up" delay={0.1} className="mt-8">
              <Magnetic strength={12}>
                <a
                  href={location.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="cta"
                  className="btn btn-primary"
                >
                  <Navigation size={15} strokeWidth={1.75} aria-hidden="true" />
                  Get Directions
                </a>
              </Magnetic>
            </Reveal>
          </div>

          {/* Map */}
          <Reveal variant="clip" className="lg:col-span-7">
            <div className="card relative h-full min-h-[340px] overflow-hidden p-0 sm:min-h-[440px]">
              <iframe
                title={`Map showing ${location.venueName}, ${location.line2}`}
                src={location.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0"
                style={{ filter: "var(--map-filter)" }}
              />
              {/* Venue chip sits above the embed */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between gap-4 p-4">
                <div className="glass-panel pointer-events-auto rounded-[var(--r-sm)] px-4 py-3">
                  <p className="t-meta !text-accent">{hours.openLabel}</p>
                  <p className="t-label mt-1.5 text-ink">{location.venueName}</p>
                  <p className="t-meta mt-1.5">{hours.summary}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Getting here */}
        <Reveal
          as="ul"
          variant="up"
          stagger={0.07}
          className="mt-10 grid gap-0 sm:grid-cols-3"
        >
          {location.notes.map((note) => (
            <li key={note.label} className="border-t border-line py-5 sm:pr-8">
              <p className="t-label text-ink">{note.label}</p>
              <p className="t-body mt-2 !text-[0.9rem]">{note.detail}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
