import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductImage } from "@/components/product/ProductImage";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { dateVarieties } from "@/lib/dates-spotlight";

export function DatesSpotlight() {
  return (
    <Section tone="ivory">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
        <Reveal className="lg:order-2 lg:w-7/12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg sm:aspect-[16/9] lg:aspect-[4/3]">
            <ProductImage
              src="/dates-spotlight/hero.png"
              alt="A wooden bowl of whole dates"
              fit="cover"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:order-1 lg:w-5/12">
          <Badge tone="olive">Dates</Badge>
          <h2 className="mt-4 font-display font-medium text-4xl leading-tight tracking-tight sm:text-5xl">
            A closer look at dates
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Dates are among the most versatile ingredients in a pantry: naturally sweet, satisfying
            on their own, and easy to dress up for guests.
          </p>

          {dateVarieties.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {dateVarieties.map((variety) => (
                <li key={variety.id}>
                  <Badge tone="outline">{variety.name}</Badge>
                </li>
              ))}
            </ul>
          )}

          <Link
            href="/shop/dates"
            className="mt-6 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-cacao focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            Shop dates
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
