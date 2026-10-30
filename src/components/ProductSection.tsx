import { ArrowRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import { ProductCarousel } from "@/components/ProductCarousel";
import { Reveal } from "@/components/motion";
import { Segmented } from "@/components/Segmented";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import type { Product } from "@/data/products";
import { formatInr } from "@/lib/contact";
import { cn } from "@/lib/utils";

export type ProductFilter = { label: string; match: (product: Product) => boolean };

export function ProductSection({
  id,
  eyebrow,
  title,
  lede,
  products,
  catalog,
  filters,
  audience,
  tone,
  exploreHref,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede: string;
  products: Product[];
  /** The full range for this category, for the model count and starting price. */
  catalog: Product[];
  /** Filters show every matching model in the catalog; "All" shows the preview set. */
  filters?: ProductFilter[];
  /** Who the range is for, shown as a row of tags under the header. */
  audience?: string[];
  tone: "plain" | "tinted";
  exploreHref: string;
}) {
  const tabs = filters ? [{ label: "All", match: () => true }, ...filters] : [];
  const [tab, setTab] = useState(0);
  const shown = tab === 0 ? products : catalog.filter(tabs[tab].match);
  const from = Math.min(...catalog.map((product) => product.price));

  return (
    <section id={id} className={cn("overflow-x-clip", tone === "tinted" ? "bg-pearl" : "bg-white")}>
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
        <Reveal className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-brand-deep uppercase">
              <span className="h-px w-10 bg-brand-deep/60" aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 className="mt-6 text-4xl leading-[1.05] tracking-[-0.03em] text-navy sm:text-5xl lg:text-[3.5rem]">
              {title}
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-muted">{lede}</p>
            {catalog.length > 0 && (
              <p className="mt-5 flex items-center gap-3 text-sm text-muted">
                <span className="font-semibold text-navy">{catalog.length} models</span>
                <span className="h-3 w-px bg-platinum" aria-hidden="true" />
                <span>
                  From <span className="font-semibold text-navy tabular-nums">{formatInr(from)}</span>
                </span>
              </p>
            )}
          </div>
        </Reveal>

        {audience && (
          <Reveal className="mt-10 flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs font-semibold tracking-[0.24em] text-muted/80 uppercase">Built for</span>
            {audience.map((place) => (
              <span
                key={place}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-navy ring-1 ring-platinum/70"
              >
                {place}
              </span>
            ))}
          </Reveal>
        )}

        {products.length === 0 ? (
          <EmptyCatalog>{lede}</EmptyCatalog>
        ) : (
          <>
            {tabs.length > 0 && (
              <Reveal className={audience ? "mt-8" : "mt-12"}>
                <Segmented
                  label={`Filter ${title}`}
                  options={tabs.map((option, index) => ({
                    label: option.label,
                    count: index === 0 ? products.length : catalog.filter(option.match).length,
                  }))}
                  value={tab}
                  onChange={setTab}
                />
              </Reveal>
            )}
            <ProductCarousel
              key={tab}
              products={shown}
              stage={tone === "tinted" ? "white" : "tint"}
              label={title}
              end={
                <a
                  href={exploreHref}
                  className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-navy p-8 text-white"
                >
                  <span
                    className="pointer-events-none absolute -right-20 -bottom-20 size-72 rounded-full bg-brand/25 blur-3xl transition-transform duration-700 group-hover:scale-125"
                    aria-hidden="true"
                  />
                  <span className="relative text-xs font-semibold tracking-[0.24em] text-brand uppercase">
                    The full range
                  </span>
                  <span className="relative">
                    <span className="block font-display text-6xl font-semibold tracking-[-0.04em] tabular-nums">
                      {catalog.length}
                    </span>
                    <span className="mt-2 block text-white/60">{title}</span>
                  </span>
                  <span className="relative flex items-center justify-between border-t border-white/10 pt-6">
                    <span className="font-display text-lg font-semibold">Explore more</span>
                    <span className="flex size-12 items-center justify-center rounded-full bg-brand text-navy transition-transform duration-500 group-hover:translate-x-1">
                      <ArrowRight className="size-5" aria-hidden="true" />
                    </span>
                  </span>
                </a>
              }
            />
          </>
        )}
      </div>
    </section>
  );
}

function EmptyCatalog({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 rounded-3xl bg-white p-8 text-center ring-1 ring-navy/10" role="status">
      <p className="text-lg font-semibold text-navy">Purifiers will be listed here shortly.</p>
      <p className="mt-2 text-muted">{children}</p>
      <WhatsAppLink message="Hi, I'd like help choosing an Auliv purifier" className="mt-5" />
    </div>
  );
}
