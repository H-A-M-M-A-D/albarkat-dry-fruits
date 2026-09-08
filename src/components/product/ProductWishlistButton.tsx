"use client";

import { Heart } from "lucide-react";
import type { Product } from "@/lib/product-types";
import { useWishlist } from "@/lib/wishlist-context";

/**
 * Independent of `ProductPurchasePanel` — saving a product has nothing to do
 * with whether it's purchasable yet, so this renders unconditionally.
 */
export function ProductWishlistButton({ product }: { product: Product }) {
  const { isWishlisted, toggleItem } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <button
      type="button"
      aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      aria-pressed={wishlisted}
      onClick={() => toggleItem({ productId: product.id, slug: product.slug })}
      className="mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-medium text-cacao/80 transition-[color,transform] duration-150 hover:text-cacao motion-safe:active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
    >
      <Heart className={`h-4 w-4${wishlisted ? " fill-cacao" : ""}`} strokeWidth={1.5} />
      {wishlisted ? "Saved to wishlist" : "Save to wishlist"}
    </button>
  );
}
