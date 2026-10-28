import { Amc } from "@/components/Amc";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductSection } from "@/components/ProductSection";
import { SectionBoundary } from "@/components/SectionBoundary";
import { commercialProducts, residentialProducts } from "@/data/products";

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <SectionBoundary>
          <ProductSection
            id="residential"
            eyebrow="For homes"
            title="Residential ROs"
            lede="Thirteen home purifiers, from everyday wall-mounted ROs to smart IoT models with app alerts and a longer warranty."
            products={residentialProducts}
            tone="plain"
          />
        </SectionBoundary>
        <SectionBoundary>
          <ProductSection
            id="commercial"
            eyebrow="For workplaces"
            title="Commercial purifiers"
            lede="Offices, clinics, schools, and institutions. Elixir 1 and Elixir 2 are UV+UF purifiers for low-TDS water — the rest of this range is commercial RO."
            products={commercialProducts}
            tone="tinted"
          />
        </SectionBoundary>
        <SectionBoundary>
          <Amc />
        </SectionBoundary>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
