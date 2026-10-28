import { CalendarClock } from "lucide-react";
import { WaveDivider } from "@/components/WaveDivider";
import { WhatsAppLink } from "@/components/WhatsAppLink";

const PLANS = [
  {
    name: "Half-yearly",
    summary:
      "A six-month service rhythm for a purifier you already use. Tell us the model and we’ll note your interest while pricing is finalized.",
    message: "Hi, I'm interested in the Half-yearly AMC plan",
  },
  {
    name: "Yearly",
    summary:
      "One plan that covers the year ahead. Message us with your purifier and we’ll follow up on WhatsApp once the price is set.",
    message: "Hi, I'm interested in the Yearly AMC plan",
  },
] as const;

export function Amc() {
  return (
    <section id="amc" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.14em] text-brand-deep uppercase">Service</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">AMC plans</h2>
            <span className="rounded-full bg-brand px-3 py-1 text-sm font-semibold text-navy">New</span>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Annual maintenance for Auliv purifiers is new. Prices are not listed yet — ask on
            WhatsApp and we’ll take it from there.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className="flex flex-col rounded-3xl bg-mist p-6 ring-1 ring-navy/5 md:p-8"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-brand-deep ring-1 ring-navy/5">
                <CalendarClock className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-navy">{plan.name}</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted">{plan.summary}</p>
              <p className="mt-6 text-sm font-medium tracking-wide text-muted uppercase">Price</p>
              <p className="text-3xl font-semibold text-navy">Coming soon</p>
              <WhatsAppLink message={plan.message} className="mt-6 w-full sm:w-fit">
                Ask about AMC
              </WhatsAppLink>
            </article>
          ))}
        </div>
      </div>
      <WaveDivider fillClass="fill-mist" />
    </section>
  );
}
