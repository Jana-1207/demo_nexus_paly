"use client";

import { Check } from "lucide-react";
import { plans, pricingNote } from "@/data/pricing";
import { useBooking } from "@/components/providers/BookingProvider";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { formatPrice, cn } from "@/lib/utils";

export function Pricing() {
  const booking = useBooking();

  return (
    <section id="pricing" className="section" aria-labelledby="pricing-title">
      <div className="shell">
        <SectionHead
          id="pricing-title"
          index="03"
          eyebrow="Passes & pricing"
          titleLines={["Pick Your", "Pass"]}
          body={pricingNote}
        />

        <Reveal
          as="ul"
          variant="up"
          stagger={0.08}
          className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5"
        >
          {plans.map((plan) => (
            <li key={plan.id} className="flex">
              <article
                className={cn(
                  "card card-hover relative flex w-full flex-col p-6 md:p-7",
                  plan.featured && "border-accent/45"
                )}
              >
                {plan.featured && (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px bg-accent"
                    />
                    <span className="t-meta absolute right-6 top-6 !text-accent">
                      Most booked
                    </span>
                  </>
                )}

                <h3 className="t-label text-ink-2">{plan.name}</h3>

                <p className="mt-6 flex items-baseline gap-2">
                  <span className="t-num text-[clamp(2.2rem,5vw,2.9rem)] leading-none text-ink">
                    {formatPrice(plan.price)}
                  </span>
                </p>
                <p className="t-meta mt-3">{plan.unit}</p>

                <p className="mt-5 border-t border-line pt-5 text-[0.95rem] text-ink">
                  {plan.summary}
                </p>

                <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                  {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5">
                      <Check
                        size={14}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-accent"
                      />
                      <span className="t-body !text-[0.9rem]">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  data-cursor="cta"
                  onClick={() => booking.open()}
                  className={cn(
                    "btn mt-8 w-full",
                    plan.featured ? "btn-primary" : "btn-quiet"
                  )}
                >
                  {plan.featured ? plan.cta : "Select"}
                  <span className="sr-only"> — {plan.name}</span>
                </button>
              </article>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
