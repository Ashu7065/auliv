import { AnimatePresence, m, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Clock, Phone } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { FACEBOOK_URL, HOURS, INSTAGRAM_URL, PHONE_DISPLAY, TEL_HREF, waLink } from "@/lib/contact";
import { EASE } from "@/lib/motion";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "services", label: "Services" },
  { id: "amc", label: "AMC" },
  { id: "contact", label: "Contact" },
] as const;

const HEADER_MESSAGE = "Hi, I'm interested in Auliv purifiers";

type Pill = { x: number; width: number };

export function Header() {
  const active = useActiveSection();
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  // The link just clicked stays current while the page glides to it, so the highlight never doubles back.
  const [clickedId, setClickedId] = useState<string | null>(null);
  const isCurrent = (id: string) =>
    clickedId ? clickedId === id : path === `/${id}` || (path === "/" && active === id);
  const currentId = LINKS.find((link) => isCurrent(link.id))?.id;

  useEffect(() => {
    if (!clickedId) return;
    const release = () => setClickedId(null);
    // Let go once the glide ends; the timer covers browsers without scrollend and clicks that don't scroll.
    const timer = window.setTimeout(release, 2000);
    window.addEventListener("scrollend", release, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scrollend", release);
    };
  }, [clickedId]);

  const [open, setOpen] = useState(false);
  const [pastTop, setPastTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });

  const navRef = useRef<HTMLElement>(null);
  const [hoverPill, setHoverPill] = useState<Pill | null>(null);
  const [activePill, setActivePill] = useState<Pill | null>(null);

  // Float the bar once the page moves. It stays visible so the menu is always within reach.
  useEffect(() => {
    const onScroll = () => setPastTop(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const measure = () => {
      const link = navRef.current?.querySelector<HTMLElement>(`[data-id="${currentId}"]`);
      setActivePill(link ? { x: link.offsetLeft, width: link.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [currentId, pastTop]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function onLinkEnter(event: ReactMouseEvent<HTMLAnchorElement>) {
    const link = event.currentTarget;
    setHoverPill({ x: link.offsetLeft, width: link.offsetWidth });
  }

  const pill = hoverPill ?? activePill;
  // While the mobile menu is open the bar stays flat so it joins the full-screen panel.
  const scrolled = pastTop && !open;

  return (
    <>
      <div className="hidden border-b border-white/[0.06] bg-[#05141f] text-[0.8rem] text-white/60 md:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center gap-6 px-6">
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-brand shadow-[0_0_10px_2px_rgba(67,217,232,0.7)]" aria-hidden="true" />
            Free installation on every purifier
          </span>
          <span className="ml-auto inline-flex items-center gap-2">
            <Clock className="size-3.5 text-brand/80" aria-hidden="true" />
            {HOURS}
          </span>
          <a href={TEL_HREF} className="inline-flex items-center gap-2 transition-colors hover:text-white">
            <Phone className="size-3.5 text-brand/80" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
          <span className="flex items-center gap-3 border-l border-white/10 pl-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram (opens in a new tab)"
              className="transition-colors hover:text-brand"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook (opens in a new tab)"
              className="transition-colors hover:text-brand"
            >
              <FacebookIcon className="size-4" />
            </a>
          </span>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 transition-colors duration-500 ease-out",
          scrolled ? "bg-transparent pt-3" : "bg-navy",
        )}
      >
        <div
          className={cn(
            "relative mx-auto flex items-center gap-3 transition-all duration-500 ease-out",
            scrolled
              ? "h-16 max-w-6xl mx-3 rounded-full bg-navy/90 px-3 pl-5 shadow-[0_20px_50px_-20px_rgba(7,28,44,0.7)] ring-1 ring-white/10 backdrop-blur-xl md:mx-auto"
              : "h-[4.75rem] max-w-7xl px-4 md:px-6",
          )}
        >
          <a
            href="/#home"
            className="shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            <img
              src="/auliv-logo-white.png"
              alt="Auliv Water Purifiers"
              width={442}
              height={352}
              className={cn(
                "w-auto transition-[height] duration-500",
                scrolled ? "h-10" : "h-12 md:h-14",
              )}
            />
          </a>

          <nav
            ref={navRef}
            aria-label="Primary"
            onMouseLeave={() => setHoverPill(null)}
            className="relative mx-auto hidden items-center lg:flex"
          >
            {pill && (
              <m.span
                aria-hidden="true"
                className="absolute inset-y-0 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                initial={false}
                animate={{ x: pill.x, width: pill.width, opacity: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                style={{ left: 0 }}
              />
            )}
            {LINKS.map((link) => {
              const current = isCurrent(link.id);
              return (
                <a
                  key={link.id}
                  data-id={link.id}
                  href={`/#${link.id}`}
                  aria-current={current ? "true" : undefined}
                  onMouseEnter={onLinkEnter}
                  onClick={() => path === "/" && setClickedId(link.id)}
                  onFocus={(event) => setHoverPill({ x: event.currentTarget.offsetLeft, width: event.currentTarget.offsetWidth })}
                  onBlur={() => setHoverPill(null)}
                  className={cn(
                    "relative px-4 py-2.5 text-[0.92rem] font-medium tracking-tight transition-colors duration-300 focus-visible:outline-none",
                    current ? "text-white" : "text-white/60 hover:text-white",
                  )}
                >
                  {link.label}
                  {current && (
                    <span
                      className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_8px_2px_rgba(67,217,232,0.7)]"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <a
              href={TEL_HREF}
              aria-label={`Call ${PHONE_DISPLAY}`}
              className="hidden size-11 items-center justify-center rounded-full text-white/70 ring-1 ring-white/15 transition-colors duration-300 hover:bg-white hover:text-navy xl:inline-flex"
            >
              <Phone className="size-4" aria-hidden="true" />
            </a>
            <a
              href={waLink(HEADER_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden h-11 items-center gap-2 rounded-full bg-brand pr-1.5 pl-5 text-sm font-semibold text-navy shadow-[0_10px_30px_-10px_rgba(67,217,232,0.7)] transition-colors duration-300 hover:bg-white sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              <WhatsAppIcon className="size-4" />
              Chat on WhatsApp
              <span className="flex size-8 items-center justify-center rounded-full bg-navy text-brand transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={waLink(HEADER_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp (opens in a new tab)"
              className="inline-flex size-11 items-center justify-center rounded-full bg-brand text-navy sm:hidden"
            >
              <WhatsAppIcon className="size-4" />
            </a>
            <button
              type="button"
              className="relative inline-flex size-11 items-center justify-center rounded-full text-white ring-1 ring-white/15 transition-colors hover:bg-white/10 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <m.span
                aria-hidden="true"
                className="absolute h-[1.5px] w-5 rounded-full bg-current"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3.5 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
              <m.span
                aria-hidden="true"
                className="absolute h-[1.5px] w-5 rounded-full bg-current"
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3.5 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
            </button>
          </div>

          <m.span
            aria-hidden="true"
            style={{ scaleX: progress }}
            className={cn(
              "absolute bottom-0 h-px origin-left bg-gradient-to-r from-brand/0 via-brand to-brand/0",
              scrolled ? "inset-x-8" : "inset-x-0",
              open && "opacity-0",
            )}
          />
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, clipPath: "circle(0% at 92% 4%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 92% 4%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-x-0 top-0 z-30 flex h-dvh flex-col overflow-y-auto overscroll-contain bg-navy px-6 pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] lg:hidden"
          >
            <div
              className="pointer-events-none absolute -top-20 -right-20 size-80 rounded-full bg-brand/15 blur-3xl"
              aria-hidden="true"
            />
            <m.ul
              className="relative flex flex-col"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
            >
              {LINKS.map((link, index) => (
                <m.li
                  key={link.id}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
                  className="border-b border-white/[0.08]"
                >
                  <a
                    href={`/#${link.id}`}
                    aria-current={isCurrent(link.id) ? "true" : undefined}
                    onClick={() => {
                      if (path === "/") setClickedId(link.id);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex items-baseline gap-3 py-3 font-display text-2xl font-semibold tracking-tight transition-colors",
                      isCurrent(link.id) ? "text-brand" : "text-white hover:text-brand",
                    )}
                  >
                    <span className="w-6 shrink-0 text-xs font-medium text-white/35 tabular-nums">0{index + 1}</span>
                    {link.label}
                  </a>
                </m.li>
              ))}
            </m.ul>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}
              className="relative mt-8"
            >
              <a
                href={waLink(HEADER_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand font-semibold text-navy"
              >
                <WhatsAppIcon className="size-4" />
                Chat on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <div className="mt-6 flex items-center justify-between text-sm text-white/60">
                <a href={TEL_HREF} className="inline-flex items-center gap-2 hover:text-white">
                  <Phone className="size-4 text-brand" aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
                <span className="flex items-center gap-4">
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)" className="hover:text-brand">
                    <InstagramIcon className="size-5" />
                  </a>
                  <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook (opens in a new tab)" className="hover:text-brand">
                    <FacebookIcon className="size-5" />
                  </a>
                </span>
              </div>
            </m.div>
          </m.nav>
        )}
      </AnimatePresence>
    </>
  );
}
