import { m } from "framer-motion";
import { Reveal } from "@/components/motion";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { EASE, fadeUp, staggerInView } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Half-yearly",
    months: 6,
    summary:
      "A six-month service rhythm for a purifier you already use. Tell us the model and we’ll note your interest while pricing is finalized.",
    message: "Hi, I'm interested in the Half-yearly AMC plan",
    featured: false,
  },
  {
    name: "Yearly",
    months: 12,
    summary:
      "One plan that covers the year ahead. Message us with your purifier and we’ll follow up on WhatsApp once the price is set.",
    message: "Hi, I'm interested in the Yearly AMC plan",
    featured: true,
  },
] as const;

export function Amc() {
  return (
    <section id="amc" className="bg-pearl">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
        <Reveal className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-brand-deep uppercase">
              <span className="h-px w-10 bg-brand-deep/60" aria-hidden="true" />
              Service
            </p>
            <h2 className="mt-6 flex flex-wrap items-center gap-4 text-4xl leading-[1.05] tracking-[-0.03em] text-navy sm:text-5xl lg:text-[3.5rem]">
              AMC plans
              <span className="relative inline-flex items-center gap-1.5 rounded-full bg-navy px-3.5 py-1.5 font-sans text-xs font-semibold tracking-[0.18em] text-brand uppercase">
                <span className="relative flex size-1.5" aria-hidden="true">
                  <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-70" />
                  <span className="relative size-1.5 rounded-full bg-brand" />
                </span>
                New
              </span>
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-muted lg:pb-2">
            Annual maintenance for Auliv purifiers is new. Prices are not listed yet — ask on WhatsApp and
            we’ll take it from there.
          </p>
        </Reveal>

        <m.div {...staggerInView(0.15)} className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2">
          {PLANS.map((plan) => (
            <m.article
              key={plan.name}
              variants={fadeUp}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-[2rem] p-7 ring-1 transition-shadow duration-500 md:p-10",
                plan.featured
                  ? "bg-navy text-white ring-navy shadow-[0_50px_100px_-50px_rgba(7,28,44,0.9)]"
                  : "bg-white text-navy ring-platinum/70 shadow-[0_30px_60px_-45px_rgba(7,28,44,0.4)] hover:shadow-[0_40px_80px_-45px_rgba(7,28,44,0.5)]",
              )}
            >
              {plan.featured && (
                <>
                  <div
                    className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-brand/20 blur-3xl transition-transform duration-1000 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(60%_60%_at_80%_20%,black,transparent)]"
                    aria-hidden="true"
                  />
                </>
              )}

              <div className="relative flex items-start justify-between gap-6">
                <div>
                  <p
                    className={cn(
                      "text-xs font-semibold tracking-[0.24em] uppercase",
                      plan.featured ? "text-brand" : "text-brand-deep",
                    )}
                  >
                    {plan.featured ? "Full year" : "Six months"}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">{plan.name}</h3>
                </div>
                <CycleDial months={plan.months} featured={plan.featured} />
              </div>

              <p
                className={cn(
                  "relative mt-6 max-w-md text-sm leading-relaxed md:text-base",
                  plan.featured ? "text-white/65" : "text-muted",
                )}
              >
                {plan.summary}
              </p>

              <div
                className={cn(
                  "relative mt-auto flex flex-col gap-6 border-t pt-7 sm:flex-row sm:items-end sm:justify-between",
                  plan.featured ? "mt-10 border-white/10" : "mt-10 border-platinum/70",
                )}
              >
                <div>
                  <p
                    className={cn(
                      "text-xs font-semibold tracking-[0.24em] uppercase",
                      plan.featured ? "text-white/50" : "text-muted/80",
                    )}
                  >
                    Price
                  </p>
                  <p
                    className={cn(
                      "mt-1.5 bg-[length:200%_100%] motion-safe:animate-[shimmer_3.5s_linear_infinite] bg-clip-text font-display text-2xl font-semibold tracking-tight text-transparent",
                      plan.featured
                        ? "bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_40%,#43d9e8_50%,#ffffff_60%,#ffffff_100%)]"
                        : "bg-[linear-gradient(90deg,#071c2c_0%,#071c2c_40%,#0e7e8c_50%,#071c2c_60%,#071c2c_100%)]",
                    )}
                  >
                    Coming soon
                  </p>
                </div>
                <WhatsAppLink
                  message={plan.message}
                  variant={plan.featured ? "accent" : "default"}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Ask about AMC
                </WhatsAppLink>
              </div>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}

/** A ring that fills to the share of the year the plan runs for, with the month count in the middle. */
function CycleDial({ months, featured }: { months: number; featured: boolean }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const share = months / 12;

  return (
    <div className="relative size-24 shrink-0 md:size-28" aria-label={`${months}-month plan`} role="img">
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="6"
          className={featured ? "stroke-white/10" : "stroke-platinum/60"}
        />
        <m.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          className={featured ? "stroke-brand" : "stroke-brand-deep"}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference * (1 - share) }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl leading-none font-semibold tabular-nums md:text-3xl">{months}</span>
        <span className={cn("mt-1 text-[0.65rem] tracking-[0.18em] uppercase", featured ? "text-white/55" : "text-muted")}>
          months
        </span>
      </span>
    </div>
  );
}
