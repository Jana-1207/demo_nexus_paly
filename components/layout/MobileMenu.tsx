"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { gsap, motionFactor, useIsoLayoutEffect } from "@/lib/motion";
import { siteConfig } from "@/lib/site.config";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { useBooking } from "@/components/providers/BookingProvider";
import { Logo } from "./Logo";

/** Full-screen overlay navigation with a staggered, masked link reveal. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const { lock } = useSmoothScroll();
  const booking = useBooking();
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const f = motionFactor();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "expo.out" },
        onReverseComplete: () => gsap.set(root, { autoAlpha: 0 }),
      });

      tl.set(root, { autoAlpha: 1 })
        .fromTo(
          ".mm-sheet",
          { clipPath: f > 0 ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: f === 0 ? 0.2 : 0.72 }
        )
        .fromTo(
          ".mm-line > span",
          { yPercent: f > 0 ? 110 : 0, opacity: f > 0 ? 1 : 0 },
          { yPercent: 0, opacity: 1, duration: f === 0 ? 0.2 : 0.78, stagger: 0.055 },
          f === 0 ? 0 : 0.18
        )
        .fromTo(
          ".mm-foot",
          { opacity: 0, y: 14 * f },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        );

      tlRef.current = tl;
    }, root);

    gsap.set(root, { autoAlpha: 0 });
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
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={rootRef}
      id="mobile-menu"
      className="fixed inset-0 z-[120] lg:hidden"
      style={{ visibility: "hidden" }}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div className="mm-sheet absolute inset-0 bg-canvas-deep">
        <div className="wash-accent absolute inset-0" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between px-[var(--gutter)] pt-6">
            <Logo className="text-ink" />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="btn btn-quiet btn-sm !min-h-11 !px-3"
              aria-label="Close navigation"
            >
              <X size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-[var(--gutter)]">
            <ul className="flex flex-col gap-1">
              {siteConfig.nav.map((item, i) => (
                <li key={item.href} className="mm-line block overflow-hidden">
                  <span className="block">
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="flex items-baseline gap-4 py-1.5"
                    >
                      <span className="t-meta w-6 shrink-0 text-ink-3">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="t-display text-[clamp(2.1rem,11vw,3.5rem)] text-ink">
                        {item.label}
                      </span>
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mm-foot px-[var(--gutter)] pb-[max(1.75rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={() => {
                onClose();
                booking.open();
              }}
            >
              Book Now
            </button>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <a href={siteConfig.contact.phoneHref} className="t-body !text-ink">
                {siteConfig.contact.phoneDisplay}
              </a>
              <span className="t-meta">{siteConfig.hours.summary}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
