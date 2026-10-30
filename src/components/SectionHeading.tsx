import type { ReactNode } from "react";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  as: Heading = "h2",
  align = "center",
  tone = "light",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  as?: "h1" | "h2";
  align?: "center" | "left";
  tone?: "light" | "dark";
  children?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <Reveal className={cn("max-w-2xl", centered && "mx-auto text-center")}>
      <p
        className={cn(
          "inline-flex items-center gap-2 text-sm font-semibold tracking-[0.18em] uppercase",
          tone === "dark" ? "text-brand" : "text-brand-deep",
        )}
      >
        <Drop />
        {eyebrow}
        {centered && <Drop />}
      </p>
      <Heading
        className={cn(
          "mt-3 text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]",
          tone === "dark" ? "text-white" : "text-navy",
        )}
      >
        {title}
      </Heading>
      {lede && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            tone === "dark" ? "text-white/75" : "text-muted",
          )}
        >
          {lede}
        </p>
      )}
      {children}
    </Reveal>
  );
}

function Drop() {
  return (
    <svg viewBox="0 0 12 16" className="h-3.5 w-auto fill-current" aria-hidden="true">
      <path d="M6 0C6 0 0 7.2 0 10.4A6 6 0 0 0 12 10.4C12 7.2 6 0 6 0Z" />
    </svg>
  );
}
