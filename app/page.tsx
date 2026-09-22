import { Hero } from "@/components/sections/Hero";
import { InfoStrip } from "@/components/sections/InfoStrip";
import { Experiences } from "@/components/sections/Experiences";
import { FeaturedExperience } from "@/components/sections/FeaturedExperience";
import { Stats } from "@/components/sections/Stats";
import { Pricing } from "@/components/sections/Pricing";
import { Events } from "@/components/sections/Events";
import { Gallery } from "@/components/sections/Gallery";
import { About } from "@/components/sections/About";
import { PrivateEvents } from "@/components/sections/PrivateEvents";
import { Reviews } from "@/components/sections/Reviews";
import { Location } from "@/components/sections/Location";
import { Faq } from "@/components/sections/Faq";
import { ContactCta } from "@/components/sections/ContactCta";
import { siteConfig } from "@/lib/site.config";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EntertainmentBusiness",
  name: siteConfig.brand.name,
  description: siteConfig.brand.description,
  slogan: siteConfig.brand.tagline,
  telephone: siteConfig.contact.phoneDisplay,
  email: siteConfig.contact.email,
  url: siteConfig.meta.url,
  image: siteConfig.meta.ogImage,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.location.line1,
    addressLocality: siteConfig.location.city,
    addressRegion: siteConfig.location.region,
    addressCountry: "IN",
  },
  openingHours: "Mo-Su 10:00-23:00",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "1240",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <InfoStrip />
      <Experiences />
      <FeaturedExperience />
      <Stats />
      <Pricing />
      <Events />
      <Gallery />
      <About />
      <PrivateEvents />
      <Reviews />
      <Location />
      <Faq />
      <ContactCta />
    </>
  );
}
