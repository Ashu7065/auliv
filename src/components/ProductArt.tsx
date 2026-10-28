import { useId } from "react";
import type { ArtKind } from "@/data/products";

const COPPER = "#C4783A";

type ProductArtProps = {
  kind: ArtKind;
  accent: string;
  label: string;
};

type Paint = {
  accent: string;
  body: string;
  tank: string;
  steel: string;
};

export function ProductArt({ kind, accent, label }: ProductArtProps) {
  const id = useId().replace(/:/g, "");
  const paint: Paint = {
    accent,
    body: `${id}-body`,
    tank: `${id}-tank`,
    steel: `${id}-steel`,
  };

  return (
    <svg viewBox="0 0 360 400" role="img" aria-label={label} className="h-full w-full">
      <title>{label}</title>
      <defs>
        <linearGradient id={paint.body} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e4f1f5" />
        </linearGradient>
        <linearGradient id={paint.tank} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4fdff" />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>
        <linearGradient id={paint.steel} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8b9da8" />
          <stop offset="38%" stopColor="#f7fbfc" />
          <stop offset="68%" stopColor="#c5d0d6" />
          <stop offset="100%" stopColor="#7d919c" />
        </linearGradient>
      </defs>
      <circle cx="180" cy="206" r="146" fill={accent} opacity="0.1" />
      <ellipse cx="180" cy="368" rx="112" ry="12" fill="#0A2540" opacity="0.08" />
      <Unit kind={kind} paint={paint} />
    </svg>
  );
}

function Unit({ kind, paint }: { kind: ArtKind; paint: Paint }) {
  switch (kind) {
    case "iot-supreme-2y":
      return <IotUnit paint={paint} copper warranty />;
    case "iot-ace-2y":
      return <IotUnit paint={paint} countertop warranty />;
    case "iot-supreme":
      return <IotUnit paint={paint} copper />;
    case "iot-ace":
      return <IotUnit paint={paint} countertop />;
    case "new-grand":
      return <GrandUnit paint={paint} size="new" />;
    case "grand":
      return <GrandUnit paint={paint} size="classic" />;
    case "grand-plus":
      return <GrandUnit paint={paint} size="plus" />;
    case "sapphire":
      return <SapphireUnit paint={paint} />;
    case "crown":
      return <CrownUnit paint={paint} />;
    case "elegant":
      return <ElegantUnit paint={paint} />;
    case "supreme":
      return <SupremeUnit paint={paint} />;
    case "ace":
      return <AceUnit paint={paint} />;
    case "marvel":
      return <MarvelUnit paint={paint} />;
    case "elite":
      return <EliteUnit paint={paint} />;
    case "elite-plus":
      return <ElitePlusUnit paint={paint} />;
    case "elite-heavy":
      return <EliteHeavyUnit paint={paint} />;
    case "galaxy":
      return <GalaxyUnit paint={paint} />;
    case "perk":
      return <PerkUnit paint={paint} />;
    case "dispenser":
      return <DispenserUnit paint={paint} />;
    case "elixir-steel":
      return <ElixirSteelUnit paint={paint} />;
    case "elixir-abs":
      return <ElixirAbsUnit paint={paint} />;
    default:
      return <GrandUnit paint={paint} size="classic" />;
  }
}

function Faucet({ x, y, accent, scale = 1 }: { x: number; y: number; accent: string; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0 0h24c12 0 18 8 18 16v6" fill="none" stroke="#d5e2e8" strokeWidth="11" strokeLinecap="round" />
      <path d="M0 0h24c12 0 18 8 18 16v6" fill="none" stroke="#f7fbfc" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M36 30c2 9 9 14 9 14s7-5 9-14c-3-3-7-6-9-6s-6 3-9 6z" fill={accent} />
    </g>
  );
}

function Phone({ x, y, accent }: { x: number; y: number; accent: string }) {
  return (
    <g>
      <path d={`M${x - 8} ${y + 8}c-12-10-12-26 0-36`} fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <path
        d={`M${x - 18} ${y + 2}c-16-14-16-36 0-50`}
        fill="none"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />
      <rect x={x} y={y} width="40" height="70" rx="8" fill="#fff" stroke="#0A2540" strokeOpacity="0.12" />
      <rect x={x + 5} y={y + 8} width="30" height="42" rx="3" fill="#0A2540" />
      <rect x={x + 10} y={y + 16} width="16" height="3" rx="1.5" fill={accent} />
      <rect x={x + 10} y={y + 24} width="11" height="3" rx="1.5" fill="#6E8AA0" />
      <circle cx={x + 20} cy={y + 58} r="3" fill={accent} />
    </g>
  );
}

function IotUnit({
  paint,
  copper = false,
  countertop = false,
  warranty = false,
}: {
  paint: Paint;
  copper?: boolean;
  countertop?: boolean;
  warranty?: boolean;
}) {
  const { accent, body } = paint;
  const top = countertop ? 78 : 62;
  return (
    <g>
      <Phone x={46} y={countertop ? 150 : 132} accent={accent} />
      <rect x="118" y={top} width="112" height={countertop ? 200 : 230} rx="26" fill={`url(#${body})`} stroke="#0A2540" strokeOpacity="0.1" />
      <path
        d={`M118 ${top + 28}c0-16 14-28 28-28h56c14 0 28 12 28 28v16H118v-16z`}
        fill={accent}
      />
      {copper && <rect x="118" y={top + 44} width="112" height="10" fill={COPPER} />}
      <rect x="142" y={top + 66} width="64" height="30" rx="8" fill="#0A2540" />
      <circle cx="158" cy={top + 81} r="4" fill={accent} />
      <rect x="170" y={top + 76} width="26" height="4" rx="2" fill="#8CEBFA" />
      <rect x="170" y={top + 84} width="16" height="3" rx="1.5" fill="#355872" />
      <rect x="140" y={top + 110} width="68" height="46" rx="12" fill="#f4fbfd" stroke={accent} strokeOpacity="0.5" />
      <path d="M154 196h40M154 208h28" stroke={accent} strokeWidth="3" strokeLinecap="round" transform={`translate(0 ${countertop ? 8 : 0})`} />
      {countertop && (
        <g>
          <rect x="128" y="286" width="14" height="28" rx="4" fill="#d5e3ea" />
          <rect x="206" y="286" width="14" height="28" rx="4" fill="#d5e3ea" />
          <rect x="112" y="308" width="124" height="10" rx="5" fill="#c5d5de" />
        </g>
      )}
      {warranty && (
        <g>
          <rect x="196" y={top + 118} width="36" height="22" rx="11" fill={accent} />
          <text x="214" y={top + 134} textAnchor="middle" fill="#0A2540" fontSize="12" fontWeight="700" fontFamily="Outfit, sans-serif">
            2Y
          </text>
        </g>
      )}
      <Faucet x={230} y={top + 78} accent={accent} scale={0.92} />
    </g>
  );
}

function GrandUnit({ paint, size }: { paint: Paint; size: "new" | "classic" | "plus" }) {
  const { accent, body, tank } = paint;
  const spec = {
    plus: { tankW: 206, tankH: 74, bodyW: 136, bodyH: 198 },
    classic: { tankW: 176, tankH: 64, bodyW: 122, bodyH: 190 },
    new: { tankW: 152, tankH: 60, bodyW: 112, bodyH: 184 },
  }[size];
  const tankX = 180 - spec.tankW / 2;
  const bodyX = 180 - spec.bodyW / 2;
  const tankY = 58;
  const bodyY = tankY + spec.tankH - 4;
  const tankBottom = tankY + spec.tankH;

  return (
    <g>
      <rect
        x={bodyX}
        y={bodyY}
        width={spec.bodyW}
        height={spec.bodyH}
        rx="22"
        fill={`url(#${body})`}
        stroke="#0A2540"
        strokeOpacity="0.1"
      />
      <rect x={bodyX + 16} y={bodyY + 38} width={spec.bodyW - 32} height="24" rx="7" fill="#0A2540" />
      <circle cx={bodyX + 30} cy={bodyY + 50} r="4" fill={accent} />
      <rect x={bodyX + 42} y={bodyY + 46} width="26" height="4" rx="2" fill="#8CEBFA" />
      <rect
        x={bodyX + 14}
        y={bodyY + 76}
        width={spec.bodyW - 28}
        height="48"
        rx="10"
        fill="#f4fbfd"
        stroke={accent}
        strokeOpacity="0.45"
      />
      <path
        d={`M${tankX + 18} ${tankY} h${spec.tankW - 36} a18 18 0 0 1 18 18 V${tankBottom} H${tankX} V${tankY + 18} a18 18 0 0 1 18-18z`}
        fill={`url(#${tank})`}
      />
      <rect x={tankX + 16} y={tankY + 14} width={spec.tankW * 0.42} height="8" rx="4" fill="#fff" opacity="0.65" />
      {size === "new" && (
        <g>
          <circle cx="180" cy={tankY + spec.tankH / 2 + 2} r="9" fill="#fff" />
          <path
            d={`M180 ${tankY + 22}v16M172 ${tankY + 30}h16`}
            stroke={accent}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>
      )}
      <Faucet x={bodyX + spec.bodyW - 10} y={bodyY + 52} accent={accent} scale={size === "plus" ? 0.95 : 0.86} />
    </g>
  );
}

function SapphireUnit({ paint }: { paint: Paint }) {
  const { accent, body } = paint;
  return (
    <g>
      <path
        d="M180 52c46 8 78 48 78 96v62c0 62-34 112-78 124-44-12-78-62-78-124v-62c0-48 32-88 78-96z"
        fill={`url(#${body})`}
        stroke="#0A2540"
        strokeOpacity="0.1"
      />
      <path d="M118 150h124" stroke={COPPER} strokeWidth="12" strokeLinecap="round" />
      <circle cx="180" cy="108" r="16" fill={accent} />
      <circle cx="180" cy="108" r="7" fill="#fff" />
      <rect x="150" y="176" width="60" height="34" rx="10" fill="#0A2540" />
      <rect x="162" y="188" width="28" height="4" rx="2" fill="#8CEBFA" />
      <rect x="162" y="196" width="16" height="3" rx="1.5" fill="#355872" />
      <path d="M156 232c8 8 16 8 24 0s16-8 24 0" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <Faucet x={228} y={168} accent={accent} scale={0.85} />
    </g>
  );
}

function CrownUnit({ paint }: { paint: Paint }) {
  const { accent, body } = paint;
  return (
    <g>
      <path d="M108 128l22-48 20 32 30-46 30 46 20-32 22 48H108z" fill={accent} />
      <circle cx="130" cy="86" r="5" fill={COPPER} />
      <circle cx="180" cy="70" r="5" fill={COPPER} />
      <circle cx="230" cy="86" r="5" fill={COPPER} />
      <rect x="112" y="124" width="136" height="196" rx="22" fill={`url(#${body})`} stroke="#0A2540" strokeOpacity="0.1" />
      <rect x="112" y="168" width="136" height="12" fill={COPPER} />
      <rect x="140" y="196" width="80" height="28" rx="8" fill="#0A2540" />
      <rect x="154" y="206" width="36" height="4" rx="2" fill="#8CEBFA" />
      <rect x="136" y="240" width="88" height="40" rx="12" fill="#f4fbfd" stroke={accent} strokeOpacity="0.4" />
      <Faucet x={236} y={200} accent={accent} scale={0.82} />
    </g>
  );
}

function ElegantUnit({ paint }: { paint: Paint }) {
  const { accent, body } = paint;
  return (
    <g>
      <rect x="148" y="46" width="64" height="286" rx="32" fill={`url(#${body})`} stroke="#0A2540" strokeOpacity="0.1" />
      <rect x="148" y="46" width="64" height="54" rx="32" fill={accent} />
      <rect x="164" y="118" width="32" height="46" rx="8" fill="#0A2540" />
      <rect x="172" y="130" width="16" height="3" rx="1.5" fill="#8CEBFA" />
      <rect x="172" y="138" width="10" height="3" rx="1.5" fill="#355872" />
      <circle cx="180" cy="196" r="10" fill="none" stroke={accent} strokeWidth="3" />
      <circle cx="180" cy="230" r="10" fill="none" stroke={accent} strokeWidth="3" opacity="0.55" />
      <path d="M212 168h18c8 0 12 8 12 14v20" fill="none" stroke="#d5e2e8" strokeWidth="8" strokeLinecap="round" />
      <path d="M236 214c2 8 7 10 7 10s5-3 7-10c-2-2-5-4-7-4s-5 2-7 4z" fill={accent} />
    </g>
  );
}

function SupremeUnit({ paint }: { paint: Paint }) {
  const { accent, body } = paint;
  return (
    <g>
      <rect x="116" y="58" width="128" height="250" rx="24" fill={`url(#${body})`} stroke="#0A2540" strokeOpacity="0.1" />
      <path d="M116 86c0-16 14-28 28-28h72c14 0 28 12 28 28v14H116V86z" fill={accent} />
      <rect x="140" y="116" width="80" height="22" rx="6" fill="#0A2540" />
      {[0, 1, 2, 3].map((step) => (
        <g key={step}>
          <rect x="138" y={156 + step * 28} width="84" height="18" rx="9" fill="#f4fbfd" stroke={accent} strokeOpacity={1 - step * 0.2} />
          <circle cx="154" cy={165 + step * 28} r="4" fill={step === 3 ? COPPER : accent} />
        </g>
      ))}
      <Faucet x={232} y={150} accent={accent} scale={0.86} />
    </g>
  );
}

function AceUnit({ paint }: { paint: Paint }) {
  const { accent, body, tank } = paint;
  return (
    <g>
      <rect x="132" y="88" width="96" height="40" rx="16" fill={`url(#${tank})`} />
      <rect x="124" y="118" width="112" height="168" rx="22" fill={`url(#${body})`} stroke="#0A2540" strokeOpacity="0.1" />
      <rect x="124" y="118" width="112" height="28" rx="14" fill={accent} />
      <rect x="150" y="160" width="60" height="48" rx="10" fill="#071824" opacity="0.85" />
      <path d="M164 172v24M176 166v36M188 172v24" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <rect x="146" y="224" width="68" height="28" rx="8" fill="#f4fbfd" stroke={accent} strokeOpacity="0.4" />
      <rect x="136" y="292" width="16" height="22" rx="4" fill="#d5e3ea" />
      <rect x="208" y="292" width="16" height="22" rx="4" fill="#d5e3ea" />
      <Faucet x={220} y={168} accent={accent} scale={0.78} />
    </g>
  );
}

function MarvelUnit({ paint }: { paint: Paint }) {
  const { accent, body } = paint;
  return (
    <g>
      <rect x="78" y="132" width="188" height="150" rx="22" fill={`url(#${body})`} stroke="#0A2540" strokeOpacity="0.1" />
      <path d="M78 160c0-16 14-28 28-28h132c14 0 28 12 28 28v10H78v-10z" fill={accent} />
      <rect x="78" y="188" width="188" height="14" fill={COPPER} />
      <rect x="108" y="216" width="72" height="28" rx="8" fill="#0A2540" />
      <rect x="120" y="226" width="36" height="4" rx="2" fill="#8CEBFA" />
      <circle cx="210" cy="230" r="14" fill="none" stroke={accent} strokeWidth="3" />
      <rect x="96" y="286" width="22" height="26" rx="6" fill="#d5e3ea" />
      <rect x="226" y="286" width="22" height="26" rx="6" fill="#d5e3ea" />
      <rect x="70" y="308" width="204" height="12" rx="6" fill="#c5d5de" />
    </g>
  );
}

function EliteUnit({ paint }: { paint: Paint }) {
  const { accent, body } = paint;
  return (
    <g>
      <rect x="86" y="72" width="188" height="246" rx="22" fill={`url(#${body})`} stroke="#0A2540" strokeOpacity="0.1" />
      <path d="M86 102c0-16 14-30 30-30h128c16 0 30 14 30 30v14H86v-14z" fill={accent} />
      <rect x="112" y="132" width="136" height="32" rx="8" fill="#0A2540" />
      <circle cx="130" cy="148" r="5" fill={accent} />
      <rect x="144" y="144" width="40" height="4" rx="2" fill="#8CEBFA" />
      <rect x="108" y="184" width="64" height="86" rx="10" fill="#f4fbfd" stroke={accent} strokeOpacity="0.45" />
      <rect x="184" y="184" width="64" height="86" rx="10" fill="#f4fbfd" stroke="#0A2540" strokeOpacity="0.08" />
      <path d="M122 214h36M122 228h24M198 214h36M198 228h24" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <rect x="104" y="286" width="152" height="12" rx="6" fill="#d5e3ea" />
      <Faucet x={262} y={176} accent={accent} scale={0.78} />
    </g>
  );
}

function ElitePlusUnit({ paint }: { paint: Paint }) {
  const { accent, body } = paint;
  return (
    <g>
      <rect x="118" y="64" width="124" height="252" rx="20" fill={`url(#${body})`} stroke="#0A2540" strokeOpacity="0.1" />
      <path d="M118 92c0-16 12-28 28-28h68c16 0 28 12 28 28v12H118V92z" fill="#0A2540" />
      <rect x="142" y="120" width="76" height="26" rx="7" fill={accent} />
      <rect x="140" y="164" width="80" height="100" rx="12" fill="#f4fbfd" stroke={accent} strokeOpacity="0.5" />
      <circle cx="180" cy="198" r="16" fill="none" stroke={accent} strokeWidth="3" />
      <circle cx="180" cy="198" r="5" fill={accent} />
      <rect x="140" y="284" width="80" height="12" rx="6" fill="#d5e3ea" />
      <Faucet x={230} y={176} accent={accent} scale={0.8} />
    </g>
  );
}

function EliteHeavyUnit({ paint }: { paint: Paint }) {
  const { accent, body } = paint;
  return (
    <g>
      <rect x="48" y="96" width="124" height="220" rx="18" fill={`url(#${body})`} stroke="#0A2540" strokeOpacity="0.1" />
      <rect x="188" y="96" width="124" height="220" rx="18" fill={`url(#${body})`} stroke="#0A2540" strokeOpacity="0.1" />
      <rect x="48" y="96" width="124" height="28" rx="14" fill={accent} />
      <rect x="188" y="96" width="124" height="28" rx="14" fill="#0A2540" />
      <rect x="70" y="146" width="80" height="22" rx="6" fill="#0A2540" />
      <rect x="210" y="146" width="80" height="22" rx="6" fill={accent} />
      <rect x="68" y="186" width="84" height="78" rx="10" fill="#f4fbfd" stroke={accent} strokeOpacity="0.4" />
      <rect x="208" y="186" width="84" height="78" rx="10" fill="#f4fbfd" stroke={accent} strokeOpacity="0.4" />
      <rect x="62" y="286" width="96" height="10" rx="5" fill="#d5e3ea" />
      <rect x="202" y="286" width="96" height="10" rx="5" fill="#d5e3ea" />
    </g>
  );
}

function GalaxyUnit({ paint }: { paint: Paint }) {
  const { accent, tank, body } = paint;
  return (
    <g>
      <ellipse cx="180" cy="118" rx="92" ry="28" fill="#d7eef4" />
      <path d="M88 118h184v70c0 36-41 62-92 62s-92-26-92-62v-70z" fill={`url(#${tank})`} />
      <path d="M108 118v70c0 22 32 38 72 38" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="10" />
      <rect x="108" y="248" width="144" height="78" rx="16" fill={`url(#${body})`} stroke="#0A2540" strokeOpacity="0.1" />
      <rect x="128" y="266" width="104" height="18" rx="6" fill="#0A2540" />
      <circle cx="146" cy="275" r="4" fill={accent} />
      <rect x="124" y="300" width="112" height="10" rx="5" fill="#d5e3ea" />
    </g>
  );
}

function PerkUnit({ paint }: { paint: Paint }) {
  const { accent, body } = paint;
  return (
    <g>
      <rect x="102" y="70" width="156" height="230" rx="28" fill={`url(#${body})`} stroke="#0A2540" strokeOpacity="0.1" />
      <path d="M102 104c0-18 18-34 34-34h88c16 0 34 16 34 34v16H102v-16z" fill={accent} />
      <rect x="132" y="136" width="96" height="34" rx="8" fill="#0A2540" />
      <rect x="146" y="148" width="48" height="5" rx="2.5" fill="#8CEBFA" />
      <path d="M156 196h48c18 0 30 14 30 28v8" fill="none" stroke="#c5d4dc" strokeWidth="12" strokeLinecap="round" />
      <path d="M156 196h48c18 0 30 14 30 28v8" fill="none" stroke="#f7fbfc" strokeWidth="5" strokeLinecap="round" />
      <path d="M226 246c3 12 12 16 12 16s9-5 12-16c-4-4-10-8-12-8s-8 4-12 8z" fill={accent} />
      <rect x="124" y="268" width="112" height="14" rx="7" fill="#d7e4ea" />
    </g>
  );
}

function DispenserUnit({ paint }: { paint: Paint }) {
  const { accent } = paint;
  return (
    <g>
      <rect x="108" y="58" width="144" height="250" rx="24" fill="#f7fbfc" stroke="#0A2540" strokeOpacity="0.1" />
      <path d="M108 96c0-20 16-38 36-38h72c20 0 36 18 36 38v70H108V96z" fill="#0A2540" />
      <rect x="128" y="78" width="104" height="36" rx="8" fill="#12324A" />
      <rect x="140" y="90" width="46" height="5" rx="2.5" fill={accent} />
      <rect x="140" y="100" width="28" height="4" rx="2" fill="#6E8AA0" />
      <circle cx="214" cy="92" r="5" fill="#E07A62" />
      <circle cx="214" cy="106" r="5" fill={accent} />
      <circle cx="132" cy="186" r="7" fill="#E07A62" />
      <circle cx="180" cy="186" r="7" fill="#d7e4ea" />
      <circle cx="228" cy="186" r="7" fill={accent} />
      <g fill="none" stroke="#b7c6ce" strokeWidth="8" strokeLinecap="round">
        <path d="M132 198v26" />
        <path d="M180 198v26" />
        <path d="M228 198v26" />
      </g>
      <path d="M168 250h28v16a10 10 0 0 1-10 10h-8a10 10 0 0 1-10-10v-16z" fill="#fff" stroke="#d5e2e8" />
      <rect x="124" y="276" width="112" height="14" rx="4" fill="#d7e4ea" />
    </g>
  );
}

function ElixirSteelUnit({ paint }: { paint: Paint }) {
  const { accent, steel } = paint;
  return (
    <g>
      <ellipse cx="180" cy="78" rx="58" ry="16" fill="#d5dee4" />
      <path d="M122 78h116v214c0 30-26 50-58 50s-58-20-58-50V78z" fill={`url(#${steel})`} stroke="#0A2540" strokeOpacity="0.12" />
      <path d="M140 78v214c0 18 18 32 40 32" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="8" />
      <rect x="146" y="132" width="68" height="86" rx="12" fill="#071824" opacity="0.38" />
      <path d="M162 150v52M176 142v68M190 150v52" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <rect x="138" y="236" width="84" height="12" rx="6" fill={accent} />
    </g>
  );
}

function ElixirAbsUnit({ paint }: { paint: Paint }) {
  const { accent, body } = paint;
  return (
    <g>
      <rect x="116" y="64" width="128" height="250" rx="18" fill={`url(#${body})`} stroke="#0A2540" strokeOpacity="0.12" />
      <rect x="116" y="64" width="128" height="36" rx="16" fill="#e7eef2" />
      <rect x="150" y="112" width="60" height="120" rx="8" fill="#f4fbfd" stroke={accent} strokeWidth="3" />
      <path d="M168 132v80M180 124v96M192 132v80" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <rect x="132" y="252" width="96" height="16" rx="8" fill={accent} />
      <rect x="140" y="286" width="80" height="12" rx="6" fill="#d5e3ea" />
    </g>
  );
}
