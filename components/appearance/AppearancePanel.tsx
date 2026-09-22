"use client";

import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, X, RotateCcw, Check } from "lucide-react";
import {
  ACCENTS,
  CARD_STYLES,
  MOTION_LEVELS,
  THEMES,
  type Appearance,
} from "@/lib/theme.config";
import { useAppearance } from "@/components/providers/AppearanceProvider";
import { gsap, motionFactor, useIsoLayoutEffect } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function AppearancePanel() {
  const { appearance, ready, set, reset } = useAppearance();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useIsoLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const f = motionFactor();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        onReverseComplete: () => gsap.set(panel, { autoAlpha: 0 }),
      });
      tl.set(panel, { autoAlpha: 1 })
        .fromTo(
          panel,
          { opacity: 0, y: 14 * f, scale: f > 0 ? 0.97 : 1 },
          { opacity: 1, y: 0, scale: 1, duration: f === 0 ? 0.18 : 0.44, ease: "expo.out" }
        )
        .fromTo(
          panel.querySelectorAll("[data-ap-group]"),
          { opacity: 0, y: 10 * f },
          { opacity: 1, y: 0, duration: f === 0 ? 0.15 : 0.4, stagger: 0.05, ease: "power3.out" },
          f === 0 ? 0 : 0.06
        );
      tlRef.current = tl;
    }, panel);

    gsap.set(panel, { autoAlpha: 0 });
    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) tl.play();
    else tl.reverse();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    // Centred with flex rather than a translate: a transform here would become
    // a backdrop root and silently disable the panel's frosted blur.
    <div
      ref={wrapRef}
      className="pointer-events-none fixed inset-y-0 right-0 z-[110] flex items-center"
    >
      {/* Panel */}
      <div
        ref={panelRef}
        id="appearance-panel"
        role="dialog"
        aria-label="Appearance settings"
        aria-hidden={!open}
        style={{ visibility: "hidden" }}
        className={cn(
          "glass-panel pointer-events-auto ml-3 w-[min(21rem,calc(100vw-4.5rem))] origin-right overflow-hidden rounded-[var(--r-md)]",
          !open && "pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <p className="t-label text-ink">Appearance</p>
            <p className="t-meta mt-1.5 !text-[0.6rem]">Saved to this browser</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-8 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
            aria-label="Close appearance settings"
            tabIndex={open ? 0 : -1}
          >
            <X size={15} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[min(78svh,42rem)] overflow-y-auto px-5 py-5">
          {/* Theme */}
          <fieldset data-ap-group className="border-0 p-0">
            <legend className="t-meta">Theme</legend>
            <div className="mt-3 grid gap-1">
              {THEMES.map((theme) => {
                const active = ready && appearance.theme === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    tabIndex={open ? 0 : -1}
                    onClick={() => set("theme", theme.id)}
                    aria-pressed={active}
                    className={cn(
                      "flex items-center gap-3 rounded-[var(--r-sm)] border px-2.5 py-2 text-left transition-colors duration-300",
                      active
                        ? "border-accent/50 bg-accent-soft"
                        : "border-transparent hover:border-line hover:bg-surface-2/60"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-7 shrink-0 overflow-hidden rounded-full border border-line-strong"
                    >
                      {theme.swatch.map((c) => (
                        <span key={c} className="h-full flex-1" style={{ background: c }} />
                      ))}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="t-label block text-[0.72rem] text-ink">
                        {theme.label}
                      </span>
                      <span className="t-meta mt-1 block truncate !text-[0.58rem] normal-case tracking-[0.06em]">
                        {theme.note}
                      </span>
                    </span>
                    {active && (
                      <Check size={14} strokeWidth={2} className="shrink-0 text-accent" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Accent */}
          <fieldset data-ap-group className="mt-5 border-0 p-0">
            <legend className="t-meta">Accent</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {ACCENTS.map((accent) => {
                const active = ready && appearance.accent === accent.id;
                return (
                  <button
                    key={accent.id}
                    type="button"
                    tabIndex={open ? 0 : -1}
                    onClick={() => set("accent", accent.id)}
                    aria-pressed={active}
                    aria-label={accent.label}
                    title={accent.label}
                    className={cn(
                      "grid size-9 place-items-center rounded-full border transition-all duration-300",
                      active ? "border-accent" : "border-line hover:border-line-strong"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "block rounded-full transition-all duration-300",
                        active ? "size-3.5" : "size-4"
                      )}
                      style={{ background: accent.dot }}
                    />
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Card style */}
          <Segmented
            label="Surfaces"
            options={CARD_STYLES}
            value={appearance.card}
            ready={ready}
            open={open}
            onChange={(v) => set("card", v as Appearance["card"])}
          />

          {/* Motion */}
          <Segmented
            label="Motion"
            columns={3}
            options={MOTION_LEVELS}
            value={appearance.motion}
            ready={ready}
            open={open}
            onChange={(v) => set("motion", v as Appearance["motion"])}
          />
        </div>

        <div className="border-t border-line px-5 py-3.5">
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            onClick={reset}
            className="flex items-center gap-2 text-ink-2 transition-colors hover:text-ink"
          >
            <RotateCcw size={13} strokeWidth={1.5} aria-hidden="true" />
            <span className="t-meta">Reset to default</span>
          </button>
        </div>
      </div>

      {/* Edge tab — vertical, so it never sits on top of page content */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="appearance-panel"
        className="glass pointer-events-auto group flex min-h-11 flex-col items-center justify-center gap-3 rounded-l-[var(--r-md)] rounded-r-none border-r-0 px-2.5 py-3 transition-colors duration-300 hover:border-line-strong sm:min-h-[7.5rem] sm:py-4"
      >
        <SlidersHorizontal
          size={15}
          strokeWidth={1.6}
          aria-hidden="true"
          className="text-accent transition-transform duration-500 group-hover:rotate-90"
        />
        <span
          className="t-meta hidden text-[0.58rem] text-ink sm:inline"
          style={{ writingMode: "vertical-rl" }}
        >
          Appearance
        </span>
        <span className="sr-only">{open ? "Close" : "Open"} appearance settings</span>
      </button>
    </div>
  );
}

type SegmentedProps = {
  label: string;
  options: readonly { id: string; label: string; note: string }[];
  value: string;
  ready: boolean;
  open: boolean;
  columns?: 2 | 3;
  onChange: (value: string) => void;
};

function Segmented({ label, options, value, ready, open, columns = 2, onChange }: SegmentedProps) {
  const active = options.find((o) => o.id === value) ?? options[0];
  return (
    <fieldset data-ap-group className="mt-5 border-0 p-0">
      <legend className="t-meta">{label}</legend>
      <div className={cn("mt-3 grid gap-1", columns === 3 ? "grid-cols-3" : "grid-cols-2")}>
        {options.map((option) => {
          const isActive = ready && value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={() => onChange(option.id)}
              aria-pressed={isActive}
              className={cn(
                "rounded-[var(--r-sm)] border px-3 py-2.5 text-left transition-colors duration-300",
                isActive
                  ? "border-accent/50 bg-accent-soft text-ink"
                  : "border-line text-ink-2 hover:border-line-strong hover:text-ink"
              )}
            >
              <span className="t-label block text-[0.68rem]">{option.label}</span>
            </button>
          );
        })}
      </div>
      <p className="t-meta mt-2.5 !text-[0.58rem] normal-case tracking-[0.06em]">
        {ready ? active.note : options[0].note}
      </p>
    </fieldset>
  );
}
