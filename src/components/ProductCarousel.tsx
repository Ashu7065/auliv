import {
  AnimatePresence,
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/data/products";
import { EASE, VIEWPORT } from "@/lib/motion";

/** Left inset that lines the first card up with the page container (max-w-7xl, px-4 / md:px-6). */
const GUTTER = "[--gutter:1rem] md:[--gutter:max(1.5rem,calc((100vw-80rem)/2+1.5rem))]";

const slideIn: Variants = {
  hidden: { opacity: 0, x: 80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
};

export function ProductCarousel({
  products,
  label,
  end,
  stage,
}: {
  products: Product[];
  label: string;
  stage?: "tint" | "white";
  /** Optional closing slide after the products, such as a link to the full range. */
  end?: ReactNode;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const { scrollXProgress } = useScroll({ container: scrollerRef, axis: "x" });
  const progress = useSpring(scrollXProgress, { stiffness: 140, damping: 30 });
  const drag = useDragToScroll(scrollerRef);
  const cursor = useDragCursor();

  function anchor(el: HTMLElement) {
    const padding = Number.parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    return el.getBoundingClientRect().left + padding;
  }

  function sync() {
    const el = scrollerRef.current;
    if (!el) return;
    const base = anchor(el);
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
    let nearest = 0;
    let distance = Number.POSITIVE_INFINITY;
    cards.forEach((card, cardIndex) => {
      const gap = Math.abs(card.getBoundingClientRect().left - base);
      if (gap < distance) {
        distance = gap;
        nearest = cardIndex;
      }
    });
    const end = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
    setAtEnd(end);
    setIndex(end ? products.length - 1 : nearest);
  }

  function scrollToIndex(nextIndex: number) {
    const el = scrollerRef.current;
    const card = el?.querySelectorAll<HTMLElement>("[data-card]")[nextIndex];
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!card) {
      // Past the last product: glide to the end so a closing slide comes into view.
      el.scrollTo({ left: el.scrollWidth, behavior: reduce ? "auto" : "smooth" });
      return;
    }
    el.scrollTo({
      left: el.scrollLeft + card.getBoundingClientRect().left - anchor(el),
      behavior: reduce ? "auto" : "smooth",
    });
  }

  return (
    <div className="mt-12">
      <div className={`relative mx-[calc(50%-50vw)] ${GUTTER}`}>
        <m.div
          ref={scrollerRef}
          tabIndex={0}
          onScroll={sync}
          aria-label={label}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          {...drag.handlers}
          {...cursor.handlers}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-4 pl-(--gutter) scroll-pl-(--gutter) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-inset md:gap-7 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [@media(pointer:fine)]:cursor-none [&_a]:cursor-pointer"
        >
          {products.map((product) => (
            <Slide key={product.name} product={product} scrollerRef={scrollerRef} stage={stage} />
          ))}
          {end && (
            <m.div
              variants={slideIn}
              className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[clamp(19rem,27vw,25rem)]"
            >
              {end}
            </m.div>
          )}
          <div className="w-[calc(var(--gutter)-1.25rem)] shrink-0 md:w-[calc(var(--gutter)-1.75rem)]" aria-hidden="true" />
        </m.div>
        <DragCursor {...cursor.state} />
      </div>

      <div className="mt-10 flex items-center gap-6">
        <p className="w-16 shrink-0 font-display text-sm font-semibold text-navy tabular-nums" aria-live="polite">
          {String(index + 1).padStart(2, "0")}
          <span className="text-muted/50"> / {String(products.length).padStart(2, "0")}</span>
        </p>
        <div className="relative h-px flex-1 bg-navy/10" aria-hidden="true">
          <m.div className="absolute inset-y-[-0.5px] left-0 w-full origin-left bg-navy" style={{ scaleX: progress }} />
        </div>
        <div className="flex shrink-0 gap-2">
          <ArrowButton label={`Previous ${label}`} disabled={index === 0} onClick={() => scrollToIndex(index - 1)}>
            <ArrowLeft className="size-5" aria-hidden="true" />
          </ArrowButton>
          <ArrowButton
            label={`Next ${label}`}
            disabled={atEnd || (!end && index >= products.length - 1)}
            onClick={() => scrollToIndex(index + 1)}
          >
            <ArrowRight className="size-5" aria-hidden="true" />
          </ArrowButton>
        </div>
      </div>
    </div>
  );
}

/** One card. It eases up to full size as it enters and its photo drifts slightly against the scroll. */
function Slide({
  product,
  scrollerRef,
  stage,
}: {
  product: Product;
  scrollerRef: RefObject<HTMLDivElement | null>;
  stage?: "tint" | "white";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollXProgress } = useScroll({
    container: scrollerRef,
    target: ref,
    axis: "x",
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollXProgress, [0, 0.22, 0.8, 1], [0.9, 1, 1, 0.94]);
  const opacity = useTransform(scrollXProgress, [0, 0.18, 0.85, 1], [0.35, 1, 1, 0.5]);
  const imageX = useTransform(scrollXProgress, [0, 1], ["9%", "-9%"]);

  return (
    <m.div
      ref={ref}
      data-card
      variants={slideIn}
      className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[clamp(19rem,27vw,25rem)]"
    >
      <m.div style={reduce ? undefined : { scale, opacity }} className="h-full origin-bottom">
        <ProductCard product={product} stage={stage} imageStyle={reduce ? undefined : { x: imageX }} />
      </m.div>
    </m.div>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="group inline-flex size-14 items-center justify-center rounded-full border border-platinum text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-30"
    >
      <span className="transition-transform duration-300 group-hover:scale-110">{children}</span>
    </button>
  );
}

/** Mouse drag-to-scroll with a short glide. Touch and trackpads keep native scrolling. */
function useDragToScroll(ref: RefObject<HTMLDivElement | null>) {
  const moved = useRef(false);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse" || event.button !== 0) return;
    const startX = event.clientX;
    const startScroll = el.scrollLeft;
    let lastX = startX;
    let lastTime = performance.now();
    let velocity = 0;
    moved.current = false;

    const onMove = (move: PointerEvent) => {
      const delta = move.clientX - startX;
      if (!moved.current && Math.abs(delta) < 6) return;
      if (!moved.current) {
        moved.current = true;
        el.style.scrollSnapType = "none";
        el.style.scrollBehavior = "auto";
      }
      const now = performance.now();
      velocity = (move.clientX - lastX) / Math.max(1, now - lastTime);
      lastX = move.clientX;
      lastTime = now;
      el.scrollLeft = startScroll - delta;
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (!moved.current) return;
      const target = el.scrollLeft - velocity * 280;
      el.style.scrollBehavior = "";
      el.scrollTo({ left: target, behavior: "smooth" });
      const restore = () => {
        el.style.scrollSnapType = "";
        el.removeEventListener("scrollend", restore);
      };
      el.addEventListener("scrollend", restore);
      window.setTimeout(restore, 700);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  function onClickCapture(event: ReactMouseEvent) {
    if (moved.current) {
      event.preventDefault();
      event.stopPropagation();
      moved.current = false;
    }
  }

  return { handlers: { onPointerDown, onClickCapture } };
}

/** A small glass cursor with drag arrows that follows the mouse over the carousel and becomes a dot over links. */
function useDragCursor() {
  const spring = { stiffness: 500, damping: 40, mass: 0.4 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  const [visible, setVisible] = useState(false);
  const [overLink, setOverLink] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [fine] = useState(() => window.matchMedia("(pointer: fine)").matches);

  function onPointerDownCapture(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    setPressed(true);
    window.addEventListener("pointerup", () => setPressed(false), { once: true });
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    if (visible) {
      x.set(event.clientX);
      y.set(event.clientY);
    } else {
      // Start under the pointer instead of gliding in from the corner.
      x.jump(event.clientX);
      y.jump(event.clientY);
      setVisible(true);
    }
    setOverLink(Boolean((event.target as HTMLElement).closest("a, button")));
  }

  return {
    handlers: { onPointerMove, onPointerDownCapture, onPointerLeave: () => setVisible(false) },
    state: { x, y, visible: fine && visible, overLink, pressed },
  };
}

function DragCursor({
  x,
  y,
  visible,
  overLink,
  pressed,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  visible: boolean;
  overLink: boolean;
  pressed: boolean;
}) {
  const spread = pressed ? 3 : 0;

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: overLink ? 0.18 : pressed ? 0.88 : 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
          style={{ left: x, top: y }}
          className={`pointer-events-none fixed z-50 -mt-7 -ml-7 flex size-14 items-center justify-center rounded-full backdrop-blur-md transition-colors duration-300 ${
            overLink
              ? "bg-brand"
              : "bg-white/85 text-navy shadow-[0_10px_30px_-10px_rgba(7,28,44,0.45)] ring-1 ring-navy/10"
          }`}
        >
          {!overLink && (
            <span className="flex items-center gap-1.5">
              <m.span animate={{ x: -spread }} transition={{ duration: 0.2 }}>
                <ChevronLeft className="size-3.5" strokeWidth={2.2} />
              </m.span>
              <span className="size-1 rounded-full bg-brand-deep" />
              <m.span animate={{ x: spread }} transition={{ duration: 0.2 }}>
                <ChevronRight className="size-3.5" strokeWidth={2.2} />
              </m.span>
            </span>
          )}
        </m.div>
      )}
    </AnimatePresence>
  );
}
