import { animate, m, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BellRing, Gauge, House, ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { commercialProducts, productPhoto, residentialProducts } from "@/data/products";
import { formatInr } from "@/lib/contact";
import { EASE, fadeUp, staggerInView } from "@/lib/motion";

const STAGES = ["RO", "UV", "UF", "Alkaline", "Copper"] as const;

const EXTRAS = [
  { icon: Gauge, title: "TDS control", text: "Available on most Auliv models." },
  { icon: BellRing, title: "Smart IoT alerts", text: "Water-quality alerts on your phone, on IoT models." },
] as const;

const featured = residentialProducts.find((product) => product.name === "Auliv Supreme IoT 2Y");
const photo = featured && productPhoto(featured.name);
const homeCount = residentialProducts.length;
const workCount = commercialProducts.length;

const tile = "relative overflow-hidden rounded-[2rem] ring-1 ring-platinum/70";

export function About() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
        <Reveal className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-brand-deep uppercase">
              <span className="h-px w-10 bg-brand-deep/60" aria-hidden="true" />
              About Auliv
            </p>
            <h2 className="mt-6 text-4xl leading-[1.05] tracking-[-0.03em] text-balance text-navy sm:text-5xl lg:text-[3.5rem]">
              Everything you need for healthy drinking water
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-muted lg:pb-2">
            Auliv makes purifiers for Indian homes and workplaces — from everyday wall-mounted ROs to smart
            IoT models — and installs and services them at your doorstep.
          </p>
        </Reveal>

        <m.div {...staggerInView(0.12)} className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          <ProductTile />

          <m.div variants={fadeUp} className={`${tile} bg-pearl p-7 md:p-9 lg:col-span-7`}>
            <p className="text-xs font-semibold tracking-[0.24em] text-muted/80 uppercase">Purification</p>
            <h3 className="mt-3 max-w-md font-display text-2xl leading-snug font-semibold tracking-tight text-navy md:text-[1.7rem]">
              The stages your water needs, in one purifier.
            </h3>
            <StageFlow />
            <div className="mt-8 grid gap-5 border-t border-platinum/70 pt-7 sm:grid-cols-2">
              {EXTRAS.map((extra) => (
                <div key={extra.title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-deep ring-1 ring-platinum/70">
                    <extra.icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-sm font-semibold text-navy">{extra.title}</span>
                    <span className="mt-0.5 block text-sm text-muted">{extra.text}</span>
                  </span>
                </div>
              ))}
            </div>
          </m.div>

          <m.div variants={fadeUp} className={`${tile} flex flex-col justify-between bg-pearl p-7 md:p-9 lg:col-span-3`}>
            <p className="text-xs font-semibold tracking-[0.24em] text-muted/80 uppercase">The range</p>
            <div className="mt-6">
              <p className="font-display text-7xl leading-none font-semibold tracking-[-0.04em] text-navy tabular-nums">
                <CountUp to={homeCount + workCount} />
              </p>
              <p className="mt-2 text-sm text-muted">purifier models</p>
            </div>
            <div className="mt-8">
              <div className="flex h-1.5 overflow-hidden rounded-full bg-platinum/60" aria-hidden="true">
                <m.span
                  className="h-full bg-navy"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(homeCount / (homeCount + workCount)) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
                />
                <m.span
                  className="h-full bg-brand"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(workCount / (homeCount + workCount)) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
                />
              </div>
              <dl className="mt-3 flex justify-between text-xs">
                <div>
                  <dt className="inline text-muted">Homes </dt>
                  <dd className="inline font-semibold text-navy">{homeCount}</dd>
                </div>
                <div>
                  <dt className="inline text-muted">Workplaces </dt>
                  <dd className="inline font-semibold text-navy">{workCount}</dd>
                </div>
              </dl>
            </div>
          </m.div>

          <m.div
            variants={fadeUp}
            className={`${tile} flex flex-col justify-between bg-navy p-7 text-white ring-navy md:p-9 lg:col-span-4`}
          >
            <div
              className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-brand/20 blur-3xl"
              aria-hidden="true"
            />
            <span className="relative flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/25">
              <House className="size-5" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <div className="relative mt-10">
              <h3 className="font-display text-2xl leading-snug font-semibold tracking-tight">
                Installed and serviced at your doorstep.
              </h3>
              <p className="mt-2 text-sm text-white/60">Free installation, with support Monday to Saturday.</p>
              <WhatsAppLink
                message="Hi, I'd like help choosing an Auliv purifier"
                className="mt-7 w-full sm:w-auto"
              >
                Get help choosing
              </WhatsAppLink>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

/** The top smart home purifier, large, with its photo drifting gently as the section scrolls past. */
function ProductTile() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  if (!featured) return null;

  return (
    <m.div
      ref={ref}
      variants={fadeUp}
      className={`${tile} group flex min-h-[30rem] flex-col bg-[linear-gradient(180deg,#f4f8fa_0%,#e2e9ee_100%)] lg:col-span-5 lg:row-span-2`}
    >
      <div className="relative flex items-start justify-between p-7 md:p-9">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-navy ring-1 ring-platinum/70 backdrop-blur">
          <span className="size-1.5 rounded-full bg-brand-deep" aria-hidden="true" />
          Top smart RO
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted">
          <ShieldCheck className="size-4 text-brand-deep" aria-hidden="true" />
          2-year warranty
        </span>
      </div>

      {photo && (
        <div className="relative flex flex-1 items-center justify-center px-10">
          <span
            className="absolute bottom-[8%] left-1/2 h-8 w-1/2 -translate-x-1/2 rounded-[50%] bg-navy/20 blur-2xl"
            aria-hidden="true"
          />
          <m.img
            src={photo}
            alt={`${featured.name} water purifier`}
            width={720}
            height={720}
            loading="lazy"
            style={reduce ? undefined : { y }}
            className="relative max-h-[24rem] w-auto mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      )}

      <div className="relative flex items-end justify-between gap-4 p-7 md:p-9">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight text-navy">{featured.name}</h3>
          <p className="mt-1 text-sm text-muted">
            <span className="font-semibold text-navy tabular-nums">{formatInr(featured.price)}</span>
            <span className="ml-2 line-through tabular-nums">{formatInr(featured.mrp)}</span>
          </p>
        </div>
        <a
          href="/residential"
          className="group/link inline-flex shrink-0 items-center gap-2 rounded-full bg-navy whitespace-nowrap py-2 pr-2 pl-4 text-sm font-semibold text-white transition-colors hover:bg-ocean"
        >
          Home range
          <span className="flex size-7 items-center justify-center rounded-full bg-brand text-navy transition-transform duration-300 group-hover/link:translate-x-0.5">
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
        </a>
      </div>
    </m.div>
  );
}

/** Purification stages joined by a line that fills with aqua as it comes into view. */
function StageFlow() {
  return (
    <ol className="relative mt-9 flex flex-wrap items-center gap-x-2 gap-y-3 sm:flex-nowrap sm:justify-between sm:gap-0">
      <span className="absolute top-1/2 right-6 left-6 hidden h-px -translate-y-1/2 bg-platinum sm:block" aria-hidden="true" />
      <m.span
        className="absolute top-1/2 left-6 hidden h-px -translate-y-1/2 bg-[linear-gradient(90deg,#0e7e8c,#43d9e8)] sm:block"
        initial={{ width: 0 }}
        whileInView={{ width: "calc(100% - 3rem)" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
        aria-hidden="true"
      />
      {STAGES.map((stage, index) => (
        <m.li
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.35 + index * 0.25 }}
          className="relative inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy shadow-[0_8px_20px_-14px_rgba(7,28,44,0.5)] ring-1 ring-platinum/70"
        >
          <span className="size-1.5 rounded-full bg-brand shadow-[0_0_8px_2px_rgba(67,217,232,0.6)]" aria-hidden="true" />
          {stage}
        </m.li>
      ))}
    </ol>
  );
}

/** Counts up to `to` the first time it scrolls into view. */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (value) => {
        el.textContent = String(Math.round(value));
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return <span ref={ref}>{to}</span>;
}
