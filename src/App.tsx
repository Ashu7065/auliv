import { useEffect } from "react";
import { Amc } from "@/components/Amc";
import { CatalogPage } from "@/components/CatalogPage";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductSection } from "@/components/ProductSection";
import { SectionBoundary } from "@/components/SectionBoundary";
import {
  commercialPreviewCount,
  commercialProducts,
  residentialPreviewCount,
  residentialProducts,
} from "@/data/products";

function pagePath() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

function ScrollToHash() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const scroll = () => document.getElementById(id)?.scrollIntoView();
    scroll();
    const timer = window.setTimeout(scroll, 60);
    return () => window.clearTimeout(timer);
  }, []);
  return null;
}

export default function App() {
  const path = pagePath();
  const catalog =
    path === "/residential" ? (
      <CatalogPage
        eyebrow="For homes"
        title="Residential ROs"
        lede="All thirteen home purifiers, from everyday wall-mounted ROs to smart IoT models with app alerts and a longer warranty."
        products={residentialProducts}
        tone="plain"
      />
    ) : path === "/commercial" ? (
      <CatalogPage
        eyebrow="For workplaces"
        title="Commercial purifiers"
        lede="All eight workplace purifiers. Elixir 1 and Elixir 2 are UV+UF models for low-TDS water — the rest of this range is commercial RO."
        products={commercialProducts}
        tone="tinted"
      />
    ) : null;

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        {catalog ?? (
          <>
            <ScrollToHash />
            <Hero />
            <SectionBoundary>
              <ProductSection
                id="residential"
                eyebrow="For homes"
                title="Residential ROs"
                lede="Home purifiers, from everyday wall-mounted ROs to smart IoT models with app alerts and a longer warranty."
                products={residentialProducts.slice(0, residentialPreviewCount)}
                tone="plain"
                exploreHref="/residential"
              />
            </SectionBoundary>
            <SectionBoundary>
              <ProductSection
                id="commercial"
                eyebrow="For workplaces"
                title="Commercial purifiers"
                lede="Offices, clinics, schools, and institutions. Elixir 1 and Elixir 2 are UV+UF purifiers for low-TDS water — the rest of this range is commercial RO."
                products={commercialProducts.slice(0, commercialPreviewCount)}
                tone="tinted"
                exploreHref="/commercial"
              />
            </SectionBoundary>
            <SectionBoundary>
              <Amc />
            </SectionBoundary>
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
