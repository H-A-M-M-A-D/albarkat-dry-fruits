import assert from "node:assert/strict";
import { cartReducer } from "../../src/lib/cart-reducer";
import { getProductBySlug } from "../../src/lib/products";
import type { CartItem } from "../../src/lib/cart-types";
import type { CheckoutFormValues } from "../../src/lib/checkout-types";

/**
 * Adds one line to a cart using the real reducer (`cartReducer`) and the
 * real product catalog (`products.ts`) — a test scenario built this way can
 * never drift from what the actual add-to-cart flow would produce, and its
 * prices always come from the catalog rather than being hand-typed.
 */
export function addToCart(state: CartItem[], slug: string, variantId: string, quantity: number): CartItem[] {
  const product = getProductBySlug(slug);
  assert.ok(product, `fixture product "${slug}" must exist in the real catalog`);
  const variant = product.variants?.find((entry) => entry.id === variantId);
  assert.ok(variant, `fixture variant "${variantId}" must exist on "${slug}"`);

  return cartReducer(state, {
    type: "add",
    quantity,
    item: {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      imageAlt: product.imageAlt,
      category: product.category,
      variantId: variant.id,
      variantLabel: variant.label,
      unitPrice: variant.price,
      currency: product.currency,
    },
  });
}

/** A representative, validly-shaped set of checkout form values for building demo orders in tests. */
export const sampleCheckoutValues: CheckoutFormValues = {
  fullName: "Ayesha Khan",
  phone: "03001234567",
  email: "ayesha@example.com",
  addressLine1: "House 12, Street 4, F-7",
  addressLine2: "",
  city: "Islamabad",
  province: "Islamabad Capital Territory",
  postalCode: "44000",
};
