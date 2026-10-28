import { Clock, Phone } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { WaveDivider } from "@/components/WaveDivider";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import {
  FACEBOOK_URL,
  HOURS,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  TEL_HREF,
  waLink,
} from "@/lib/contact";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const CHANNELS: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  icon: IconComponent;
}[] = [
  {
    label: "WhatsApp",
    value: PHONE_DISPLAY,
    href: waLink("Hi, I'd like to talk to Auliv about a water purifier"),
    external: true,
    icon: WhatsAppIcon,
  },
  {
    label: "Phone",
    value: PHONE_DISPLAY,
    href: TEL_HREF,
    icon: Phone,
  },
  {
    label: "Instagram",
    value: INSTAGRAM_HANDLE,
    href: INSTAGRAM_URL,
    external: true,
    icon: InstagramIcon,
  },
  {
    label: "Follow on Facebook",
    value: "Auliv Purifiers",
    href: FACEBOOK_URL,
    external: true,
    icon: FacebookIcon,
  },
  {
    label: "Hours",
    value: HOURS,
    icon: Clock,
  },
];

export function Contact() {
  return (
    <section id="contact" className="bg-mist">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.14em] text-brand-deep uppercase">Contact</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Talk to Auliv
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Ask about a model, a service visit, or an AMC plan. Reach us on WhatsApp and phone,{" "}
            {HOURS}.
          </p>
        </div>

        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((channel) => (
            <div key={channel.label} className="rounded-3xl bg-white p-5 ring-1 ring-navy/5">
              <dt className="flex items-center gap-2 text-sm font-semibold text-brand-deep">
                <channel.icon className="size-4" aria-hidden="true" />
                {channel.label}
              </dt>
              <dd className="mt-2 text-lg font-semibold text-navy">
                {channel.href ? (
                  <a
                    href={channel.href}
                    className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {channel.value}
                    {channel.external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                ) : (
                  channel.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 rounded-3xl bg-navy px-6 py-8 text-white md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h3 className="text-2xl font-semibold">Ready when you are</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
              Tell us which purifier you’re looking at, or ask about Half-yearly and Yearly AMC.
              We’ll reply on WhatsApp.
            </p>
          </div>
          <WhatsAppLink
            message="Hi, I'd like to talk to Auliv about a water purifier"
            className="mt-5 w-full shrink-0 md:mt-0 md:w-auto"
            size="lg"
          />
        </div>
      </div>
      <WaveDivider fillClass="fill-navy" />
    </section>
  );
}
