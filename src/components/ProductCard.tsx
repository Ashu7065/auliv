import { WhatsAppLink } from "@/components/WhatsAppLink";
import { productPhoto, type Product } from "@/data/products";
import { formatInr } from "@/lib/contact";

export function ProductCard({ product }: { product: Product }) {
  const photo = productPhoto(product.name, product.photo);
  const price = product.price;
  const mrp = product.mrp;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_16px_40px_-28px_rgba(10,37,64,0.45)] ring-1 ring-navy/5">
      <div className="relative aspect-square bg-white">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-brand px-2.5 py-1 text-xs font-semibold tracking-wide text-navy">
            {product.badge}
          </span>
        )}
        {photo && (
          <img
            src={photo}
            alt={`${product.name} water purifier`}
            width={1024}
            height={1024}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg leading-snug font-semibold text-navy">{product.name}</h3>
          <p className="mt-1 text-sm leading-5 text-muted">{product.description}</p>
        </div>
        <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          {price != null && mrp != null ? (
            <>
              <p className="text-2xl font-semibold tracking-tight text-navy">
                <span className="sr-only">Price </span>
                {formatInr(price)}
              </p>
              <p className="text-sm text-muted">
                MRP <span className="line-through">{formatInr(mrp)}</span>
              </p>
            </>
          ) : (
            <p className="text-2xl font-semibold tracking-tight text-navy">
              <span className="sr-only">Price </span>
              Ask on WhatsApp
            </p>
          )}
        </div>
        <WhatsAppLink message={`Hi, I'm interested in ${product.name}`} className="w-full" />
      </div>
    </article>
  );
}
