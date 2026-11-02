import { m } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import {
  FACEBOOK_URL,
  HOURS,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  TEL_HREF,
  waLink,
} from "@/lib/contact";
import { fadeUp, staggerInView } from "@/lib/motion";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const CHANNELS: {
  label: string;
  value: string;
  note: string;
  href: string;
  icon: IconComponent;
}[] = [
  {
    label: "WhatsApp",
    value: PHONE_DISPLAY,
    note: "Message us",
    href: waLink("Hi, I'd like to talk to Auliv about a water purifier"),
    icon: WhatsAppIcon,
  },
  {
    label: "Instagram",
    value: INSTAGRAM_HANDLE,
    note: "See our posts",
    href: INSTAGRAM_URL,
    icon: InstagramIcon,
  },
  {
    label: "Follow on Facebook",
    value: "Auliv Purifiers",
    note: "See our page",
    href: FACEBOOK_URL,
    icon: FacebookIcon,
  },
];

export function Contact() {
  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-24 md:px-6 md:py-32 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-brand-deep uppercase">
            <span className="h-px w-10 bg-brand-deep/60" aria-hidden="true" />
            Contact
          </p>
          <h2 className="mt-6 text-4xl leading-[1.05] tracking-[-0.03em] text-navy sm:text-5xl lg:text-[3.5rem]">
            Talk to Auliv
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Ask about a model, a service visit, or an AMC plan. Reach us on WhatsApp and phone, {HOURS}.
          </p>

          <div className="mt-12 border-t border-platinum/70 pt-8">
            <p className="text-xs font-semibold tracking-[0.24em] text-muted/80 uppercase">Call us</p>
            <a
              href={TEL_HREF}
              className="group mt-3 inline-flex items-center gap-4 font-display text-3xl font-semibold tracking-tight text-navy transition-colors hover:text-brand-deep sm:text-4xl"
            >
              {PHONE_DISPLAY}
              <span className="flex size-11 items-center justify-center rounded-full bg-navy text-brand transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </span>
            </a>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <Clock className="size-4 text-brand-deep" aria-hidden="true" />
              {HOURS}
            </p>
          </div>
        </Reveal>

        <m.ul {...staggerInView(0.1)} className="self-end border-t border-platinum/70">
          {CHANNELS.map((channel) => (
            <m.li key={channel.label} variants={fadeUp} className="border-b border-platinum/70">
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-5 py-6 transition-colors duration-500 hover:bg-pearl md:px-4 md:py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <span
                  className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-[linear-gradient(90deg,#0e7e8c,rgba(14,126,140,0))] transition-transform duration-700 ease-out group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-pearl text-brand-deep ring-1 ring-platinum/70 transition-colors duration-500 group-hover:bg-navy group-hover:text-brand group-hover:ring-navy">
                  <channel.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold tracking-[0.2em] text-muted/80 uppercase">
                    {channel.label}
                  </span>
                  <span className="mt-1 block truncate font-display text-lg font-semibold tracking-tight text-navy md:text-xl">
                    {channel.value}
                  </span>
                </span>
                <span className="hidden text-sm text-muted sm:block">{channel.note}</span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full text-navy ring-1 ring-platinum transition-all duration-500 group-hover:rotate-45 group-hover:bg-navy group-hover:text-brand group-hover:ring-navy">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}
