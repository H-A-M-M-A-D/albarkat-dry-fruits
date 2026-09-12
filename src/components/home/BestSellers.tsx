import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { getFeaturedProducts } from "@/lib/products";

export function BestSellers() {
  const featured = getFeaturedProducts();

  return (
    <Section id="best-sellers" tone="ivory">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-lg">
          {/* "Best Sellers" internally (file/data-model name) — the visible
              heading stays safe until real bestseller data is confirmed. */}
          <h2 className="font-display font-medium text-4xl leading-tight tracking-tight sm:text-5xl">
            Featured Selection
          </h2>
          <p className="mt-3 text-base text-muted">A closer look at a few of our favourites.</p>
        </div>
        <Link
          href="/shop"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-sm text-sm font-medium text-cacao focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          View All
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={1.5}
          />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        {featured.map((product, index) => (
          <Reveal key={product.id} delay={index * 0.08}>
            {/* Featured Selection sits below the fold — never preload here. */}
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
