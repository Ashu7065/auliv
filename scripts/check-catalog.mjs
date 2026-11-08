import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Residential rows are the catalog committed in 238d169 ("modified residential ro").
// That commit replaced the older 16-model list (four IoT models, unpublished prices
// on Mars / UTS-ro / UTS Excell, and higher prices on the rest). These expectations
// lock that selection. They are not a shorter sample of the old list.
const expectedResidential = [
  ["Auliv Mars RO", 6499, 8000, "Wall or counter RO, with UV + UF + TDS."],
  [
    "Auliv UTS-RO",
    14999,
    21000,
    "Under-the-sink Auliv set with a chrome faucet, UV + UF + Minerals and TDS controller, and 7 L storage tank.",
  ],
  [
    "Auliv UTS Excell",
    13999,
    20000,
    "Under-sink RO , UV + UF + Minerals and TDS controller, 7 L storage tank.",
  ],
  ["Auliv New Grand", 9500, 14000, "Wall-mounted RO + UF with TDS control and UV care in a 7.5 L tank."],
  [
    "Auliv Sapphire",
    15999,
    22000,
    "RO + UF, UV, alkaline , Minerals and copper purification with an 8 L tank.",
  ],
  [
    "Auliv Grand Plus",
    10999,
    17000,
    "Wall-mounted RO + UV + UF + Copper with TDS control and a generous 9 L tank.",
  ],
  ["Auliv Crown Plus", 12999, 19000, "Wall-mounted RO, UV, UF and copper with TDS control , 11 L tank"],
  [
    "Auliv Elegant",
    9999,
    16000,
    "Slim wall-mounted RO + UF + ALkaline + Copper with TDS control and an 8 L tank.",
  ],
  ["Auliv Grand", 8499, 14000, "Classic wall-mounted RO + UF + TDS control and 8 L tank capacity."],
  [
    "Auliv Supreme",
    11999,
    17000,
    "RO + UF + TDS with TDS control for clean water that keeps its taste , with 9 L tank capacity.",
  ],
  ["Auliv Ace", 9999, 16000, "Compact wall-mounted RO + UF + UV and an 8 L storage tank."],
  [
    "Auliv Marvel Plus",
    12500,
    21500,
    "RO + UF with copper, TDS control, and wall or table-top installation , with 8 L tank capacity.",
  ],
];

const expectedCommercial = [
  ["Auliv Elite Star", 45600, 60500, "Commercial RO+UV+UF with TDS control for offices and shops."],
  ["Auliv Perk Star", 89999, 125000, "Hot, cold and normal water with built-in RO and a digital display."],
  ["Auliv Perk", 58799, 69999, "High-output RO+UF with TDS control, about 20 litres an hour."],
  ["Auliv Elite Plus", 45599, 55500, "Commercial RO+UV+UF with mineral retention for smaller workplaces."],
  ["Auliv Elite 2 Plus", 82799, 99999, "Heavy-duty RO+UV+UF for teams and institutions with high demand."],
  ["Auliv Galaxy", 62500, 68500, "Large-capacity RO+UF with TDS control for hostels and institutions."],
  ["Auliv Elixir 2", 29000, 30000, "Stainless steel UV+UF purifier for low-TDS municipal water."],
  ["Auliv Elixir 1", 18500, 22000, "UV+UF purifier in a sturdy ABS body, for low-TDS water."],
];

// Studio files kept on disk after 238d169 removed these models from the catalog.
const retiredStudioSlugs = [
  "auliv-ace-iot",
  "auliv-ace-iot-2y",
  "auliv-supreme-iot",
  "auliv-supreme-iot-2y",
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
  expected.forEach(([name, price, mrp, description], index) => {
    const row = rows[index];
    assert(row?.name === name, `${label}[${index}] name ${row?.name} !== ${name}`);
    assert(row?.price === price, `${name} price ${row?.price} !== ${price}`);
    assert(row?.mrp === mrp, `${name} MRP ${row?.mrp} !== ${mrp}`);
    assert(row?.description === description, `${name} description drifted`);
    assert(
      typeof row?.description === "string" &&
        row.description.trim().length > 0 &&
        !row.description.includes("\n"),
      `${name} should have a single non-empty description`,
    );
    assert(row.price != null && row.mrp != null && row.mrp >= row.price, `${name} should show a real price at or below MRP`);
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
assert(
  residential.every((row) => !row.name.includes("IoT")),
  "residential catalog should not list the retired IoT models",
);

function productSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function pngSize(buf) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  assert(buf.subarray(0, 8).equals(sig), "PNG signature");
  assert(buf.toString("ascii", 12, 16) === "IHDR", "PNG IHDR");
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegSize(buf) {
  assert(buf[0] === 0xff && buf[1] === 0xd8, "JPEG signature");
  let offset = 2;
  while (offset + 8 < buf.length) {
    if (buf[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buf[offset + 1];
    if (marker === 0xd8 || marker === 0xd9) {
      offset += 2;
      continue;
    }
    const length = buf.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  assert(false, "JPEG frame");
  return { width: 0, height: 0 };
}

function assertImage(file, kind) {
  const buf = readFileSync(file);
  const size = kind === "png" ? pngSize(buf) : jpegSize(buf);
  assert(size.width >= 200 && size.height >= 200, `${path.basename(file)} decoded ${size.width}x${size.height}`);
}

const studioDir = path.join(root, "src/assets/products");
const webDir = path.join(root, "src/assets/products-web");
const studioFiles = new Set(readdirSync(studioDir).filter((name) => name.endsWith(".png")));
const webFiles = new Set(readdirSync(webDir).filter((name) => name.endsWith(".jpg")));
const usedSlugs = new Set();

for (const row of [...residential, ...commercial]) {
  const slug = typeof row.photo === "string" && row.photo ? row.photo : productSlug(row.name);
  usedSlugs.add(slug);
  const studio = path.join(studioDir, `${slug}.png`);
  const web = path.join(webDir, `${slug}.jpg`);
  assert(studioFiles.has(`${slug}.png`), `${row.name} is missing studio photo ${slug}.png`);
  assert(webFiles.has(`${slug}.jpg`), `${row.name} is missing web photo ${slug}.jpg`);
  if (existsSync(studio)) assertImage(studio, "png");
  if (existsSync(web)) assertImage(web, "jpg");
}

const retired = new Set(retiredStudioSlugs);
for (const slug of retired) {
  assert(studioFiles.has(`${slug}.png`), `retired studio file ${slug}.png should stay on disk`);
  assert(webFiles.has(`${slug}.jpg`), `retired web file ${slug}.jpg should stay on disk`);
  assert(!usedSlugs.has(slug), `${slug} is retired and must not be a catalog photo slug`);
}
for (const file of studioFiles) {
  const slug = file.replace(/\.png$/, "");
  assert(usedSlugs.has(slug) || retired.has(slug), `unexpected studio photo ${file}`);
}
for (const file of webFiles) {
  const slug = file.replace(/\.jpg$/, "");
  assert(usedSlugs.has(slug) || retired.has(slug), `unexpected web photo ${file}`);
}

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
assert(contact.includes("amount == null") || contact.includes("amount === null"), "formatInr should guard null amounts");

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

const app = readFileSync(path.join(root, "src/App.tsx"), "utf8");
assert(app.includes("residentialPreviewCount"), "home residential section should use the preview count");
assert(app.includes("commercialPreviewProducts"), "home commercial section should use the preview set");
assert(app.includes('exploreHref="/residential"'), "residential explore link");
assert(app.includes('exploreHref="/commercial"'), "commercial explore link");
assert(app.includes('path === "/residential"'), "residential listing route");
assert(app.includes('path === "/commercial"'), "commercial listing route");
assert(app.includes("residentialProducts.length"), "residential lede should follow the catalog count");
assert(!app.includes("sixteen"), "residential copy should not claim sixteen models");
assert(!app.includes("Smart IoT"), "residential filters should not offer an empty IoT tab");
assert(!app.includes("filters={residentialFilters}"), "home residential carousel should not use the retired IoT filter");

const about = readFileSync(path.join(root, "src/components/About.tsx"), "utf8");
assert(about.includes('product.name === "Auliv Sapphire"'), "about tile should feature a model in the current catalog");
assert(!about.includes("Auliv Supreme IoT"), "about tile should not look up a retired IoT model");
assert(!about.includes("smart IoT") && !about.includes("Smart IoT"), "about copy should not advertise retired IoT models");

const trust = readFileSync(path.join(root, "src/components/TrustBar.tsx"), "utf8");
assert(!trust.includes("IoT"), "trust bar should not cite retired IoT models");

const cardSource = readFileSync(path.join(root, "src/components/ProductCard.tsx"), "utf8");
assert(cardSource.includes("productPhoto(product.name, product.photo)"), "cards should honor an explicit photo slug");

const productsSource = readFileSync(path.join(root, "src/data/products.ts"), "utf8");
assert(productsSource.includes("residentialPreviewCount = 8"), "residential preview should be 8");
assert(productsSource.includes("commercialPreviewCount = 6"), "commercial preview should be 6");
assert(productsSource.includes('product.name === "Auliv Elixir 2"'), "commercial preview should include Elixir 2");

const carousel = readFileSync(path.join(root, "src/components/ProductCarousel.tsx"), "utf8");
assert(carousel.includes("snap-x"), "carousel should use CSS scroll snap");
assert(carousel.includes("Explore more") === false, "explore CTA stays with the section");

const section = readFileSync(path.join(root, "src/components/ProductSection.tsx"), "utf8");
assert(section.includes("Explore more"), "product sections need an Explore more link");

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
