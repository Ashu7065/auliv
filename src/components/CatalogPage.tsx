import { m } from "framer-motion";
import { ChevronDown, ChevronRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { ProductFilter } from "@/components/ProductSection";
import { Segmented } from "@/components/Segmented";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import type { Product } from "@/data/products";
import { formatInr } from "@/lib/contact";
import { EASE, fadeUp, stagger } from "@/lib/motion";

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "low", label: "Price: low to high" },
  { id: "high", label: "Price: high to low" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

export function CatalogPage({
  eyebrow,
  title,
  lede,
  products,
  filters,
  tone,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  products: Product[];
  filters?: ProductFilter[];
  tone: "plain" | "tinted";
}) {
  const tabs = [{ label: "All", match: () => true }, ...(filters ?? [])];
  const [tab, setTab] = useState(0);
  const [sort, setSort] = useState<SortId>("featured");

  const filtered = products.filter(tabs[tab].match);
  const shown =
    sort === "featured"
      ? filtered
      : [...filtered].sort((a, b) => (sort === "low" ? a.price - b.price : b.price - a.price));
  const from = Math.min(...products.map((product) => product.price));

  return (
    <>
      <section className="relative isolate overflow-hidden rounded-b-[2.5rem] bg-navy text-white md:rounded-b-[4rem]">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_85%_20%,#103b50_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(60%_70%_at_60%_30%,black,transparent)]" />
          <m.div
            className="absolute -top-20 right-[10%] size-[30rem] rounded-full bg-brand/15 blur-[110px]"
            animate={{ x: [0, -60, 30, 0], y: [0, 40, -20, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <m.div
          variants={stagger(0.1, 0.1)}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-7xl px-4 pt-10 pb-16 md:px-6 md:pt-14 md:pb-20"
        >
          <m.nav variants={fadeUp} aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-white/50">
              <li>
                <a href="/" className="transition-colors hover:text-white">
                  Home
                </a>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="text-white/85">
                {title}
              </li>
            </ol>
          </m.nav>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
            <div>
              <m.p
                variants={fadeUp}
                className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-brand uppercase"
              >
                <span className="h-px w-10 bg-brand/70" aria-hidden="true" />
                {eyebrow}
              </m.p>
              <m.h1
                variants={fadeUp}
                className="mt-6 bg-[linear-gradient(180deg,#ffffff_40%,#a9eef5_100%)] bg-clip-text text-5xl leading-[1.02] tracking-[-0.035em] text-transparent sm:text-6xl lg:text-7xl"
              >
                {title}
              </m.h1>
            </div>
            <m.p variants={fadeUp} className="max-w-md text-lg leading-relaxed text-white/65 lg:pb-2">
              {lede}
            </m.p>
          </div>

          <m.dl
            variants={fadeUp}
            className="mt-12 grid grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-3xl bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-xl"
          >
            {[
              { label: "Models", value: String(products.length) },
              { label: "Starting at", value: formatInr(from) },
              { label: "Installation", value: "Free" },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-5 sm:px-7 sm:py-6">
                <dt className="text-[0.6rem] font-semibold tracking-[0.1em] text-white/45 uppercase sm:text-xs sm:tracking-[0.22em]">
                  {stat.label}
                </dt>
                <dd className="mt-1.5 font-display text-xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </m.dl>
        </m.div>
      </section>

      <section className={tone === "tinted" ? "bg-pearl" : "bg-white"}>
        <div className="mx-auto max-w-7xl px-4 pt-14 pb-24 md:px-6 md:pt-20 md:pb-32">
          <div className="flex flex-col gap-5 border-b border-platinum/70 pb-8 lg:flex-row lg:items-center lg:justify-between">
            {tabs.length > 1 ? (
              <Segmented
                label={`Filter ${title}`}
                options={tabs.map((option) => ({ label: option.label, count: products.filter(option.match).length }))}
                value={tab}
                onChange={setTab}
              />
            ) : (
              <span />
            )}
            <div className="flex items-center justify-between gap-6 lg:justify-end">
              <p className="text-sm text-muted" aria-live="polite">
                Showing <span className="font-semibold text-navy">{shown.length}</span>{" "}
                {shown.length === 1 ? "model" : "models"}
              </p>
              <label className="relative">
                <span className="sr-only">Sort by</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortId)}
                  className="h-11 cursor-pointer appearance-none rounded-full bg-white pr-11 pl-5 text-sm font-semibold text-navy ring-1 ring-platinum transition-shadow hover:ring-navy/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {SORTS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-navy/60"
                  aria-hidden="true"
                />
              </label>
            </div>
          </div>

          <m.div
            key={`${tab}-${sort}`}
            variants={stagger(0.06)}
            initial="hidden"
            animate="show"
            className="mt-12 grid grid-cols-1 gap-x-7 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
          >
            {shown.map((product) => (
              <m.div key={product.name} variants={fadeUp}>
                <ProductCard product={product} stage={tone === "tinted" ? "white" : "tint"} />
              </m.div>
            ))}
            <m.div variants={fadeUp} className="h-full">
              <HelpTile />
            </m.div>
          </m.div>
        </div>
      </section>
    </>
  );
}

/** Closes the grid with a way to ask for advice, so the last row never ends on a lone card. */
function HelpTile() {
  return (
    <div className="relative flex h-full min-h-[26rem] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-navy p-8 text-white">
      <m.div
        className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full bg-brand/25 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: EASE }}
        aria-hidden="true"
      />
      <span className="relative flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/25">
        <MessageCircle className="size-5" strokeWidth={1.6} aria-hidden="true" />
      </span>
      <div className="relative">
        <p className="font-display text-3xl leading-tight font-semibold tracking-tight">Need help choosing?</p>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          Tell us about your water and your home. We’ll suggest a model on WhatsApp.
        </p>
        <WhatsAppLink
          message="Hi, I'd like help choosing an Auliv purifier"
          className="mt-7 w-full"
          size="lg"
        >
          Ask on WhatsApp
        </WhatsAppLink>
      </div>
    </div>
  );
}
