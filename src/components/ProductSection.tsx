import type { ReactNode } from "react";
import { ProductCard } from "@/components/ProductCard";
import { WaveDivider } from "@/components/WaveDivider";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import type { Product } from "@/data/products";

export function ProductSection({
  id,
  eyebrow,
  title,
  lede,
  products,
  tone,
  waveClass,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede: string;
  products: Product[];
  tone: "plain" | "tinted";
  waveClass: string;
}) {
  return (
    <section id={id} className={tone === "tinted" ? "bg-foam" : "bg-white"}>
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.14em] text-brand-deep uppercase">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{title}</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">{lede}</p>
        </div>
        {products.length === 0 ? (
          <EmptyCatalog>{lede}</EmptyCatalog>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
      <WaveDivider fillClass={waveClass} />
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
