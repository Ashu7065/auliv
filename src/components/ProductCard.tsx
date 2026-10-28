import { ProductArt } from "@/components/ProductArt";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { accentFor, productPhoto, type Product } from "@/data/products";
import { formatInr } from "@/lib/contact";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const photo = productPhoto(product.name);
  const accent = accentFor(index);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_16px_40px_-28px_rgba(10,37,64,0.55)] ring-1 ring-navy/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-24px_rgba(10,37,64,0.45)] motion-reduce:transform-none motion-reduce:transition-none">
      <div className="relative aspect-[5/4] bg-gradient-to-b from-mist to-white">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-brand px-2.5 py-1 text-xs font-semibold tracking-wide text-navy">
            {product.badge}
          </span>
        )}
        {photo ? (
          <img
            src={photo}
            alt={`${product.name} water purifier`}
            className="h-full w-full object-contain p-4"
          />
        ) : (
          <ProductArt
            kind={product.art}
            accent={accent}
            label={`Illustrated ${product.name} purifier`}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg leading-snug font-semibold text-navy">{product.name}</h3>
        <p className="text-sm leading-6 text-muted">{product.description}</p>
        <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 pt-2">
          <p className="text-xl font-semibold text-navy">
            <span className="sr-only">Price </span>
            {formatInr(product.price)}
          </p>
          <p className="text-sm text-muted">
            MRP <span className="line-through">{formatInr(product.mrp)}</span>
          </p>
        </div>
        <WhatsAppLink
          message={`Hi, I'm interested in ${product.name}`}
          className="mt-2 w-full"
        />
      </div>
    </article>
  );
}
