import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import {
  FACEBOOK_URL,
  HOURS,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  TEL_HREF,
  waLink,
} from "@/lib/contact";

const LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#residential", label: "Residential" },
  { href: "/#commercial", label: "Commercial" },
  { href: "/#amc", label: "AMC" },
  { href: "/#contact", label: "Contact" },
];

const YEAR = new Date().getFullYear();

export function Footer() {

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.3fr_0.8fr_1fr] md:px-6">
        <div>
          <div className="inline-flex flex-col items-center rounded-3xl bg-white px-4 py-3">
            <img
              src="/auliv-logo-header.png"
              alt="Auliv"
              width={442}
              height={352}
              className="h-24 w-auto"
            />
            <p className="pb-1 text-sm font-medium tracking-wide text-navy">Water Purifiers</p>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/75">
            Safe drinking water for a healthy life.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-white/60 uppercase">On this page</p>
          <ul className="mt-3 space-y-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-white/90 hover:text-brand">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-white/60 uppercase">Talk to us</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={TEL_HREF} className="hover:text-brand">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={waLink("Hi, I'm interested in Auliv purifiers")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-brand"
              >
                <WhatsAppIcon className="size-4" />
                WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-brand"
              >
                <InstagramIcon className="size-4" />
                Instagram
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-brand"
              >
                <FacebookIcon className="size-4" />
                Facebook
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li className="pt-1 text-white/75">{HOURS}</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-white/10 px-4 py-4 text-center text-sm text-white/70">
        © {YEAR} Auliv Purifiers
      </p>
    </footer>
  );
}
