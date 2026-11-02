import { domAnimation, LazyMotion, m, MotionConfig } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import { EASE, VIEWPORT } from "@/lib/motion";

/** Loads only the DOM animation features and honours the visitor's reduced-motion setting. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: EASE }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

/** Fades its content up the first time it scrolls into view. */
export function Reveal({ delay = 0, ...props }: ComponentProps<typeof m.div> & { delay?: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...props}
    />
  );
}
