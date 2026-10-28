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
      viewBox="0 0 1440 88"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("block h-14 w-full md:h-16", className)}
    >
      <path
        className="fill-brand/35"
        d="M0 36c160 26 320 34 500 16s340-42 520-18 280 30 420 18v36H0Z"
      />
      <path className={fillClass} d="M0 52c200 22 380-10 620 6s400 18 560 2 180-10 260-2v30H0Z" />
    </svg>
  );
}
