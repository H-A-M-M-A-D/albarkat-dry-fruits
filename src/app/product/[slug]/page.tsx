import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductWishlistButton } from "@/components/product/ProductWishlistButton";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Container } from "@/components/ui/Container";
import { getCategoryBySlug } from "@/lib/categories";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} | ${siteConfig.fullName}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(product.categorySlug);
  const related = getRelatedProducts(product);

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-cacao/10 bg-card lg:sticky lg:top-32 lg:self-start">
          <ProductImage src={product.image} alt={product.imageAlt} sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>

        <div className="lg:pt-2">
          {category ? (
            <Link
              href={category.href}
              className="rounded-sm text-xs font-medium uppercase tracking-[0.18em] text-muted transition-colors hover:text-cacao focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            >
              {product.category}
            </Link>
          ) : (
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">{product.category}</p>
          )}

          <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{product.description}</p>

          <div className="mt-6 border-t border-cacao/10 pt-6">
            <ProductPurchasePanel product={product} />
            <ProductWishlistButton product={product} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20 border-t border-cacao/10 pt-16 sm:mt-24 sm:pt-20">
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">You may also like</h2>
          <div className="mt-8 sm:mt-10">
            <ProductGrid products={related} />
          </div>
        </div>
      )}
    </Container>
  );
}
