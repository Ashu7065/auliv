import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/data/products";

export function CatalogPage({
  eyebrow,
  title,
  lede,
  products,
  tone,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  products: Product[];
  tone: "plain" | "tinted";
}) {
  return (
    <section className={tone === "tinted" ? "bg-foam" : "bg-white"}>
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.14em] text-brand-deep uppercase">{eyebrow}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{title}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted">{lede}</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
