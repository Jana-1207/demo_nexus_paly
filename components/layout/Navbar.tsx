"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { gsap, motionFactor, useIsoLayoutEffect } from "@/lib/motion";
import { useBooking } from "@/components/providers/BookingProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

const SECTION_IDS = siteConfig.nav
  .map((n) => n.href)
  .filter((h) => h !== "#top")
  .map((h) => h.slice(1));

export function Navbar() {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("top");
  const barRef = useRef<HTMLElement | null>(null);

  // Transparent over the hero, glass once the page has moved.
  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Current section, for the nav indicator.
  useEffect(() => {
    const targets = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
        else if (window.scrollY < 120) setActive("top");
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  // Entrance: the bar arrives after the hero type has begun.
  useIsoLayoutEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const f = motionFactor();
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: f > 0 ? -28 : 0,
        opacity: 0,
        duration: f === 0 ? 0.35 : 0.9,
        delay: f === 0 ? 0 : 0.15,
        ease: "power3.out",
        // A lingering transform here becomes a backdrop root and kills the
        // glass blur on the bar below it.
        clearProps: "transform,opacity",
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <header
        ref={barRef}
        data-condensed={condensed}
        className="fixed inset-x-0 top-0 z-[100]"
      >
        <div
          className={cn(
            "transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500",
            condensed
              ? "glass border-x-0 border-t-0"
              : "border-b border-transparent bg-transparent"
          )}
        >
          <div
            className={cn(
              "shell flex items-center justify-between gap-6 transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              condensed ? "h-[62px]" : "h-[84px]"
            )}
          >
            <a
              href="#top"
              aria-label={`${siteConfig.brand.name} — home`}
              className="relative z-10"
            >
              <Logo className="text-ink" />
            </a>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {siteConfig.nav.map((item) => {
                  const id = item.href.slice(1);
                  const isActive = active === id;
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "relative block px-3.5 py-2 text-[0.78rem] tracking-[0.1em] uppercase transition-colors duration-300",
                          "font-[family-name:var(--font-display-family)]",
                          isActive ? "text-ink" : "text-ink-2 hover:text-ink"
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute inset-x-3.5 -bottom-px h-px origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            isActive ? "scale-x-100" : "scale-x-0"
                          )}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <span className="hidden xl:flex items-center gap-2 pr-2">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-accent"
                  style={{ boxShadow: "0 0 0 3px var(--accent-soft)" }}
                />
                <span className="t-meta">{siteConfig.hours.summary}</span>
              </span>

              <Magnetic strength={10}>
                <BookNowButton />
              </Magnetic>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="btn btn-quiet !min-h-11 !px-3 lg:hidden"
                aria-label="Open navigation"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <Menu size={18} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function BookNowButton() {
  const booking = useBooking();
  return (
    <button
      type="button"
      onClick={() => booking.open()}
      data-cursor="cta"
      className="btn btn-primary btn-sm !min-h-11 !px-3 sm:!px-4"
    >
      <span className="sm:hidden">Book</span>
      <span className="hidden sm:inline">Book Now</span>
    </button>
  );
}
