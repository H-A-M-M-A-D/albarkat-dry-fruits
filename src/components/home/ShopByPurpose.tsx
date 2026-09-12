import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductImage } from "@/components/product/ProductImage";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { purposes, type Purpose } from "@/lib/purposes";

function PurposeTile({ purpose, dominant = false }: { purpose: Purpose; dominant?: boolean }) {
  return (
    <div className="flex flex-col">
      <div
        className={`relative overflow-hidden rounded-lg ${
          dominant ? "aspect-[4/5]" : "aspect-[16/10] lg:aspect-[4/3]"
        }`}
      >
        <ProductImage
          src={purpose.image}
          alt={purpose.imageAlt}
          fit="cover"
          sizes={
            dominant
              ? "(min-width: 1024px) 740px, (min-width: 640px) 90vw, 100vw"
              : "(min-width: 1024px) 530px, (min-width: 640px) 30vw, 90vw"
          }
        />
      </div>
      <h3
        className={`mt-4 font-display font-medium tracking-tight text-cacao ${
          dominant ? "text-3xl sm:text-4xl" : "text-xl"
        }`}
      >
        {purpose.title}
      </h3>
      <p className={`mt-2 text-muted ${dominant ? "max-w-sm text-base" : "text-sm"}`}>
        {purpose.description}
      </p>
      <Link
        href={purpose.ctaHref}
        className="mt-3 inline-flex items-center gap-1 rounded-sm text-sm font-medium text-cacao/80 transition-colors hover:text-cacao focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        {purpose.ctaLabel}
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
      </Link>
    </div>
  );
}

export function ShopByPurpose() {
  const dominant = purposes.find((purpose) => purpose.featured) ?? purposes[0];
  const supporting = purposes.filter((purpose) => purpose.id !== dominant.id);

  return (
    <Section tone="card">
      <div className="max-w-xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Shop by Purpose</p>
        <h2 className="mt-3 font-display font-medium text-4xl leading-tight tracking-tight sm:text-5xl">
          Find what suits the moment
        </h2>
        <p className="mt-3 text-base text-muted">From everyday snacking to thoughtful gifting.</p>
      </div>

      <div className="mt-10 flex flex-col gap-10 lg:mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-0">
        <div className="lg:col-span-8">
          <Reveal>
            <PurposeTile purpose={dominant} dominant />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-4 lg:flex lg:flex-col lg:gap-6">
          {supporting.map((purpose, index) => (
            <Reveal key={purpose.id} delay={0.1 + index * 0.05}>
              <PurposeTile purpose={purpose} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
