import commercial from "../data/commercial.json" with { type: "json" };
import residential from "../data/residential.json" with { type: "json" };
import seoFile from "../data/seo.json" with { type: "json" };
import { FACEBOOK_URL, INSTAGRAM_URL, WHATSAPP_NUMBER } from "./contact.ts";

type SeoPage = {
  path: string;
  title: string;
  description: string;
};

type SeoFile = {
  siteName: string;
  siteUrl: string;
  locale: string;
  pages: SeoPage[];
  cities: string[];
  faq: { question: string; answer: string }[];
};

type CatalogRow = {
  name: string;
  description: string;
  price: number | null;
};

const seo = seoFile as SeoFile;

/** Published hours are Monday–Saturday, with no opening or closing time given. */
const OPEN_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

export function normalizePath(pathname: string) {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function homePage() {
  const home = seo.pages.find((page) => page.path === "/");
  if (!home) throw new Error("Missing home SEO entry");
  return home;
}

export function pageMeta(pathname: string) {
  const path = normalizePath(pathname);
  const page = seo.pages.find((item) => item.path === path) ?? homePage();
  return {
    path: page.path,
    title: page.title,
    description: page.description,
    canonical: page.path === "/" ? `${seo.siteUrl}/` : `${seo.siteUrl}${page.path}`,
  };
}

/** Product node for a catalog row. Omits price when it is not a published number. */
export function productNode(product: CatalogRow) {
  const node: Record<string, unknown> = {
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "Auliv" },
  };
  if (typeof product.price === "number") {
    node.offers = {
      "@type": "Offer",
      price: String(product.price),
      priceCurrency: "INR",
    };
  }
  return node;
}

function itemList(path: "/residential" | "/commercial", products: CatalogRow[]) {
  return {
    "@type": "ItemList",
    "@id": `${seo.siteUrl}${path}#products`,
    name: path === "/residential" ? "Home RO water purifiers" : "Commercial RO water purifiers",
    url: `${seo.siteUrl}${path}`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: productNode(product),
    })),
  };
}

function localBusiness() {
  return {
    "@type": "LocalBusiness",
    "@id": `${seo.siteUrl}/#business`,
    name: seo.siteName,
    url: `${seo.siteUrl}/`,
    telephone: `+${WHATSAPP_NUMBER}`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...OPEN_DAYS],
      },
    ],
    sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
    areaServed: seo.cities.map((name) => ({ "@type": "City", name })),
  };
}

function faqPage(canonical: string) {
  return {
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: seo.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function structuredData(pathname: string) {
  const page = pageMeta(pathname);
  const graph: Record<string, unknown>[] = [localBusiness(), faqPage(page.canonical)];
  if (page.path === "/residential") graph.push(itemList("/residential", residential as CatalogRow[]));
  if (page.path === "/commercial") graph.push(itemList("/commercial", commercial as CatalogRow[]));
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let element = document.head.querySelector(selector);
  if (!(element instanceof HTMLMetaElement)) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!(element instanceof HTMLLinkElement)) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function upsertJsonLd(data: unknown) {
  let element = document.getElementById("seo-jsonld");
  if (!(element instanceof HTMLScriptElement)) {
    const script = document.createElement("script");
    script.id = "seo-jsonld";
    script.type = "application/ld+json";
    document.head.appendChild(script);
    element = script;
  }
  element.textContent = JSON.stringify(data);
}

/** Writes the route's title, description, canonical, social tags, and JSON-LD. */
export function applyDocumentHead(pathname: string) {
  const page = pageMeta(pathname);
  document.title = page.title;
  upsertMeta("name", "description", page.description);
  upsertMeta("property", "og:title", page.title);
  upsertMeta("property", "og:description", page.description);
  upsertMeta("property", "og:url", page.canonical);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:site_name", seo.siteName);
  upsertMeta("property", "og:locale", seo.locale);
  upsertMeta("name", "twitter:card", "summary");
  upsertMeta("name", "twitter:title", page.title);
  upsertMeta("name", "twitter:description", page.description);
  upsertCanonical(page.canonical);
  upsertJsonLd(structuredData(pathname));
}
