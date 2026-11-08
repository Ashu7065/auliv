import { m } from "framer-motion";
import { ArrowUpRight, Building2, CalendarClock, House, MessageCircle, MousePointerClick, Wrench } from "lucide-react";
import { Reveal } from "@/components/motion";
import { EASE, fadeUp, staggerInView } from "@/lib/motion";

const SERVICES = [
  {
    icon: Wrench,
    title: "Free installation",
    text: "Every Auliv purifier is installed by our technician at no extra cost.",
    href: "/#residential",
  },
  {
    icon: House,
    title: "Doorstep servicing",
    text: "Filter changes and service visits at your home, Monday to Saturday.",
    href: "/#contact",
  },
  {
    icon: CalendarClock,
    title: "AMC plans",
    text: "Half-yearly and yearly maintenance plans for the purifier you already own.",
    href: "/#amc",
  },
  {
    icon: Building2,
    title: "Workplace purifiers",
    text: "Commercial RO and UV+UF purifiers for offices, clinics and schools.",
    href: "/#commercial",
  },
] as const;

const STEPS = [
  { icon: MousePointerClick, title: "Pick a purifier", text: "Browse home and commercial models with prices." },
  { icon: MessageCircle, title: "Chat on WhatsApp", text: "Tell us the model — we confirm details and timing." },
  { icon: Wrench, title: "We install it", text: "Our technician sets it up at your doorstep, free." },
] as const;

export function Services() {
  return (
    <section id="services" className="bg-pearl px-3 py-6 md:px-6 md:py-10">
      <div className="relative isolate mx-auto max-w-[90rem] overflow-hidden rounded-[2.5rem] bg-ocean md:rounded-[3.5rem]">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_0%,rgba(67,217,232,0.18),transparent_70%),radial-gradient(50%_60%_at_0%_100%,rgba(7,28,44,0.7),transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(70%_60%_at_60%_30%,black,transparent)]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <Reveal className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-brand uppercase">
                <span className="h-px w-10 bg-brand/60" aria-hidden="true" />
                What we do
              </p>
              <h2 className="mt-6 text-4xl leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.5rem]">
                Services we provide
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-white/65 lg:pb-2">
              From the first installation to regular maintenance, Auliv looks after your purifier.
            </p>
          </Reveal>

          <m.ul {...staggerInView(0.1)} className="mt-14 border-t border-white/10 md:mt-20">
            {SERVICES.map((service, index) => (
              <m.li key={service.title} variants={fadeUp} className="border-b border-white/10">
                <a
                  href={service.href}
                  className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 py-7 transition-colors duration-500 hover:bg-white/[0.03] md:grid-cols-[4rem_1.1fr_1.4fr_auto] md:gap-x-8 md:px-4 md:py-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span
                    className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-[linear-gradient(90deg,#43d9e8,rgba(67,217,232,0))] transition-transform duration-700 ease-out group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <span className="font-display text-sm font-medium text-white/35 tabular-nums transition-colors group-hover:text-brand">
                    0{index + 1}
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="hidden size-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-brand ring-1 ring-white/10 transition-colors duration-500 group-hover:bg-brand group-hover:text-navy sm:flex">
                      <service.icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
                      {service.title}
                    </span>
                  </span>
                  <span className="col-span-3 col-start-1 text-sm leading-relaxed text-white/60 md:col-span-1 md:col-start-auto md:text-base">
                    {service.text}
                  </span>
                  <span className="col-start-3 row-start-1 flex size-11 items-center justify-center rounded-full text-white ring-1 ring-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:bg-brand group-hover:text-navy group-hover:ring-brand md:col-start-auto md:row-start-auto">
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </a>
              </m.li>
            ))}
          </m.ul>

          <div className="mt-24 md:mt-32">
            <Reveal className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
              <div>
                <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-brand uppercase">
                  <span className="h-px w-10 bg-brand/60" aria-hidden="true" />
                  How it works
                </p>
                <h2 className="mt-6 text-4xl leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
                  Clean water in three steps
                </h2>
              </div>
            </Reveal>

            <div className="relative mt-14">
              <div className="absolute top-6 right-[16.6%] left-[16.6%] hidden h-px bg-white/10 md:block" aria-hidden="true" />
              <m.div
                className="absolute top-6 left-[16.6%] hidden h-px bg-[linear-gradient(90deg,#43d9e8,#0e7e8c)] md:block"
                initial={{ width: 0 }}
                whileInView={{ width: "66.8%" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
                aria-hidden="true"
              />
              <m.ol {...staggerInView(0.25, 0.2)} className="relative grid gap-5 md:grid-cols-3">
                {STEPS.map((step, index) => (
                  <m.li key={step.title} variants={fadeUp} className="flex flex-col items-center text-center">
                    <span className="relative flex size-12 items-center justify-center rounded-full bg-ocean font-display text-sm font-semibold text-brand ring-1 ring-brand/40">
                      <span className="absolute inset-0 rounded-full bg-brand/15 blur-md" aria-hidden="true" />
                      <span className="relative tabular-nums">0{index + 1}</span>
                    </span>
                    <div className="mt-6 w-full rounded-[1.75rem] bg-white/[0.04] p-7 ring-1 ring-white/10 backdrop-blur-sm transition-colors duration-500 hover:bg-white/[0.07]">
                      <step.icon className="mx-auto size-6 text-brand" strokeWidth={1.6} aria-hidden="true" />
                      <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-white">{step.title}</h3>
                      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white/60">{step.text}</p>
                    </div>
                  </m.li>
                ))}
              </m.ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
