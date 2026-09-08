/**
 * A saved product reference. Deliberately minimal — no name/image/price
 * copied in, so a wishlist entry can never go stale against the real
 * catalog. Rendering always re-derives current product info via
 * `getProductById`/`getProductBySlug`.
 */
export interface WishlistItem {
  productId: string;
  slug: string;
}
