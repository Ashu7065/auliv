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

/** Landing carousels show a short set. Full catalogs live on the category pages. */
export const residentialPreviewCount = 8;
export const commercialPreviewCount = 6;

const commercialWithoutUv = commercialProducts.filter((product) => product.badge !== "UV+UF");
const elixirPreview = commercialProducts.find((product) => product.name === "Auliv Elixir 2");
const commercialFeatured = commercialWithoutUv.slice(0, commercialPreviewCount - 1);

/** Six commercial models, with Elixir 2 in view so the UV+UF badge appears on the home carousel. */
export const commercialPreviewProducts = elixirPreview
  ? [...commercialFeatured.slice(0, 2), elixirPreview, ...commercialFeatured.slice(2)]
  : commercialFeatured;

const ACCENTS = ["#00C2E8", "#0099C4", "#12A8C4", "#00B4D4", "#1A9BB8", "#00A3C2"];

export function accentFor(index: number) {
  return ACCENTS[index % ACCENTS.length] ?? "#00C2E8";
}

/** Web-sized copies (720px JPEG) of the studio masters in assets/products. */
const photoModules = import.meta.glob("../assets/products-web/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export function productSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const PHOTO_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "avif"] as const;

/**
 * Studio photo for a catalog model. The file name is the Auliv product name
 * (auliv_name) as a slug, for example "Auliv Grand Plus" → auliv-grand-plus.png.
 */
export function productPhoto(name: string) {
  const slug = productSlug(name);
  const match = Object.entries(photoModules).find(([file]) =>
    PHOTO_EXTENSIONS.some((extension) => file.endsWith(`/${slug}.${extension}`)),
  );
  return match?.[1];
}
