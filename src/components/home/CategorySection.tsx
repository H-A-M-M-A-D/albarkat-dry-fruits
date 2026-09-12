import Link from "next/link";
import { ProductImage } from "@/components/product/ProductImage";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { categories } from "@/lib/categories";
import type { Category } from "@/lib/product-types";

/**
 * All 7 tiles render at one uniform size — a prior per-category "featured"
 * flag made Dates/Dried Fruits noticeably larger than the rest, which read
 * as an inconsistent, uncoordinated set rather than one category system.
 * `/shop/[category]` pages now exist, so each tile links there.
 */
function CategoryTile({ category, gridMode = false }: { category: Category; gridMode?: boolean }) {
  return (
    <Link
      href={category.href}
      className={`group flex flex-col items-center rounded-2xl text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-card${gridMode ? " w-full" : ""}`}
    >
      <div
        className={`relative overflow-hidden rounded-full border border-cacao/15 bg-ivory transition-[transform,border-color,box-shadow] duration-300 ease-out motion-safe:group-hover:-translate-y-1 group-hover:border-cacao/30 group-hover:shadow-[0_16px_32px_-20px_rgba(59,33,24,0.4)] ${
          gridMode ? "aspect-square w-full" : "h-32 w-32 sm:h-48 sm:w-48"
        }`}
      >
        <ProductImage
          src={category.image}
          alt={category.imageAlt}
          fit="cover"
          sizes="(min-width: 1024px) 200px, (min-width: 640px) 208px, 176px"
          className="transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.04]"
          imageStyle={category.imageScale ? { transform: `scale(${category.imageScale})` } : undefined}
        />
      </div>
      <span className="mt-4 text-sm font-medium text-cacao">{category.name}</span>
    </Link>
  );
}

export function CategorySection() {
  return (
    <Section id="shop" tone="card" padding="compact">
      <div className="max-w-xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Shop by Category</p>
        <h2 className="mt-3 font-display font-medium text-4xl leading-tight tracking-tight sm:text-5xl">
          Find your favourite
        </h2>
      </div>

      {/* Mobile/tablet: native horizontal scroll-snap row (no carousel library), with a right-edge fade indicating more content. */}
      <div className="edge-fade-x scrollbar-hide -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:gap-6 sm:px-8 lg:hidden">
        {categories.map((category, index) => (
          <Reveal key={category.id} delay={index * 0.05} className="shrink-0 snap-start">
            <CategoryTile category={category} />
          </Reveal>
        ))}
      </div>

      {/* Desktop: balanced grid — 4+3 at lg, all 7 in one row at xl+ (never 6+1). */}
      <div className="mt-8 hidden lg:grid lg:grid-cols-4 lg:gap-x-8 lg:gap-y-10 xl:grid-cols-7 xl:gap-x-6">
        {categories.map((category, index) => (
          <Reveal key={category.id} delay={index * 0.05}>
            <CategoryTile category={category} gridMode />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
