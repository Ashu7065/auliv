import { ArrowRight } from "lucide-react";
import heroPhoto from "@/assets/hero-morning-sapphire.jpg";
import { WaveDivider } from "@/components/WaveDivider";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-white">
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pt-8 pb-4 md:px-6 md:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pt-16 lg:pb-6">
        <div>
          <p className="text-base font-semibold text-brand-deep">For Indian homes</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
            Safe drinking water for a healthy life
          </h1>
          <p className="mt-4 max-w-md text-lg leading-snug text-muted">
            RO your family can trust — installed and serviced at your doorstep
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink
              message="Hi, I'm interested in Auliv purifiers"
              size="lg"
              className="w-full sm:w-auto"
            />
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="#residential">
                View products
                <ArrowRight />
              </a>
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted">Free installation · Mon–Sat support</p>
        </div>

        <div className="mx-auto w-full max-w-xl lg:max-w-none">
          <img
            src={heroPhoto}
            alt="Auliv Sapphire purifier pouring water in a bright morning kitchen"
            width={1024}
            height={1024}
            className="aspect-square w-full rounded-[1.75rem] object-cover shadow-[0_28px_60px_-36px_rgba(10,37,64,0.45)]"
          />
        </div>
      </div>
      <WaveDivider fillClass="fill-white" />
    </section>
  );
}
