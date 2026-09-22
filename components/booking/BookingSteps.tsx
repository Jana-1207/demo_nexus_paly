"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { experiences } from "@/data/experiences";
import {
  buildDays,
  buildSlots,
  formatLongDate,
  PLAYER_RANGE,
  validateDetails,
  type BookingDraft,
} from "./booking-utils";
import { formatPrice, photo, cn } from "@/lib/utils";

type StepProps = {
  draft: BookingDraft;
  update: (patch: Partial<BookingDraft>) => void;
  showErrors: boolean;
};

/* ---------------------------------------------------------------- Step 1 */

export function StepExperience({ draft, update }: StepProps) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {experiences.map((experience) => {
        const active = draft.experienceId === experience.id;
        return (
          <li key={experience.id}>
            <button
              type="button"
              onClick={() => update({ experienceId: experience.id })}
              aria-pressed={active}
              className={cn(
                "group flex w-full items-center gap-3.5 rounded-[var(--r-sm)] border p-2.5 text-left transition-colors duration-300",
                active
                  ? "border-accent bg-accent-soft"
                  : "border-line hover:border-line-strong hover:bg-surface-2/50"
              )}
            >
              <span className="media relative size-14 shrink-0 overflow-hidden rounded-[var(--r-xs)]">
                <Image
                  src={photo(experience.image, 160, 60)}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="t-label block text-[0.76rem] text-ink">
                  {experience.title}
                </span>
                <span className="t-meta mt-1.5 block !text-[0.58rem]">
                  {experience.duration}
                </span>
              </span>
              <span className="t-num shrink-0 text-[0.95rem] text-ink">
                {formatPrice(experience.priceFrom)}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------------------------------------------------------------- Step 2 */

export function StepDate({ draft, update }: StepProps) {
  const days = buildDays(14);
  return (
    <div>
      <ul className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {days.map((day) => {
          const active = draft.date === day.value;
          return (
            <li key={day.value}>
              <button
                type="button"
                onClick={() => update({ date: day.value, time: "" })}
                aria-pressed={active}
                aria-label={formatLongDate(day.value)}
                className={cn(
                  "w-full rounded-[var(--r-sm)] border py-3 text-center transition-colors duration-300",
                  active
                    ? "border-accent bg-accent-soft"
                    : "border-line hover:border-line-strong"
                )}
              >
                <span className="t-meta block !text-[0.56rem]">{day.weekday}</span>
                <span className="t-num mt-1.5 block text-[1.1rem] text-ink">
                  {day.day}
                </span>
                <span className="t-meta mt-1 block !text-[0.54rem]">
                  {day.isToday ? "Today" : day.month}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {draft.date && (
        <p className="t-meta mt-5">Selected · {formatLongDate(draft.date)}</p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- Step 3 */

export function StepTime({ draft, update }: StepProps) {
  const slots = buildSlots(draft.date);
  const open = slots.filter((s) => !s.disabled).length;

  return (
    <div>
      <p className="t-meta">
        {formatLongDate(draft.date)} · {open} slots available
      </p>
      <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
        {slots.map((slot) => {
          const active = draft.time === slot.value;
          return (
            <li key={slot.value}>
              <button
                type="button"
                disabled={slot.disabled}
                onClick={() => update({ time: slot.value })}
                aria-pressed={active}
                className={cn(
                  "t-num w-full rounded-[var(--r-sm)] border py-2.5 text-[0.85rem] transition-colors duration-300",
                  active
                    ? "border-accent bg-accent-soft text-ink"
                    : "border-line text-ink-2 hover:border-line-strong hover:text-ink",
                  slot.disabled &&
                    "cursor-not-allowed border-line/60 text-ink-3 line-through hover:border-line/60 hover:text-ink-3"
                )}
              >
                {slot.value}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------------- Step 4 */

export function StepPlayers({ draft, update }: StepProps) {
  const experience = experiences.find((e) => e.id === draft.experienceId);
  const clamp = (n: number) =>
    Math.min(PLAYER_RANGE.max, Math.max(PLAYER_RANGE.min, n));

  return (
    <div>
      <div className="flex items-center justify-between gap-6 rounded-[var(--r-sm)] border border-line p-5">
        <div>
          <p className="t-label text-ink">Players</p>
          <p className="t-meta mt-2">
            {experience ? experience.players : `${PLAYER_RANGE.min}–${PLAYER_RANGE.max} players`}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => update({ players: clamp(draft.players - 1) })}
            disabled={draft.players <= PLAYER_RANGE.min}
            className="grid size-11 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-accent disabled:opacity-35"
            aria-label="One fewer player"
          >
            <Minus size={16} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <span
            className="t-num w-10 text-center text-[1.9rem] text-ink"
            aria-live="polite"
          >
            {draft.players}
          </span>
          <button
            type="button"
            onClick={() => update({ players: clamp(draft.players + 1) })}
            disabled={draft.players >= PLAYER_RANGE.max}
            className="grid size-11 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-accent disabled:opacity-35"
            aria-label="One more player"
          >
            <Plus size={16} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>

      {experience && (
        <p className="t-body mt-5 !text-[0.9rem]">
          {formatPrice(experience.priceFrom)} per player ·{" "}
          <span className="text-ink">
            {formatPrice(experience.priceFrom * draft.players)} total
          </span>
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- Step 5 */

const fieldClass =
  "w-full rounded-[var(--r-sm)] border border-line bg-surface-2/40 px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors duration-300 placeholder:text-ink-3 focus:border-accent";

export function StepDetails({ draft, update, showErrors }: StepProps) {
  const errors = validateDetails(draft);

  return (
    <div className="grid gap-4">
      <Field
        id="booking-name"
        label="Full name"
        error={showErrors ? errors.name : undefined}
      >
        <input
          id="booking-name"
          type="text"
          autoComplete="name"
          value={draft.name}
          placeholder="Arun Kumar"
          onChange={(e) => update({ name: e.target.value })}
          className={fieldClass}
          aria-invalid={showErrors && Boolean(errors.name)}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="booking-phone"
          label="Phone"
          error={showErrors ? errors.phone : undefined}
        >
          <input
            id="booking-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={draft.phone}
            placeholder="98400 22110"
            onChange={(e) => update({ phone: e.target.value })}
            className={fieldClass}
            aria-invalid={showErrors && Boolean(errors.phone)}
          />
        </Field>

        <Field
          id="booking-email"
          label="Email"
          error={showErrors ? errors.email : undefined}
        >
          <input
            id="booking-email"
            type="email"
            autoComplete="email"
            value={draft.email}
            placeholder="you@example.com"
            onChange={(e) => update({ email: e.target.value })}
            className={fieldClass}
            aria-invalid={showErrors && Boolean(errors.email)}
          />
        </Field>
      </div>

      <p className="t-meta mt-1 leading-[1.6] normal-case tracking-[0.06em]">
        Demonstration only — nothing is sent anywhere and no account is created.
      </p>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="t-meta block">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p className="t-meta mt-2 !text-[0.6rem] normal-case tracking-[0.06em] !text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- Step 6 */

export function StepReview({ draft }: StepProps) {
  const experience = experiences.find((e) => e.id === draft.experienceId);
  const unit = experience?.priceFrom ?? 0;
  const total = unit * draft.players;

  const rows = [
    { label: "Experience", value: experience?.title ?? "—" },
    { label: "Date", value: formatLongDate(draft.date) },
    { label: "Time", value: draft.time },
    { label: "Players", value: `${draft.players} ${draft.players === 1 ? "player" : "players"}` },
    { label: "Name", value: draft.name },
    { label: "Phone", value: draft.phone },
    { label: "Email", value: draft.email },
  ];

  return (
    <div>
      <dl className="grid gap-0">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line py-3.5"
          >
            <dt className="t-meta">{row.label}</dt>
            <dd className="text-[0.95rem] text-ink">{row.value || "—"}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex items-end justify-between gap-6 border-t border-line pt-5">
        <div>
          <p className="t-meta">Total</p>
          <p className="t-meta mt-1.5 !text-[0.58rem]">
            {formatPrice(unit)} × {draft.players}
          </p>
        </div>
        <p className="t-num text-[2rem] leading-none text-ink">{formatPrice(total)}</p>
      </div>
    </div>
  );
}
