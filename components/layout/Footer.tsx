"use client";

import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { Logo } from "./Logo";

const footerNav = [
  { label: "Experiences", href: "#experiences" },
  { label: "Pricing", href: "#pricing" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Location", href: "#location" },
];

export function Footer() {
  const year = 2026;

  return (
    <footer className="relative border-t border-line bg-canvas-deep">
      <div className="shell pt-16 pb-9 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo className="text-ink" />
            <p className="t-display mt-7 max-w-[14ch] text-[clamp(1.75rem,4.5vw,2.75rem)] normal-case text-ink">
              {siteConfig.brand.tagline}
            </p>
            <p className="t-body mt-6 max-w-sm">{siteConfig.brand.description}</p>
          </div>

          {/* Navigation */}
          <nav className="lg:col-span-3" aria-label="Footer">
            <h2 className="t-meta">Navigate</h2>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-1">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link-u text-[0.95rem] text-ink-2 hover:text-ink">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#book" className="link-u text-[0.95rem] text-accent">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="t-meta">Visit</h2>
            <address className="mt-6 not-italic">
              <p className="text-[0.95rem] text-ink">{siteConfig.location.city}</p>
              <p className="t-body mt-1 !text-[0.9rem]">{siteConfig.location.line1}</p>
              <p className="t-body !text-[0.9rem]">{siteConfig.location.line2}</p>
              <p className="mt-4">
                <a href={siteConfig.contact.phoneHref} className="link-u text-[0.95rem] text-ink-2 hover:text-ink">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </p>
              <p className="mt-1.5">
                <a href={siteConfig.contact.emailHref} className="link-u text-[0.95rem] text-ink-2 hover:text-ink">
                  {siteConfig.contact.email}
                </a>
              </p>
            </address>
          </div>

          {/* Social */}
          <div className="lg:col-span-2">
            <h2 className="t-meta">Follow</h2>
            <ul className="mt-6 grid gap-3">
              {siteConfig.social.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-3"
                  >
                    <span className="link-u text-[0.95rem] text-ink-2 group-hover:text-ink">
                      {social.label}
                    </span>
                    <span className="t-meta !text-[0.6rem]">{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Baseline */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line pt-7">
          <p className="t-meta">
            © {year} {siteConfig.brand.name}. All rights reserved.
          </p>
          <p className="t-meta max-w-[46ch] leading-[1.5]">
            Demonstration site. Business details, imagery and bookings are illustrative.
          </p>
          <a
            href="#top"
            className="group flex items-center gap-2.5 text-ink-2 transition-colors hover:text-ink"
          >
            <span className="t-meta group-hover:text-ink">Back to top</span>
            <span className="grid size-9 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-accent">
              <ArrowUp
                size={14}
                strokeWidth={1.5}
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:-translate-y-0.5"
              />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
