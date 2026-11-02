import { m, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import heroPhoto from "@/assets/hero-morning-sapphire.jpg";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { Button } from "@/components/ui/button";
import { residentialProducts } from "@/data/products";
import { formatInr } from "@/lib/contact";
import { EASE, fadeUp, stagger } from "@/lib/motion";

const featured = residentialProducts.find((product) => product.name === "Auliv Sapphire");

/** Specs shown around the hero photo. They describe the Sapphire, which is the purifier in the photo. */
const SPECS = [
  { label: "RO + UV + UF", className: "top-[8%] -left-4 sm:-left-10", delay: 0.9 },
  { label: "Alkaline + copper", className: "top-[42%] -right-3 sm:-right-8", delay: 1.05 },
  { label: "8 L storage", className: "bottom-[30%] -left-3 sm:-left-12", delay: 1.2 },
] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const tiltX = useSpring(0, { stiffness: 120, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 120, damping: 18 });

  function onTilt(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    tiltY.set(((event.clientX - box.left) / box.width - 0.5) * 10);
    tiltX.set(-((event.clientY - box.top) / box.height - 0.5) * 10);
  }

  function resetTilt() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <section ref={sectionRef} id="home" className="relative isolate overflow-hidden bg-navy">
      <HeroBackdrop />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 pt-14 pb-28 md:px-6 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pt-24 lg:pb-28">
        <m.div style={reduce ? undefined : { y: textY, opacity: textOpacity }}>
          <m.div variants={stagger(0.12, 0.15)} initial="hidden" animate="show">
            <m.p
              variants={fadeUp}
              className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-brand uppercase"
            >
              <span className="h-px w-10 bg-brand/70" aria-hidden="true" />
              For Indian homes
            </m.p>
            <m.h1
              variants={fadeUp}
              className="mt-7 max-w-[13ch] bg-[linear-gradient(180deg,#ffffff_30%,#a9eef5_100%)] bg-clip-text text-[2.9rem] leading-[1.02] tracking-[-0.035em] text-transparent sm:text-[4rem] lg:text-[5.25rem]"
            >
              Safe drinking water for a healthy life
            </m.h1>
            <m.p variants={fadeUp} className="mt-7 max-w-md text-lg leading-relaxed text-white/65">
              RO your family can trust — installed and serviced at your doorstep
            </m.p>
            <m.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <WhatsAppLink
                message="Hi, I'm interested in Auliv purifiers"
                size="lg"
                className="h-14 w-full px-8 sm:w-auto"
              />
              <Button asChild variant="glass" size="lg" className="h-14 w-full px-8 sm:w-auto">
                <a href="/#residential">
                  View products
                  <ArrowRight />
                </a>
              </Button>
            </m.div>
            <m.p variants={fadeUp} className="mt-8 inline-flex items-center gap-2 text-sm text-white/55">
              <Check className="size-4 text-brand" aria-hidden="true" />
              Free installation · Mon–Sat support
            </m.p>
          </m.div>
        </m.div>

        <m.div style={reduce ? undefined : { y: photoY }} className="relative mx-auto w-full max-w-[32rem] lg:max-w-none">
          <m.div
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.25 }}
            className="relative [perspective:1400px]"
            onPointerMove={onTilt}
            onPointerLeave={resetTilt}
          >
            <div
              className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(67,217,232,0.35)_0%,rgba(16,59,80,0.4)_45%,transparent_70%)] blur-2xl"
              aria-hidden="true"
            />
            <m.div
              style={{ rotateX: tiltX, rotateY: tiltY }}
              className="relative overflow-hidden rounded-[2.5rem] p-[1px] [transform-style:preserve-3d] bg-[linear-gradient(160deg,rgba(255,255,255,0.35),rgba(255,255,255,0.04)_40%,rgba(67,217,232,0.4))] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)]"
            >
              <div className="relative overflow-hidden rounded-[calc(2.5rem-1px)] bg-ocean">
                <img
                  src={heroPhoto}
                  alt="Auliv Sapphire purifier pouring water in a bright morning kitchen"
                  width={1024}
                  height={1024}
                  fetchPriority="high"
                  className="aspect-[4/4.4] w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(7,28,44,0.55)_100%)]"
                  aria-hidden="true"
                />
              </div>
            </m.div>

            {SPECS.map((spec) => (
              <m.span
                key={spec.label}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: EASE, delay: spec.delay }}
                className={`absolute ${spec.className} inline-flex items-center gap-2 rounded-full bg-navy/55 px-4 py-2 text-xs font-semibold tracking-wide text-white ring-1 ring-white/15 backdrop-blur-xl sm:text-sm`}
              >
                <span className="size-1.5 rounded-full bg-brand shadow-[0_0_12px_2px_rgba(67,217,232,0.8)]" />
                {spec.label}
              </m.span>
            ))}

            {featured && (
              <m.a
                href="/residential"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 1.35 }}
                className="group absolute right-4 -bottom-6 left-4 flex items-center justify-between gap-4 rounded-2xl bg-white/95 px-5 py-4 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:right-8 sm:left-auto sm:w-80"
              >
                <span>
                  <span className="block text-[0.65rem] font-semibold tracking-[0.22em] text-brand-deep uppercase">
                    In the photo
                  </span>
                  <span className="mt-0.5 block font-display text-base font-semibold text-navy">
                    {featured.name}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block font-display text-lg font-semibold text-navy tabular-nums">
                    {formatInr(featured.price)}
                  </span>
                  <span className="block text-xs text-muted/70 line-through tabular-nums">
                    {formatInr(featured.mrp)}
                  </span>
                </span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-brand transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </m.a>
            )}
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

/** Deep navy field with a slow-drifting aqua light and a faint grid fading out at the edges. */
function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_75%_35%,#103b50_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" />
      <m.div
        className="absolute top-[10%] left-[55%] size-[36rem] rounded-full bg-brand/15 blur-[120px]"
        animate={{ x: [0, -80, 40, 0], y: [0, 60, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <m.div
        className="absolute -bottom-40 -left-20 size-[28rem] rounded-full bg-ocean/60 blur-[100px]"
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-navy" />
    </div>
  );
}
