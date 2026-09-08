"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format-price";
import type { Product } from "@/lib/product-types";
import { getStartingPrice } from "@/lib/products";
import { useWishlist } from "@/lib/wishlist-context";
import { ProductImage } from "./ProductImage";

type ProductCardProps = {
  product: Product;
  /** Next.js 16 renamed/replaced the old `priority` prop with `preload`. */
  preload?: boolean;
};

export function ProductCard({ product, preload = false }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const { isWishlisted, toggleItem } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const variants = product.variants ?? [];
  const hasMultipleVariants = variants.length > 1;
  // A card never guesses which weight a customer wants: with more than one
  // variant it links to the PDP to choose instead of quick-adding one.
  // Zero/one-variant products have no such ambiguity and can add directly.
  const singleVariant = variants.length === 1 ? variants[0] : undefined;
  const startingPrice = getStartingPrice(product);
  // No confirmed catalog price yet — the whole commercial row (price, CTA) stays hidden rather than showing fabricated data.
  const hasCommercialData = startingPrice !== undefined;
  const productHref = `/product/${product.slug}`;

  const handleAddToCart = () => {
    const price = singleVariant?.price ?? product.price;
    if (price === undefined) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      imageAlt: product.imageAlt,
      category: product.category,
      variantId: singleVariant?.id,
      variantLabel: singleVariant?.label,
      unitPrice: price,
      currency: product.currency,
    });
    openCart();
  };

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-cacao/10 bg-card transition-[transform,box-shadow,border-color] duration-300 ease-out motion-safe:group-hover:-translate-y-1 group-hover:border-cacao/20 group-hover:shadow-[0_20px_36px_-22px_rgba(59,33,24,0.4)]">
        {product.badge && (
          <Badge tone="gold" className="absolute left-3 top-3 z-10 capitalize">
            {product.badge}
          </Badge>
        )}

        <button
          type="button"
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wishlisted}
          onClick={() => toggleItem({ productId: product.id, slug: product.slug })}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-cacao backdrop-blur transition-[background-color,transform] duration-200 hover:bg-card motion-safe:active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          <Heart className={`h-4 w-4${wishlisted ? " fill-cacao" : ""}`} strokeWidth={1.5} />
        </button>

        <Link
          href={productHref}
          className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
        >
          <div className="h-full w-full transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03]">
            <ProductImage src={product.image} alt={product.imageAlt} preload={preload} />
          </div>
        </Link>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">{product.category}</p>
        <Link
          href={productHref}
          className="mt-1 w-fit rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          <p className="font-serif text-xl leading-snug tracking-tight text-cacao transition-colors group-hover:text-cacao/80">
            {product.shortName ?? product.name}
          </p>
        </Link>

        {hasCommercialData && (
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-base font-medium text-cacao">
              {hasMultipleVariants ? "From " : ""}
              {formatPrice(startingPrice, product.currency)}
            </span>
            {hasMultipleVariants ? (
              <Button href={productHref} size="sm" variant="secondary">
                Choose options
              </Button>
            ) : (
              <Button size="sm" variant="secondary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
