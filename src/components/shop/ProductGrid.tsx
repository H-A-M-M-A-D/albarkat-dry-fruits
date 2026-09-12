import { PackageSearch } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Product } from "@/lib/product-types";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-cacao/15 py-20 text-center">
        <PackageSearch className="h-10 w-10 text-cacao/25" strokeWidth={1} aria-hidden />
        <div>
          <p className="font-display text-xl text-cacao">Nothing here yet.</p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            This category doesn&apos;t have any products right now. Check back soon, or browse the full
            collection.
          </p>
        </div>
        <Link
          href="/shop"
          className="rounded-sm text-sm font-medium text-cacao underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          View all products
        </Link>
      </div>
    );
  }

  // A category with only 1-3 products would otherwise stretch the standard
  // 4-column track across the full page width, leaving several empty tracks
  // beside it that read as a rendering error rather than a small catalog.
  // Staying at a constant 2-column track (instead of growing to 3/4 columns
  // at wider breakpoints) and capping the row's own width keeps every card
  // at a normal, unstretched size — matched to the site's usual ~300px
  // card — while letting sparse pages settle into a tighter, intentional
  // block instead of a full-bleed row with dead space beside it.
  const isSparse = products.length > 0 && products.length <= 3;

  return (
    <div
      className={`grid grid-cols-2 gap-5 sm:gap-6${
        isSparse ? " max-w-2xl" : " md:grid-cols-3 lg:grid-cols-4 lg:gap-8"
      }`}
    >
      {products.map((product, index) => (
        <Reveal key={product.id} delay={Math.min(index, 7) * 0.05} trigger="mount">
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
