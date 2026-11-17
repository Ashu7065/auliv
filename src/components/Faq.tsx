import { Reveal } from "@/components/motion";
import seo from "@/data/seo.json" with { type: "json" };

export function Faq({ tone = "pearl" }: { tone?: "pearl" | "white" }) {
  return (
    <section id="faq" aria-labelledby="faq-heading" className={tone === "pearl" ? "bg-pearl" : "bg-white"}>
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-brand-deep uppercase">
            <span className="h-px w-10 bg-brand-deep/60" aria-hidden="true" />
            Good to know
          </p>
          <h2
            id="faq-heading"
            className="mt-6 text-4xl leading-[1.05] tracking-[-0.03em] text-navy sm:text-5xl lg:text-[3.5rem]"
          >
            Common questions
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-platinum/70 md:mt-20">
          {seo.faq.map((item) => (
            <article key={item.question} className="border-b border-platinum/70 py-7 md:py-9">
              <h3 className="font-display text-xl font-semibold tracking-tight text-navy md:text-2xl">{item.question}</h3>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
