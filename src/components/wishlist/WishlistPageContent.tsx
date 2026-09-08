"use client";

import { Heart } from "lucide-react";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getProductById } from "@/lib/products";
import type { Product } from "@/lib/product-types";
import { useWishlist } from "@/lib/wishlist-context";

export function WishlistPageContent() {
  const { items } = useWishlist();

  // `WishlistItem` only stores an id — always re-derive the current product
  // record, and silently drop anything that no longer resolves (a product
  // removed from the catalog since it was saved) rather than render a ghost
  // card.
  const products = items
    .map((item) => getProductById(item.productId))
    .filter((product): product is Product => Boolean(product));

  if (products.length === 0) {
    return (
      <Container className="flex flex-col items-center gap-5 py-24 text-center sm:py-32">
        <Heart className="h-10 w-10 text-cacao/25" strokeWidth={1} aria-hidden />
        <div>
          <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            Your wishlist is empty.
          </h1>
          <p className="mt-3 max-w-md text-base text-muted">Save products you want to come back to.</p>
        </div>
        <Button href="/shop" size="lg">
          Browse Collection
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Your Selection</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">Wishlist</h1>
      </div>

      <div className="mt-10 sm:mt-12">
        <ProductGrid products={products} />
      </div>
    </Container>
  );
}
