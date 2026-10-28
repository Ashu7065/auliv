import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/contact";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "amc", label: "AMC" },
  { id: "contact", label: "Contact" },
] as const;

const HEADER_MESSAGE = "Hi, I'm interested in Auliv purifiers";

export function Header() {
  const active = useActiveSection();
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const isCurrent = (id: string) => path === `/${id}` || (path === "/" && active === id);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-transparent bg-white/95 backdrop-blur-md",
        scrolled && "border-navy/10 shadow-[0_8px_24px_-20px_rgba(10,37,64,0.45)]",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-3 px-4 md:h-24 md:px-6">
        <a href="/#home" className="shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2">
          <img
            src="/auliv-logo-header.png"
            alt="Auliv Water Purifiers"
            width={442}
            height={352}
            className="h-16 w-auto md:h-[4.5rem]"
          />
        </a>

        <nav aria-label="Primary" className="mx-auto hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`/#${link.id}`}
              aria-current={isCurrent(link.id) ? "true" : undefined}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium text-navy/75 transition-colors hover:bg-mist hover:text-navy",
                isCurrent(link.id) && "bg-foam text-navy",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <a href={waLink(HEADER_MESSAGE)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Chat on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
          <Button asChild size="icon" className="sm:hidden" aria-label="Chat on WhatsApp">
            <a href={waLink(HEADER_MESSAGE)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </Button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-navy/10 bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                aria-current={isCurrent(link.id) ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-2xl px-3 py-3 text-base font-medium text-navy hover:bg-mist",
                  isCurrent(link.id) && "bg-foam",
                )}
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="mt-2 w-full">
              <a
                href={waLink(HEADER_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                <WhatsAppIcon />
                Chat on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
