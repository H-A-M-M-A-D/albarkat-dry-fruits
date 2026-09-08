"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format-price";
import type { Product } from "@/lib/product-types";

/**
 * The only interactive slice of the product-detail page — variant choice
 * and Add to Cart. Kept as its own small client component so the page shell
 * around it (image, description, related products) stays a server
 * component.
 */
export function ProductPurchasePanel({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const hasVariants = Boolean(product.variants && product.variants.length > 0);
  const variants = product.variants ?? [];
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id);
  const [added, setAdded] = useState(false);

  const selectedVariant = hasVariants
    ? (variants.find((variant) => variant.id === selectedVariantId) ?? variants[0])
    : undefined;
  const displayPrice = selectedVariant?.price ?? product.price;
  const displayCompareAt = selectedVariant?.compareAtPrice ?? (hasVariants ? undefined : product.compareAtPrice);
  const hasCommercialData = displayPrice !== undefined;
  const isSelectedVariantAvailable = selectedVariant ? selectedVariant.available : true;

  if (!hasCommercialData) {
    // Architecture is ready for commercial data — until it exists, render
    // nothing here rather than a disabled/placeholder purchase control.
    return null;
  }

  const handleAddToCart = () => {
    if (!isSelectedVariantAvailable || displayPrice === undefined) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      imageAlt: product.imageAlt,
      category: product.category,
      variantId: selectedVariant?.id,
      variantLabel: selectedVariant?.label,
      unitPrice: displayPrice,
      currency: product.currency,
    });
    setAdded(true);
    openCart();
  };

  return (
    <div className="mt-6">
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-medium tracking-tight text-cacao">
          {formatPrice(displayPrice, product.currency)}
        </span>
        {displayCompareAt && (
          <span className="text-lg text-muted line-through">
            {formatPrice(displayCompareAt, product.currency)}
          </span>
        )}
      </div>

      {hasVariants && (
        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={`${product.name} weight options`}>
          {variants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              disabled={!variant.available}
              aria-pressed={variant.id === selectedVariantId}
              onClick={() => {
                setSelectedVariantId(variant.id);
                setAdded(false);
              }}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:cursor-not-allowed disabled:opacity-40 ${
                variant.id === selectedVariantId
                  ? "border-cacao bg-cacao text-ivory"
                  : "border-cacao/20 text-cacao/80 hover:border-cacao/40"
              }`}
            >
              {variant.label}
            </button>
          ))}
        </div>
      )}

      <Button
        size="lg"
        className="mt-6 w-full sm:w-auto"
        onClick={handleAddToCart}
        disabled={!isSelectedVariantAvailable}
      >
        {isSelectedVariantAvailable ? "Add to Cart" : "Unavailable"}
      </Button>

      {added && (
        <p role="status" className="mt-3 text-sm text-olive">
          Added to your cart.
        </p>
      )}
    </div>
  );
}
