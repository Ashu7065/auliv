import { m } from "framer-motion";
import { Reveal } from "@/components/motion";
import seo from "@/data/seo.json" with { type: "json" };
import { fadeUp, staggerInView } from "@/lib/motion";

export function ServiceAreas() {
  return (
    <section id="service-areas" aria-labelledby="service-areas-heading" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
        <Reveal className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-brand-deep uppercase">
              <span className="h-px w-10 bg-brand-deep/60" aria-hidden="true" />
              Delhi NCR
            </p>
            <h2
              id="service-areas-heading"
              className="mt-6 text-4xl leading-[1.05] tracking-[-0.03em] text-navy sm:text-5xl lg:text-[3.5rem]"
            >
              Service areas
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-muted lg:pb-2">
            We install purifiers at your doorstep and come back for AMC visits — servicing, filter and membrane
            replacement, and repairs — across Delhi NCR.
          </p>
        </Reveal>

        <m.ul {...staggerInView(0.08)} className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
          {seo.cities.map((city) => (
            <m.li
              key={city}
              variants={fadeUp}
              className="flex items-center gap-4 rounded-[1.5rem] bg-pearl px-6 py-5 ring-1 ring-platinum/70"
            >
              <span
                className="size-2 shrink-0 rounded-full bg-brand shadow-[0_0_10px_2px_rgba(67,217,232,0.65)]"
                aria-hidden="true"
              />
              <span className="font-display text-lg font-semibold tracking-tight text-navy">{city}</span>
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}
