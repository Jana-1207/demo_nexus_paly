"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/data/gallery";
import { gsap, motionFactor, useIsoLayoutEffect } from "@/lib/motion";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { photo } from "@/lib/utils";

type LightboxProps = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function Lightbox({ items, index, onClose, onIndexChange }: LightboxProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const figureRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const { lock } = useSmoothScroll();
  const open = index !== null;
  const item = open ? items[index] : null;

  const go = useCallback(
    (delta: number) => {
      if (index === null || !items.length) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items, onIndexChange]
  );

  // Open / close transition
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const f = motionFactor();

    if (open) {
      gsap.set(root, { autoAlpha: 1 });
      gsap.fromTo(
        root.querySelector(".lb-scrim"),
        { opacity: 0 },
        { opacity: 1, duration: f === 0 ? 0.15 : 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        root.querySelector(".lb-panel"),
        { opacity: 0, y: 20 * f, scale: f > 0 ? 0.985 : 1 },
        { opacity: 1, y: 0, scale: 1, duration: f === 0 ? 0.2 : 0.62, ease: "expo.out" }
      );
    } else {
      gsap.to(root, {
        autoAlpha: 0,
        duration: f === 0 ? 0.12 : 0.28,
        ease: "power2.in",
      });
    }
  }, [open]);

  // Cross-fade when moving between images
  useIsoLayoutEffect(() => {
    if (!open || !figureRef.current) return;
    const f = motionFactor();
    gsap.fromTo(
      figureRef.current,
      { opacity: 0, scale: f > 0 ? 1.015 : 1 },
      { opacity: 1, scale: 1, duration: f === 0 ? 0.15 : 0.45, ease: "power2.out" }
    );
  }, [index, open]);

  useEffect(() => {
    lock(open);
    return () => {
      if (open) lock(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab") {
        // Minimal focus trap across the three controls.
        const focusables = rootRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusables?.length) return;
        const list = Array.from(focusables);
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, go]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[150]"
      style={{ visibility: "hidden" }}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
      aria-hidden={!open}
    >
      <button
        type="button"
        className="lb-scrim absolute inset-0 w-full cursor-default"
        style={{ background: "var(--overlay)", backdropFilter: "blur(10px)" }}
        onClick={onClose}
        tabIndex={-1}
        aria-label="Close viewer"
      />

      <div className="lb-panel pointer-events-none relative flex h-full flex-col p-[var(--gutter)]">
        <div className="pointer-events-auto flex items-center justify-between">
          <p className="t-meta text-ink">
            {index !== null ? String(index + 1).padStart(2, "0") : "––"}
            <span className="text-ink-3"> / {String(items.length).padStart(2, "0")}</span>
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="btn btn-quiet btn-sm !min-h-11 !px-3"
            aria-label="Close viewer"
          >
            <X size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center gap-3 py-5 sm:gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            className="pointer-events-auto grid size-11 shrink-0 place-items-center rounded-full border border-line-strong bg-surface/70 text-ink backdrop-blur-md transition-colors hover:border-accent"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>

          <figure
            ref={figureRef}
            className="pointer-events-auto flex min-h-0 min-w-0 max-w-5xl flex-1 flex-col items-center"
          >
            <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
              {item && (
                <Image
                  key={item.id}
                  src={photo(item.src, 1600, 80)}
                  alt={item.alt}
                  width={1600}
                  height={1100}
                  sizes="(max-width: 768px) 92vw, 70vw"
                  className="max-h-full w-auto max-w-full rounded-[var(--r-sm)] object-contain"
                  priority
                />
              )}
            </div>
            {item && (
              <figcaption className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center">
                <span className="t-label text-ink">{item.caption}</span>
                <span className="t-meta !text-accent">{item.category}</span>
              </figcaption>
            )}
          </figure>

          <button
            type="button"
            onClick={() => go(1)}
            className="pointer-events-auto grid size-11 shrink-0 place-items-center rounded-full border border-line-strong bg-surface/70 text-ink backdrop-blur-md transition-colors hover:border-accent"
            aria-label="Next image"
          >
            <ChevronRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <p className="t-meta pointer-events-auto text-center">
          Esc to close · ← → to browse
        </p>
      </div>
    </div>
  );
}
