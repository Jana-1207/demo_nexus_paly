"use client";

import { useRef } from "react";
import { Check, CalendarClock, Users, Ticket } from "lucide-react";
import type { DemoBooking } from "@/components/providers/BookingProvider";
import { gsap, motionFactor, useIsoLayoutEffect } from "@/lib/motion";
import { formatLongDate } from "./booking-utils";
import { formatPrice } from "@/lib/utils";

export function BookingConfirmation({
  booking,
  onDone,
  onRestart,
}: {
  booking: DemoBooking;
  onDone: () => void;
  onRestart: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useIsoLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const f = motionFactor();
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(
          ".bc-mark",
          { scale: f > 0 ? 0.6 : 1, opacity: 0 },
          { scale: 1, opacity: 1, duration: f === 0 ? 0.2 : 0.7 }
        )
        .fromTo(
          ".bc-stagger",
          { opacity: 0, y: 16 * f },
          { opacity: 1, y: 0, duration: f === 0 ? 0.2 : 0.65, stagger: 0.07 },
          f === 0 ? 0 : 0.1
        );
    }, root);
    return () => ctx.revert();
  }, []);

  const facts = [
    { icon: Ticket, label: "Experience", value: booking.experienceTitle },
    {
      icon: CalendarClock,
      label: "Date & time",
      value: `${formatLongDate(booking.date)} · ${booking.time}`,
    },
    {
      icon: Users,
      label: "Players",
      value: `${booking.players} ${booking.players === 1 ? "player" : "players"}`,
    },
  ];

  return (
    <div ref={ref} className="px-6 pb-9 pt-6 text-center sm:px-10 sm:pb-11 sm:pt-8">
      <span
        className="bc-mark mx-auto grid size-14 place-items-center rounded-full border border-accent/50"
        style={{ background: "var(--accent-soft)" }}
        aria-hidden="true"
      >
        <Check size={22} strokeWidth={1.75} className="text-accent" />
      </span>

      <h2 className="bc-stagger t-display mt-6 text-[clamp(1.9rem,6vw,3rem)] text-ink">
        Booking Confirmed
      </h2>

      <p className="bc-stagger t-meta mt-4">Booking ID</p>
      <p className="bc-stagger t-num mt-2 text-[1.6rem] tracking-[0.04em] text-accent">
        {booking.id}
      </p>

      <dl className="bc-stagger mx-auto mt-8 grid max-w-md gap-0 text-left">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="flex items-center gap-4 border-t border-line py-4"
          >
            <fact.icon
              size={16}
              strokeWidth={1.5}
              className="shrink-0 text-accent"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <dt className="t-meta">{fact.label}</dt>
              <dd className="mt-1.5 text-[0.95rem] text-ink">{fact.value}</dd>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4 border-y border-line py-4">
          <dt className="t-meta">Total</dt>
          <dd className="t-num text-[1.2rem] text-ink">{formatPrice(booking.total)}</dd>
        </div>
      </dl>

      <p className="bc-stagger t-body mx-auto mt-6 max-w-md !text-[0.88rem]">
        This is a demonstration booking. It is saved in this browser only — no email
        has been sent and no payment was taken.
      </p>

      <div className="bc-stagger mt-7 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={onDone} className="btn btn-primary">
          Done
        </button>
        <button type="button" onClick={onRestart} className="btn btn-quiet">
          Book another
        </button>
      </div>
    </div>
  );
}
