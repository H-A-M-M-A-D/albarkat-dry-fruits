import { CategoryFilterNav } from "./CategoryFilterNav";
import { ProductGrid } from "./ProductGrid";
import { Container } from "@/components/ui/Container";
import { getProductsByCategory, getProductsByCategorySlugs, products as allProducts } from "@/lib/products";
import { resolveShopTarget } from "@/lib/shop-routing";
import { siteConfig } from "@/lib/site-config";

/**
 * Shared shell for `/shop` and `/shop/[category]` — the only difference
 * between "all products," a single category, and a storefront group (e.g.
 * "Nuts") is which products are passed in, so all three render this one
 * component rather than duplicating the page. `/shop/[category]/page.tsx`
 * is responsible for calling `notFound()` before rendering this if the slug
 * doesn't resolve to a real category or group.
 */
export function ShopPageContent({ targetSlug }: { targetSlug?: string }) {
  const target = targetSlug ? resolveShopTarget(targetSlug) : undefined;

  const products = !target
    ? allProducts
    : target.type === "category"
      ? getProductsByCategory(target.slug)
      : getProductsByCategorySlugs(target.group.categorySlugs);

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Shop <span className="normal-case">{siteConfig.name}</span>
        </p>
        <h1 className="mt-3 font-display font-medium text-4xl leading-tight tracking-tight sm:text-5xl">
          {target ? target.name : "A considered collection."}
        </h1>
        <p className="mt-3 text-base text-muted">
          Browse dates, nuts, dried fruits, and gifting selections in one place.
        </p>
      </div>

      <div className="mt-8 border-b border-cacao/10 pb-8 sm:mt-10">
        <CategoryFilterNav activeSlug={target?.slug} />
      </div>

      <div className="mt-10 sm:mt-12">
        <ProductGrid products={products} />
      </div>
    </Container>
  );
}
