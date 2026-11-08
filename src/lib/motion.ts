import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const VIEWPORT = { once: true, amount: 0.2 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function stagger(gap = 0.08, delay = 0): Variants {
  return { hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } };
}

/** Props for a container whose `fadeUp` children stagger in on first view. */
export function staggerInView(gap?: number, delay?: number) {
  return {
    variants: stagger(gap, delay),
    initial: "hidden",
    whileInView: "show",
    viewport: VIEWPORT,
  } as const;
}
