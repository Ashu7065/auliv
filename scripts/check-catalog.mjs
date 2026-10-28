import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const expectedResidential = [
  ["Auliv Supreme IoT 2Y", 21999, 33000],
  ["Auliv Ace IoT 2Y", 22999, 33000],
  ["Auliv New Grand", 12499, 23000],
  ["Auliv Supreme IoT", 17999, 28000],
  ["Auliv Ace IoT", 18999, 28000],
  ["Auliv Sapphire", 19999, 25000],
  ["Auliv Grand Plus", 19999, 25500],
  ["Auliv Crown Plus", 20000, 26500],
  ["Auliv Elegant", 16500, 23500],
  ["Auliv Grand", 14999, 23000],
  ["Auliv Supreme", 14099, 23500],
  ["Auliv Ace", 14099, 23500],
  ["Auliv Marvel Plus", 12500, 21500],
];

const expectedCommercial = [
  ["Auliv Elite Star", 45600, 60500],
  ["Auliv Perk Star", 89999, 125000],
  ["Auliv Perk", 58799, 69999],
  ["Auliv Elite Plus", 45599, 55500],
  ["Auliv Elite 2 Plus", 82799, 99999],
  ["Auliv Galaxy", 62500, 68500],
  ["Auliv Elixir 2", 29000, 30000],
  ["Auliv Elixir 1", 18500, 22000],
];

let failed = false;

function assert(condition, message) {
  if (!condition) {
    failed = true;
    console.error(`FAIL: ${message}`);
  }
}

function load(relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

function checkPrices(rows, expected, label) {
  assert(rows.length === expected.length, `${label} count ${rows.length} !== ${expected.length}`);
  expected.forEach(([name, price, mrp], index) => {
    const row = rows[index];
    assert(row?.name === name, `${label}[${index}] name ${row?.name} !== ${name}`);
    assert(row?.price === price, `${name} price ${row?.price} !== ${price}`);
    assert(row?.mrp === mrp, `${name} MRP ${row?.mrp} !== ${mrp}`);
    assert(
      typeof row?.description === "string" &&
        row.description.length > 40 &&
        row.description.length <= 110 &&
        !row.description.includes("\n"),
      `${name} should have a single short description`,
    );
    assert(!("product_url" in (row ?? {})), `${name} should not ship a source URL`);
    assert(!("source_model" in (row ?? {})), `${name} should not ship a source model`);
  });
}

const residential = load("src/data/residential.json");
const commercial = load("src/data/commercial.json");
checkPrices(residential, expectedResidential, "residential");
checkPrices(commercial, expectedCommercial, "commercial");

assert(
  commercial.filter((row) => row.badge === "UV+UF").map((row) => row.name).join("|") ===
    "Auliv Elixir 2|Auliv Elixir 1",
  "Elixir 1 and 2 must be the only UV+UF models",
);
assert(residential.every((row) => row.badge == null), "residential cards have no badge");

function productSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const photoDir = path.join(root, "src/assets/products");
const photoFiles = new Set(readdirSync(photoDir).filter((name) => name.endsWith(".png")));
for (const row of [...residential, ...commercial]) {
  const file = `${productSlug(row.name)}.png`;
  assert(photoFiles.has(file), `${row.name} is missing studio photo ${file}`);
}
assert(photoFiles.size === residential.length + commercial.length, `expected 21 product photos, found ${photoFiles.size}`);

const uploadResidential = "uploads/auliv-catalog_0549.json";
const uploadCommercial = "uploads/auliv-commercial-catalog_90d0.json";
if (existsSync(path.join(root, uploadResidential)) && existsSync(path.join(root, uploadCommercial))) {
  const fromUpload = (file, local) => {
    const source = load(file);
    source.forEach((item, index) => {
      const row = local[index];
      assert(row.description === item.description, `description drift on ${item.auliv_name}`);
      assert(row.price === item.price && row.mrp === item.mrp, `price drift on ${item.auliv_name}`);
    });
  };
  fromUpload(uploadResidential, residential);
  fromUpload(uploadCommercial, commercial);
}

const contact = readFileSync(path.join(root, "src/lib/contact.ts"), "utf8");
for (const needle of [
  "918368879809",
  "+91 8368879809",
  "https://www.instagram.com/aulivoffical/",
  "https://www.facebook.com/profile.php?id=61595562017874",
  "Monday – Saturday",
  "https://wa.me/",
]) {
  assert(contact.includes(needle), `contact.ts missing ${needle}`);
}

const amc = readFileSync(path.join(root, "src/components/Amc.tsx"), "utf8");
for (const needle of ["New", "Half-yearly", "Yearly", "Coming soon", "Ask about AMC"]) {
  assert(amc.includes(needle), `AMC missing ${needle}`);
}

const hero = readFileSync(path.join(root, "src/components/Hero.tsx"), "utf8");
for (const needle of [
  "For Indian homes",
  "Safe drinking water for a healthy life",
  "Free installation · Mon–Sat support",
  "View products",
  "hero-morning-sapphire.jpg",
]) {
  assert(hero.includes(needle), `hero missing ${needle}`);
}
assert(!hero.includes("ProductArt"), "hero should not use the illustrated placeholder");
assert(!hero.includes("grid-cols-2"), "hero should not include the feature-tile grid");

const card = readFileSync(path.join(root, "src/components/ProductCard.tsx"), "utf8");
assert(!card.includes("ProductArt"), "product cards should not use illustrated placeholders");
assert(card.includes("object-contain"), "product cards should contain the studio photo");

const contactUi = readFileSync(path.join(root, "src/components/Contact.tsx"), "utf8");
assert(contactUi.includes("Follow on Facebook"), "contact should keep a clear Facebook label");

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === "dist") continue;
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (/\.(tsx|ts|css|html|json|mjs)$/.test(name)) acc.push(full);
  }
  return acc;
}

const banned = [/kent\.co\.in/i, /add to cart/i, /buy now/i, /checkout/i];
for (const file of walk(path.join(root, "src"))) {
  const text = readFileSync(file, "utf8");
  for (const pattern of banned) {
    assert(!pattern.test(text), `${path.relative(root, file)} matches ${pattern}`);
  }
}

if (failed) {
  process.exit(1);
}

console.log("Catalog, contact, and no-commerce checks passed.");
