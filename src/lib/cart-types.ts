import type { Currency } from "./product-types";

/**
 * A single cart line. `variantId`/`variantLabel` are only present for
 * products with variants; `unitPrice`/`currency` are only present when the
 * product had confirmed commercial data at the moment it was added — a
 * cart line is never created for a product without a price (see
 * `ProductCard`'s `hasCommercialData` gate), so in practice these are
 * always set, but they stay optional to mirror `Product` itself rather than
 * assert data that isn't guaranteed at the type level.
 *
 * `unitPrice` is a snapshot captured at add-to-cart time, not a live
 * reference to `products.ts` — if a product's demo price changes later, an
 * item already in the cart keeps the price it was added at until removed
 * and re-added. There is deliberately no reconciliation against the
 * current catalog price here; that belongs to real checkout/order
 * architecture, not this cart.
 */
export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  imageAlt: string;
  category: string;
  variantId?: string;
  variantLabel?: string;
  unitPrice?: number;
  currency?: Currency;
  quantity: number;
}

/** Identifies a cart line independent of quantity — same product+variant combine instead of duplicating rows. */
export function cartLineKey(item: Pick<CartItem, "productId" | "variantId">) {
  return `${item.productId}::${item.variantId ?? ""}`;
}
