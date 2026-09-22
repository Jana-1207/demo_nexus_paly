import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/lib/site.config";
import { DEFAULT_APPEARANCE, THEME_BOOT_SCRIPT } from "@/lib/theme.config";
import { AppearanceProvider } from "@/components/providers/AppearanceProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { BookingProvider } from "@/components/providers/BookingProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { AppearancePanel } from "@/components/appearance/AppearancePanel";
import { BookingModal } from "@/components/booking/BookingModal";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display-family",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body-family",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.meta.url),
  title: {
    default: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    template: `%s · ${siteConfig.brand.name}`,
  },
  description: siteConfig.brand.description,
  keywords: [
    "gaming centre Chennai",
    "VR arena",
    "sim racing",
    "esports arena",
    "escape room",
    "arcade",
  ],
  openGraph: {
    title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    description: siteConfig.brand.description,
    url: siteConfig.meta.url,
    siteName: siteConfig.brand.name,
    images: [{ url: siteConfig.meta.ogImage, width: 1200, height: 800 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: siteConfig.brand.name },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08080a" },
    { media: "(prefers-color-scheme: light)", color: "#f7f6f4" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_APPEARANCE.theme}
      data-accent={DEFAULT_APPEARANCE.accent}
      data-card={DEFAULT_APPEARANCE.card}
      data-motion={DEFAULT_APPEARANCE.motion}
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Applies the stored appearance before first paint — no theme flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body>
        <AppearanceProvider>
          <SmoothScrollProvider>
            <BookingProvider>
              <a className="skip-link" href="#main">
                Skip to content
              </a>
              <div className="grain" aria-hidden="true" />
              <Cursor />
              <Navbar />
              <main id="main">{children}</main>
              <Footer />
              <AppearancePanel />
              <BookingModal />
            </BookingProvider>
          </SmoothScrollProvider>
        </AppearanceProvider>
      </body>
    </html>
  );
}
