import { m, type MotionStyle } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { productPhoto, type Product } from "@/data/products";
import { formatInr, waLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  imageStyle,
  stage = "tint",
}: {
  product: Product;
  imageStyle?: MotionStyle;
  /** Photo panel colour: "tint" on white sections, "white" on tinted ones so cards keep their edge. */
  stage?: "tint" | "white";
}) {
  const photo = productPhoto(product.name);
  const savings = Math.round((1 - product.price / product.mrp) * 100);

  return (
    <article className="group flex h-full flex-col">
      <div
        className={cn(
          "relative aspect-[4/5] overflow-hidden rounded-[1.75rem]",
          stage === "white"
            ? "bg-[linear-gradient(180deg,#ffffff_0%,#eef3f6_100%)] shadow-[0_24px_50px_-36px_rgba(7,28,44,0.35)] ring-1 ring-platinum/60"
            : "bg-[linear-gradient(180deg,#f4f8fa_0%,#e2e9ee_100%)]",
        )}
      >
        <span
          className="absolute bottom-[10%] left-1/2 h-6 w-3/5 -translate-x-1/2 rounded-[50%] bg-navy/20 blur-2xl transition-all duration-700 group-hover:w-1/2 group-hover:bg-navy/12"
          aria-hidden="true"
        />
        {product.badge && (
          <span className="absolute top-5 left-5 z-10 rounded-full bg-white/85 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.14em] text-navy ring-1 ring-platinum/70 backdrop-blur">
            {product.badge}
          </span>
        )}
        {photo && (
          <div className="h-full w-full mix-blend-multiply transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.04]">
            <m.img
              src={photo}
              alt={`${product.name} water purifier`}
              width={720}
              height={720}
              loading="lazy"
              decoding="async"
              draggable={false}
              style={imageStyle}
              className="h-full w-full object-contain p-8 select-none"
            />
          </div>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4 px-1">
        <div className="min-w-0">
          <h3 className="font-display text-lg leading-snug font-semibold tracking-tight text-navy">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-1 text-sm text-muted">{product.description}</p>
        </div>
        <div className="shrink-0 text-right tabular-nums">
          <p className="font-display text-lg font-semibold tracking-tight text-navy">
            <span className="sr-only">Price </span>
            {formatInr(product.price)}
          </p>
          <p className="mt-1 text-xs text-muted/70">
            <span className="sr-only">MRP </span>
            <span className="line-through">{formatInr(product.mrp)}</span>
            {savings > 0 && <span className="ml-1.5 font-semibold text-emerald-600">−{savings}%</span>}
          </p>
        </div>
      </div>

      <a
        href={waLink(`Hi, I'm interested in ${product.name}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="group/cta mt-4 inline-flex items-center gap-2 self-start px-1 text-sm font-semibold text-navy focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover/cta:bg-[length:100%_1.5px]">
          Enquire on WhatsApp
        </span>
        <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" aria-hidden="true" />
        <span className="sr-only"> about {product.name} (opens in a new tab)</span>
      </a>
    </article>
  );
}
