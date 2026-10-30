import { m } from "framer-motion";
import { Headset, House, ShieldCheck, Wrench } from "lucide-react";
import { fadeUp, staggerInView } from "@/lib/motion";

const POINTS = [
  { icon: Wrench, title: "Free installation", detail: "With every purifier" },
  { icon: House, title: "Doorstep service", detail: "Installed and serviced at home" },
  { icon: ShieldCheck, title: "Up to 2-year warranty", detail: "On IoT 2Y models" },
  { icon: Headset, title: "Mon–Sat support", detail: "WhatsApp and phone" },
] as const;

/** Closes the hero: a frosted strip of service promises on the same navy, with a rounded bottom edge. */
export function TrustBar() {
  return (
    <section
      aria-label="Why Auliv"
      className="relative overflow-hidden rounded-b-[2.5rem] bg-navy px-4 pb-14 md:rounded-b-[4rem] md:px-6 md:pb-20"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(67,217,232,0.12),transparent)]"
        aria-hidden="true"
      />
      <m.ul
        {...staggerInView(0.1)}
        className="relative mx-auto grid max-w-7xl grid-cols-2 overflow-hidden rounded-3xl bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-xl lg:grid-cols-4"
      >
        {POINTS.map((point, index) => (
          <m.li
            key={point.title}
            variants={fadeUp}
            className={`group flex flex-col gap-4 p-5 transition-colors duration-500 hover:bg-white/[0.04] sm:flex-row sm:items-center sm:p-7 ${
              index % 2 === 1 ? "border-l border-white/10" : ""
            } ${index >= 2 ? "border-t border-white/10 lg:border-t-0" : ""} ${index === 2 ? "lg:border-l" : ""}`}
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/25 transition-colors duration-500 group-hover:bg-brand group-hover:text-navy">
              <point.icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-sm font-semibold text-white sm:text-base">{point.title}</span>
              <span className="mt-0.5 block text-xs text-white/55 sm:text-sm">{point.detail}</span>
            </span>
          </m.li>
        ))}
      </m.ul>
    </section>
  );
}
