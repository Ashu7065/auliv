import { cn } from "@/lib/utils";

export function WaveDivider({
  fillClass,
  className,
}: {
  fillClass: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 96"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("block h-14 w-full md:h-20", className)}
    >
      <path
        className="fill-brand/25"
        d="M0 68c180 28 320-36 520-12s360 40 540 8 280-36 380-8v40H0Z"
      />
      <path className={fillClass} d="M0 46c220 42 380-28 620 4s390 36 600 2 180-24 220-8v52H0Z" />
    </svg>
  );
}
