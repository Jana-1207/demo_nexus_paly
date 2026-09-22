"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X, History } from "lucide-react";
import { experiences } from "@/data/experiences";
import {
  useBooking,
  makeBookingId,
  type DemoBooking,
} from "@/components/providers/BookingProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { gsap, motionFactor, useIsoLayoutEffect } from "@/lib/motion";
import {
  canAdvance,
  emptyDraft,
  STEPS,
  validateDetails,
  type BookingDraft,
} from "./booking-utils";
import {
  StepDate,
  StepDetails,
  StepExperience,
  StepPlayers,
  StepReview,
  StepTime,
} from "./BookingSteps";
import { BookingConfirmation } from "./BookingConfirmation";
import { cn } from "@/lib/utils";

const STEP_HINT: Record<number, string> = {
  1: "Which zone are you playing?",
  2: "Pick a day in the next two weeks.",
  3: "Choose a start time.",
  4: "How many of you are coming?",
  5: "Where should we send the confirmation?",
  6: "Check everything over before confirming.",
};

export function BookingModal() {
  const { isOpen, close, preselected, lastBooking, saveBooking } = useBooking();
  const { lock } = useSmoothScroll();

  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<BookingDraft>(emptyDraft);
  const [showErrors, setShowErrors] = useState(false);
  const [confirmed, setConfirmed] = useState<DemoBooking | null>(null);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const update = useCallback(
    (patch: Partial<BookingDraft>) => setDraft((prev) => ({ ...prev, ...patch })),
    []
  );

  // Open: mount the flow, seed the pre-selected experience, lock the page.
  useEffect(() => {
    if (!isOpen) return;
    setMounted(true);
    setConfirmed(null);
    setShowErrors(false);
    setDraft((prev) => ({
      ...emptyDraft,
      ...prev,
      experienceId: preselected ?? prev.experienceId,
    }));
    setStep(preselected ? 2 : 1);
  }, [isOpen, preselected]);

  useEffect(() => {
    lock(isOpen);
    return () => {
      if (isOpen) lock(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Enter / exit transition
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    if (!root || !panel) return;
    const f = motionFactor();

    if (isOpen) {
      gsap.set(root, { autoAlpha: 1 });
      gsap.fromTo(
        root.querySelector(".bm-scrim"),
        { opacity: 0 },
        { opacity: 1, duration: f === 0 ? 0.15 : 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        panel,
        { opacity: 0, y: 26 * f, scale: f > 0 ? 0.985 : 1 },
        { opacity: 1, y: 0, scale: 1, duration: f === 0 ? 0.2 : 0.68, ease: "expo.out" }
      );
    } else if (mounted) {
      gsap.to(root, { autoAlpha: 0, duration: f === 0 ? 0.12 : 0.3, ease: "power2.in" });
    }
  }, [isOpen, mounted]);

  // Step change: cross-fade the body
  useIsoLayoutEffect(() => {
    if (!isOpen || !bodyRef.current || confirmed) return;
    const f = motionFactor();
    gsap.fromTo(
      bodyRef.current,
      { opacity: 0, x: f > 0 ? 18 : 0 },
      { opacity: 1, x: 0, duration: f === 0 ? 0.15 : 0.45, ease: "power3.out" }
    );
  }, [step, isOpen, confirmed]);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const experience = useMemo(
    () => experiences.find((e) => e.id === draft.experienceId),
    [draft.experienceId]
  );

  const next = () => {
    if (step === 5 && Object.keys(validateDetails(draft)).length > 0) {
      setShowErrors(true);
      return;
    }
    if (!canAdvance(step, draft)) return;
    setShowErrors(false);
    setStep((s) => Math.min(STEPS.length, s + 1));
  };

  const back = () => {
    setShowErrors(false);
    setStep((s) => Math.max(1, s - 1));
  };

  const confirm = () => {
    if (!experience) return;
    const booking: DemoBooking = {
      id: makeBookingId(),
      experienceId: experience.id,
      experienceTitle: experience.title,
      date: draft.date,
      time: draft.time,
      players: draft.players,
      name: draft.name.trim(),
      phone: draft.phone.trim(),
      email: draft.email.trim(),
      unitPrice: experience.priceFrom,
      total: experience.priceFrom * draft.players,
      createdAt: new Date().toISOString(),
    };
    saveBooking(booking);
    setConfirmed(booking);
  };

  const restart = () => {
    setDraft(emptyDraft);
    setStep(1);
    setConfirmed(null);
    setShowErrors(false);
  };

  const stepProps = { draft, update, showErrors };

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[140]"
      style={{ visibility: "hidden" }}
      role="dialog"
      aria-modal="true"
      aria-label="Book a session"
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className="bm-scrim absolute inset-0 w-full cursor-default"
        style={{ background: "var(--overlay)", backdropFilter: "blur(12px)" }}
        onClick={close}
        tabIndex={-1}
        aria-label="Close booking"
      />

      <div className="relative flex h-full items-end justify-center p-0 sm:items-center sm:p-[var(--gutter)]">
        <div
          ref={panelRef}
          className={cn(
            "glass-panel flex max-h-[94svh] w-full flex-col overflow-hidden sm:max-h-[88svh] sm:max-w-3xl",
            "rounded-t-[var(--r-lg)] sm:rounded-[var(--r-md)]"
          )}
        >
          {!mounted ? null : confirmed ? (
            <div className="overflow-y-auto">
              <div className="flex justify-end p-4 pb-0">
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  className="grid size-9 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
                  aria-label="Close booking"
                >
                  <X size={16} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>
              <BookingConfirmation
                booking={confirmed}
                onDone={close}
                onRestart={restart}
              />
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-start justify-between gap-5 border-b border-line px-5 py-4 sm:px-7 sm:py-5">
                <div className="min-w-0">
                  <p className="t-meta !text-accent">
                    Step {step} of {STEPS.length}
                  </p>
                  <h2 className="t-title mt-2 text-[1.1rem] text-ink sm:text-[1.3rem]">
                    {STEPS[step - 1].label}
                  </h2>
                  <p className="t-meta mt-2 !text-[0.58rem] normal-case tracking-[0.06em]">
                    {STEP_HINT[step]}
                  </p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
                  aria-label="Close booking"
                >
                  <X size={16} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>

              {/* Progress */}
              <ol className="flex gap-1 px-5 pt-4 sm:px-7" aria-label="Booking progress">
                {STEPS.map((s) => (
                  <li key={s.id} className="flex-1">
                    <span className="sr-only">
                      {s.label}
                      {s.id === step ? " (current)" : s.id < step ? " (done)" : ""}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "block h-[3px] rounded-full transition-colors duration-500",
                        s.id <= step ? "bg-accent" : "bg-line"
                      )}
                    />
                  </li>
                ))}
              </ol>

              {/* Body */}
              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7">
                <div ref={bodyRef}>
                  {step === 1 && (
                    <>
                      <StepExperience {...stepProps} />
                      {lastBooking && (
                        <button
                          type="button"
                          onClick={() => setConfirmed(lastBooking)}
                          className="mt-5 flex w-full items-center gap-3 rounded-[var(--r-sm)] border border-line px-4 py-3 text-left transition-colors hover:border-line-strong"
                        >
                          <History
                            size={15}
                            strokeWidth={1.5}
                            className="shrink-0 text-accent"
                            aria-hidden="true"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="t-meta block">Your recent demo booking</span>
                            <span className="mt-1.5 block truncate text-[0.9rem] text-ink">
                              {lastBooking.id} · {lastBooking.experienceTitle}
                            </span>
                          </span>
                          <span className="t-meta shrink-0 !text-accent">View</span>
                        </button>
                      )}
                    </>
                  )}
                  {step === 2 && <StepDate {...stepProps} />}
                  {step === 3 && <StepTime {...stepProps} />}
                  {step === 4 && <StepPlayers {...stepProps} />}
                  {step === 5 && <StepDetails {...stepProps} />}
                  {step === 6 && <StepReview {...stepProps} />}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-7">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 1}
                  className="btn btn-quiet btn-sm"
                >
                  <ArrowLeft size={14} strokeWidth={1.75} aria-hidden="true" />
                  Back
                </button>

                <div className="flex items-center gap-4">
                  {experience && step > 1 && (
                    <p className="t-meta hidden sm:block">
                      {experience.title}
                      {draft.time ? ` · ${draft.time}` : ""}
                    </p>
                  )}
                  {step < STEPS.length ? (
                    <button
                      type="button"
                      onClick={next}
                      disabled={!canAdvance(step, draft) && step !== 5}
                      data-cursor="cta"
                      className="btn btn-primary btn-sm"
                    >
                      Continue
                      <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={confirm}
                      data-cursor="cta"
                      className="btn btn-primary btn-sm"
                    >
                      Confirm Booking
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
