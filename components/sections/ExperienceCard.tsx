"use client";

import Image from "next/image";
import { ArrowUpRight, Clock, Users } from "lucide-react";
import type { Experience } from "@/data/experiences";
import { useBooking } from "@/components/providers/BookingProvider";
import { formatPrice, photo, cn } from "@/lib/utils";

export function ExperienceCard({
  experience,
  priority = false,
}: {
  experience: Experience;
  priority?: boolean;
}) {
  const booking = useBooking();

  return (
    <article
      className={cn(
        "exp-card group relative flex snap-start flex-col overflow-hidden",
        "w-[78vw] max-w-[420px] shrink-0 sm:w-[58vw] lg:w-[clamp(380px,30vw,450px)]",
        "h-[68svh] min-h-[430px] lg:h-[70svh] lg:min-h-[520px] lg:max-h-[680px]",
        "card card-hover rounded-[var(--r-sm)]"
      )}
    >
      {/* Media */}
      <div className="media media-zoom veil absolute inset-0" data-cursor="view">
        <Image
          src={photo(experience.image, 1000, 72)}
          alt={experience.alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 58vw, 450px"
          className="object-cover"
        />
      </div>

      {/* Top rail */}
      <div className="relative flex items-start justify-between p-5">
        <span className="t-meta !text-[0.7rem] !text-white/65">
          {experience.index}
        </span>
        <span className="t-meta max-w-[62%] text-right !text-[0.62rem] !text-white/65">
          {experience.category}
        </span>
      </div>

      {/* Content */}
      <div className="relative mt-auto flex flex-col gap-4 p-5 sm:p-6">
        <span
          aria-hidden="true"
          className="h-px w-10 origin-left bg-accent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-[3.4]"
        />

        <h3 className="t-title text-[clamp(1.5rem,4.2vw,2.15rem)] uppercase tracking-[-0.03em] text-white">
          {experience.title}
        </h3>

        <p className="t-body max-w-[34ch] text-white/72">{experience.blurb}</p>

        {/* Detail that rewards a closer look, without shifting the card */}
        <ul className="acc-panel" data-open="false" aria-hidden="true">
          <div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {experience.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="t-meta rounded-full border border-white/20 px-2.5 py-1.5 !text-[0.58rem] !text-white/75"
                >
                  {highlight}
                </li>
              ))}
            </div>
          </div>
        </ul>

        <dl className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
          <div className="flex items-center gap-2">
            <Clock size={13} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
            <dt className="sr-only">Duration</dt>
            <dd className="t-meta !text-white/70">{experience.duration}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Users size={13} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
            <dt className="sr-only">Players</dt>
            <dd className="t-meta !text-white/70">{experience.players}</dd>
          </div>
        </dl>

        <div className="flex items-end justify-between gap-4 border-t border-white/15 pt-4">
          <div>
            <p className="t-meta !text-white/55">From</p>
            <p className="t-num mt-1.5 text-[1.45rem] text-white">
              {formatPrice(experience.priceFrom)}
            </p>
          </div>

          <button
            type="button"
            data-cursor="cta"
            onClick={() => booking.open(experience.id)}
            className={cn(
              "btn btn-sm !min-h-10 border border-white/25 bg-white/10 text-white backdrop-blur-md",
              "transition-[background-color,border-color,transform] duration-500",
              "hover:border-white hover:bg-white hover:!text-[var(--bg)]"
            )}
          >
            Book
            <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
