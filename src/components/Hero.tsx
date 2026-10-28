import { ArrowRight, Building, Clock, Droplets, ShieldCheck } from "lucide-react";
import { ProductArt } from "@/components/ProductArt";
import { WaveDivider } from "@/components/WaveDivider";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { HOURS } from "@/lib/contact";
import { Button } from "@/components/ui/button";

const FEATURES = [
  { icon: Droplets, title: "RO, UV and UF", text: "Multi-stage purification for everyday drinking water." },
  { icon: ShieldCheck, title: "Minerals kept in", text: "TDS control on the RO range, so taste stays balanced." },
  { icon: Building, title: "Home and work", text: "Residential ROs plus purifiers for offices and institutions." },
  { icon: Clock, title: HOURS, text: "Talk to us on WhatsApp or phone while we’re open." },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-mist">
      <div className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-brand/25 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-brand/15 blur-3xl" aria-hidden="true" />
      <svg
        viewBox="0 0 600 400"
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-16 hidden w-[28rem] text-brand/20 lg:block"
      >
        <path
          fill="currentColor"
          d="M40 250c40 50 90 20 140-10 50-30 80-70 140-60 70 12 90 80 150 70 40-6 70-40 110-20v120H40Z"
        />
      </svg>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-6 pt-8 md:px-6 md:pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6 lg:pb-2">
        <div>
          <p className="text-sm font-semibold tracking-[0.16em] text-brand-deep uppercase">
            Auliv Purifiers
          </p>
          <h1 className="mt-3 max-w-xl text-5xl font-semibold tracking-tight text-navy sm:text-6xl lg:text-7xl lg:leading-[0.96]">
            Safe drinking water for a <span className="text-brand-deep">healthy life</span>
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-snug text-muted">
            RO purification your family can trust, at home and at work.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink message="Hi, I'm interested in Auliv purifiers" size="lg" className="w-full sm:w-auto" />
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="#residential">
                View products
                <ArrowRight />
              </a>
            </Button>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="rounded-2xl bg-white/80 p-3.5 ring-1 ring-navy/5">
                <feature.icon className="size-5 text-brand-deep" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold text-navy">{feature.title}</p>
                <p className="mt-1 text-sm leading-snug text-muted">{feature.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute inset-8 rounded-full bg-brand/20 blur-2xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white/80 shadow-[0_30px_70px_-40px_rgba(10,37,64,0.55)] ring-1 ring-white">
            <ProductArt
              kind="grand-plus"
              accent="#00C2E8"
              label="Illustrated Auliv home RO purifier"
            />
          </div>
        </div>
      </div>

      <WaveDivider fillClass="fill-white" />
    </section>
  );
}
