import { m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Pill tabs with a highlight that slides to the chosen option. */
export function Segmented({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { label: string; count: number }[];
  value: number;
  onChange: (index: number) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; width: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      const button = listRef.current?.querySelectorAll<HTMLElement>("button")[value];
      if (button) setPill({ x: button.offsetLeft, width: button.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [value]);

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={label}
      className="relative inline-flex rounded-full bg-pearl p-1.5 ring-1 ring-platinum/70"
    >
      {pill && (
        <m.span
          aria-hidden="true"
          className="absolute inset-y-1.5 left-0 rounded-full bg-navy shadow-[0_8px_20px_-10px_rgba(7,28,44,0.6)]"
          initial={false}
          animate={{ x: pill.x, width: pill.width }}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
        />
      )}
      {options.map((option, index) => (
        <button
          key={option.label}
          type="button"
          role="tab"
          aria-selected={index === value}
          onClick={() => onChange(index)}
          className={cn(
            "relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
            index === value ? "text-white" : "text-navy/60 hover:text-navy",
          )}
        >
          {option.label}
          <span
            className={cn(
              "text-xs tabular-nums transition-colors",
              index === value ? "text-brand" : "text-navy/35",
            )}
          >
            {option.count}
          </span>
        </button>
      ))}
    </div>
  );
}
