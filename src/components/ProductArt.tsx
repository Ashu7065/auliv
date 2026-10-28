import { useId } from "react";
import type { ArtKind } from "@/data/products";

type ProductArtProps = {
  kind: ArtKind;
  accent: string;
  label: string;
};

export function ProductArt({ kind, accent, label }: ProductArtProps) {
  const id = useId().replace(/:/g, "");
  const body = `${id}-body`;
  const tank = `${id}-tank`;
  const steel = `${id}-steel`;

  return (
    <svg viewBox="0 0 360 400" role="img" aria-label={label} className="h-full w-full">
      <title>{label}</title>
      <defs>
        <linearGradient id={body} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e5f2f6" />
        </linearGradient>
        <linearGradient id={tank} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3fdff" />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>
        <linearGradient id={steel} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8b9da8" />
          <stop offset="38%" stopColor="#f7fbfc" />
          <stop offset="68%" stopColor="#c5d0d6" />
          <stop offset="100%" stopColor="#7d919c" />
        </linearGradient>
      </defs>
      <circle cx="180" cy="200" r="148" fill={accent} opacity="0.1" />
      <ellipse cx="180" cy="368" rx="108" ry="12" fill="#0A2540" opacity="0.08" />
      {kind === "commercial" && <CommercialBody accent={accent} body={body} />}
      {kind === "dispenser" && <DispenserBody accent={accent} body={body} />}
      {(kind === "elixir-steel" || kind === "elixir-abs") && (
        <ElixirBody accent={accent} steel={steel} body={body} metal={kind === "elixir-steel"} />
      )}
      {(kind === "residential" || kind === "iot") && (
        <HomeBody accent={accent} body={body} tank={tank} iot={kind === "iot"} />
      )}
    </svg>
  );
}

function HomeBody({
  accent,
  body,
  tank,
  iot,
}: {
  accent: string;
  body: string;
  tank: string;
  iot: boolean;
}) {
  return (
    <g>
      {iot && (
        <g>
          <path
            d="M62 150c-12-10-12-24 0-34"
            fill="none"
            stroke={accent}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M50 142c-16-14-16-34 0-48"
            fill="none"
            stroke={accent}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.55"
          />
          <rect x="70" y="156" width="42" height="74" rx="8" fill="#fff" stroke="#0A2540" strokeOpacity="0.12" />
          <rect x="76" y="164" width="30" height="44" rx="3" fill="#0A2540" />
          <rect x="82" y="172" width="18" height="3" rx="1.5" fill={accent} />
          <rect x="82" y="180" width="12" height="3" rx="1.5" fill="#6E8AA0" />
          <circle cx="91" cy="218" r="3" fill={accent} />
        </g>
      )}
      <rect x="128" y="58" width="104" height="52" rx="22" fill={`url(#${tank})`} />
      <rect x="146" y="70" width="68" height="8" rx="4" fill="#fff" opacity="0.55" />
      <rect x="118" y="98" width="124" height="220" rx="28" fill={`url(#${body})`} stroke="#0A2540" strokeOpacity="0.1" />
      <path d="M118 126c0-16 14-28 28-28h68c14 0 28 12 28 28v18H118v-18z" fill={accent} />
      <path d="M132 108h40" stroke="#fff" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
      <rect x="146" y="160" width="68" height="34" rx="8" fill="#0A2540" />
      <circle cx="164" cy="177" r="4.5" fill={accent} />
      <rect x="176" y="170" width="28" height="4" rx="2" fill="#8CEBFA" />
      <rect x="176" y="179" width="18" height="4" rx="2" fill="#355872" />
      <rect x="144" y="210" width="72" height="62" rx="14" fill="#f4fbfd" stroke={accent} strokeOpacity="0.55" />
      <path
        d="M158 230c8 8 16 8 24 0s16-8 24 0"
        fill="none"
        stroke={accent}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M158 246c8 8 16 8 24 0s16-8 24 0"
        fill="none"
        stroke="#0A2540"
        strokeOpacity="0.28"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <rect x="136" y="286" width="88" height="12" rx="6" fill="#d5e3ea" />
      <path
        d="M242 176h26c12 0 20 8 20 18v8"
        fill="none"
        stroke="#d5e2e8"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M242 176h26c12 0 20 8 20 18v8"
        fill="none"
        stroke="#f7fbfc"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M278 214c2 10 10 16 10 16s8-6 10-16c-3-3-8-7-10-7s-7 4-10 7z" fill={accent} />
    </g>
  );
}

function CommercialBody({ accent, body }: { accent: string; body: string }) {
  return (
    <g>
      <rect x="78" y="78" width="204" height="250" rx="24" fill={`url(#${body})`} stroke="#0A2540" strokeOpacity="0.1" />
      <path d="M78 108c0-16 14-30 30-30h144c16 0 30 14 30 30v16H78v-16z" fill={accent} />
      <rect x="108" y="140" width="144" height="36" rx="8" fill="#0A2540" />
      <circle cx="128" cy="158" r="5" fill={accent} />
      <rect x="142" y="152" width="46" height="5" rx="2.5" fill="#8CEBFA" />
      <rect x="142" y="162" width="28" height="4" rx="2" fill="#355872" />
      <rect x="102" y="196" width="72" height="88" rx="12" fill="#f4fbfd" stroke={accent} strokeOpacity="0.4" />
      <rect x="186" y="196" width="72" height="88" rx="12" fill="#f4fbfd" stroke="#0A2540" strokeOpacity="0.08" />
      <path d="M118 218h28M118 232h18" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <path d="M202 218h28M202 232h18" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <rect x="96" y="300" width="168" height="14" rx="7" fill="#d5e3ea" />
      <path d="M282 210h22c8 0 12 6 12 12v10" fill="none" stroke="#d5e2e8" strokeWidth="10" strokeLinecap="round" />
      <path d="M310 242c2 8 8 12 8 12s6-4 8-12c-2-2-6-5-8-5s-6 3-8 5z" fill={accent} />
    </g>
  );
}

function DispenserBody({ accent, body }: { accent: string; body: string }) {
  return (
    <g>
      <rect x="104" y="64" width="152" height="260" rx="26" fill={`url(#${body})`} stroke="#0A2540" strokeOpacity="0.1" />
      <path d="M104 96c0-18 16-32 32-32h88c16 0 32 14 32 32v14H104V96z" fill={accent} />
      <rect x="132" y="122" width="96" height="40" rx="8" fill="#0A2540" />
      <rect x="146" y="134" width="40" height="6" rx="3" fill="#8CEBFA" />
      <rect x="146" y="146" width="24" height="5" rx="2.5" fill="#355872" />
      <circle cx="214" cy="140" r="5" fill="#E07A62" />
      <circle cx="214" cy="154" r="5" fill={accent} />
      <g fill="none" stroke="#c5d4dc" strokeWidth="7" strokeLinecap="round">
        <path d="M148 196v28" />
        <path d="M180 196v28" />
        <path d="M212 196v28" />
      </g>
      <circle cx="148" cy="190" r="6" fill="#E07A62" />
      <circle cx="180" cy="190" r="6" fill="#0A2540" />
      <circle cx="212" cy="190" r="6" fill={accent} />
      <rect x="124" y="268" width="112" height="16" rx="6" fill="#d7e4ea" />
      <rect x="118" y="292" width="124" height="14" rx="7" fill="#0A2540" opacity="0.12" />
    </g>
  );
}

function ElixirBody({
  accent,
  steel,
  body,
  metal,
}: {
  accent: string;
  steel: string;
  body: string;
  metal: boolean;
}) {
  const fill = metal ? `url(#${steel})` : `url(#${body})`;
  return (
    <g>
      <ellipse cx="180" cy="86" rx="62" ry="18" fill={metal ? "#d5dee4" : "#ffffff"} stroke="#0A2540" strokeOpacity="0.08" />
      <path d="M118 86h124v210c0 28-28 48-62 48s-62-20-62-48V86z" fill={fill} stroke="#0A2540" strokeOpacity="0.1" />
      <path d="M138 86v210c0 16 18 28 42 28" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="8" />
      <rect x="138" y="150" width="84" height="72" rx="16" fill="#071824" opacity={metal ? 0.35 : 0.08} />
      <path
        d="M156 170v36M170 162v52M184 170v36M198 164v46"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      />
      <rect x="128" y="246" width="104" height="16" rx="8" fill={accent} />
      <rect x="150" y="300" width="60" height="10" rx="5" fill="#0A2540" opacity="0.12" />
    </g>
  );
}
