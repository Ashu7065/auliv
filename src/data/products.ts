import commercial from "./commercial.json" with { type: "json" };
import residential from "./residential.json" with { type: "json" };

export type ArtKind =
  | "iot-supreme-2y"
  | "iot-ace-2y"
  | "iot-supreme"
  | "iot-ace"
  | "new-grand"
  | "grand"
  | "grand-plus"
  | "sapphire"
  | "crown"
  | "elegant"
  | "supreme"
  | "ace"
  | "marvel"
  | "elite"
  | "elite-plus"
  | "elite-heavy"
  | "galaxy"
  | "perk"
  | "dispenser"
  | "elixir-steel"
  | "elixir-abs";

export type Product = {
  name: string;
  price: number;
  mrp: number;
  description: string;
  category: "residential" | "commercial";
  art: ArtKind;
  badge?: "UV+UF";
};

export const residentialProducts = residential as Product[];
export const commercialProducts = commercial as Product[];

const ACCENTS = ["#00C2E8", "#0099C4", "#12A8C4", "#00B4D4", "#1A9BB8", "#00A3C2"];

export function accentFor(index: number) {
  return ACCENTS[index % ACCENTS.length] ?? "#00C2E8";
}

const photoModules = import.meta.glob("../assets/products/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export function productSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Real white-background shots replace the illustration when a file is added. */
export function productPhoto(name: string) {
  const slug = productSlug(name);
  const match = Object.entries(photoModules).find(([file]) => file.includes(`/${slug}.`));
  return match?.[1];
}
