import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductCarousel({ products, label }: { products: Product[]; label: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  function sync() {
    const el = scrollerRef.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (!el || !card) return;
    const styles = getComputedStyle(el);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const step = card.offsetWidth + gap;
    const max = el.scrollWidth - el.clientWidth;
    const end = el.scrollLeft >= max - 4;
    const next = end ? products.length - 1 : Math.round(el.scrollLeft / step);
    setAtEnd(end);
    setIndex(Math.min(products.length - 1, Math.max(0, next)));
  }

  function scrollToIndex(nextIndex: number) {
    const el = scrollerRef.current;
    const card = el?.querySelectorAll<HTMLElement>("[data-card]")[nextIndex];
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: card.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label={`Previous ${label}`}
          disabled={index === 0}
          onClick={() => scrollToIndex(index - 1)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-navy/15 bg-white text-navy transition-colors hover:border-brand hover:bg-brand hover:text-navy disabled:pointer-events-none disabled:opacity-35"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={`Next ${label}`}
          disabled={atEnd || index >= products.length - 1}
          onClick={() => scrollToIndex(index + 1)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-navy/15 bg-white text-navy transition-colors hover:border-brand hover:bg-brand hover:text-navy disabled:pointer-events-none disabled:opacity-35"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        tabIndex={0}
        onScroll={sync}
        aria-label={label}
        className="relative flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-1 overscroll-x-contain pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.name}
            data-card
            className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2.15)] lg:w-[calc((100%-2.5rem)/3.2)]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {products.map((product, dot) => (
          <button
            key={product.name}
            type="button"
            aria-label={`Show ${product.name}`}
            aria-current={dot === index ? "true" : undefined}
            onClick={() => scrollToIndex(dot)}
            className={cn(
              "size-2.5 rounded-full transition-colors",
              dot === index ? "bg-brand" : "bg-navy/20 hover:bg-brand/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}
