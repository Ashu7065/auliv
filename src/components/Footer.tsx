import { m } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import {
  FACEBOOK_URL,
  HOURS,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  TEL_HREF,
  waLink,
} from "@/lib/contact";
import { EASE } from "@/lib/motion";

const LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#residential", label: "Residential" },
  { href: "/#commercial", label: "Commercial" },
  { href: "/#services", label: "Services" },
  { href: "/#amc", label: "AMC" },
  { href: "/#contact", label: "Contact" },
];

const RANGES = [
  { href: "/residential", label: "Residential ROs" },
  { href: "/commercial", label: "Commercial purifiers" },
];

const SOCIAL = [
  { href: waLink("Hi, I'm interested in Auliv purifiers"), label: "WhatsApp", icon: WhatsAppIcon },
  { href: INSTAGRAM_URL, label: "Instagram", icon: InstagramIcon },
  { href: FACEBOOK_URL, label: "Facebook", icon: FacebookIcon },
];

const YEAR = new Date().getFullYear();

export function Footer() {
  function backToTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <footer className="relative isolate overflow-hidden rounded-t-[2.5rem] bg-navy text-white md:rounded-t-[4rem]">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_80%_0%,rgba(67,217,232,0.14),transparent_70%),radial-gradient(60%_60%_at_0%_100%,rgba(16,59,80,0.9),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(60%_50%_at_70%_10%,black,transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-20 md:px-6 md:pt-28">
        <Reveal className="flex flex-col gap-10 border-b border-white/10 pb-16 lg:flex-row lg:items-end lg:justify-between md:pb-20">
          <div>
            <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-brand uppercase">
              <span className="h-px w-10 bg-brand/60" aria-hidden="true" />
              Get in touch
            </p>
            <h2 className="mt-6 max-w-3xl text-4xl leading-[1.02] tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.25rem]">
              Ready when you are
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
              Tell us which purifier you’re looking at, or ask about Half-yearly and Yearly AMC. We’ll reply
              on WhatsApp.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <WhatsAppLink
              message="Hi, I'd like to talk to Auliv about a water purifier"
              size="lg"
              className="h-14 px-8"
            />
            <a
              href={TEL_HREF}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white hover:text-navy"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <img
              src="/auliv-logo-white.png"
              alt="Auliv Water Purifiers"
              width={442}
              height={352}
              loading="lazy"
              className="h-16 w-auto"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
              Safe drinking water for a healthy life.
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIAL.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label} (opens in a new tab)`}
                  className="flex size-11 items-center justify-center rounded-full text-white/75 ring-1 ring-white/15 transition-colors duration-300 hover:bg-brand hover:text-navy hover:ring-brand"
                >
                  <item.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="On this page">
            {LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Ranges">
            {RANGES.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Talk to us">
            <FooterLink href={TEL_HREF}>{PHONE_DISPLAY}</FooterLink>
            <li className="text-sm text-white/50">{HOURS}</li>
          </FooterColumn>
        </div>

        <div className="flex flex-col-reverse items-start gap-4 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs tracking-wide text-white/45">© {YEAR} Auliv Purifiers</p>
          <button
            type="button"
            onClick={backToTop}
            className="group inline-flex items-center gap-3 text-sm font-semibold text-white/75 transition-colors hover:text-white"
          >
            Back to top
            <span className="flex size-10 items-center justify-center rounded-full ring-1 ring-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-brand group-hover:text-navy group-hover:ring-brand">
              <ArrowUp className="size-4" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>

      <m.p
        aria-hidden="true"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
        className="pointer-events-none -mb-[0.22em] bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_85%)] bg-clip-text text-center font-display text-[25vw] leading-none font-bold tracking-[-0.06em] text-transparent select-none"
      >
        AULIV
      </m.p>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.24em] text-white/45 uppercase">{title}</p>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="group inline-flex items-center gap-1 text-sm text-white/80 transition-colors hover:text-brand"
      >
        {children}
        <ArrowUpRight
          className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          aria-hidden="true"
        />
      </a>
    </li>
  );
}
