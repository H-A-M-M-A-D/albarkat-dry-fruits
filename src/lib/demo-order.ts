import { checkoutConfig } from "./checkout-config";
import { getCheckoutTotal, getShippingAmount } from "./checkout-pricing";
import type { CheckoutEligibleCartItem } from "./checkout-validation";
import type { CheckoutFormValues, DemoOrder, DemoOrderItem } from "./checkout-types";

export const STORAGE_KEY = "albarkat:lastDemoOrder";

/** Non-sensitive, session-unique-enough identifier — not a real order number. */
export function generateDemoOrderId(): string {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, "0");
  return `DEMO-AB-${random}`;
}

/**
 * Builds a client-side-only demo order. `subtotal` is passed in (rather than
 * recomputed here) so the caller's already-validated `items`/`subtotal`
 * pairing — see `getCheckoutEligibleItems` — is the single source of truth.
 */
export function buildDemoOrder(params: {
  values: CheckoutFormValues;
  items: CheckoutEligibleCartItem[];
  subtotal: number;
}): DemoOrder {
  const { values, items, subtotal } = params;
  const shipping = getShippingAmount(subtotal);
  const total = getCheckoutTotal(subtotal);

  const orderItems: DemoOrderItem[] = items.map((item) => ({
    productId: item.productId,
    slug: item.slug,
    name: item.name,
    image: item.image,
    imageAlt: item.imageAlt,
    ...(item.variantLabel ? { variantLabel: item.variantLabel } : {}),
    unitPrice: item.unitPrice,
    currency: item.currency ?? checkoutConfig.currency,
    quantity: item.quantity,
  }));

  const email = values.email.trim();
  const addressLine2 = values.addressLine2.trim();
  const postalCode = values.postalCode.trim();

  return {
    orderId: generateDemoOrderId(),
    createdAt: new Date().toISOString(),
    customer: {
      fullName: values.fullName.trim(),
      phone: values.phone.trim(),
      ...(email ? { email } : {}),
    },
    deliveryAddress: {
      addressLine1: values.addressLine1.trim(),
      ...(addressLine2 ? { addressLine2 } : {}),
      city: values.city.trim(),
      province: values.province,
      ...(postalCode ? { postalCode } : {}),
    },
    items: orderItems,
    subtotal,
    shipping,
    total,
    currency: checkoutConfig.currency,
    paymentMethod: checkoutConfig.paymentMethods[0],
  };
}

/** A single cart line as stored inside a saved `DemoOrder` — checked field-by-field so a hand-edited or corrupted `sessionStorage` entry can never reach the confirmation UI. */
function isValidDemoOrderItem(data: unknown): data is DemoOrderItem {
  if (!data || typeof data !== "object") return false;
  const item = data as Record<string, unknown>;

  if (typeof item.productId !== "string" || item.productId.length === 0) return false;
  if (typeof item.slug !== "string" || item.slug.length === 0) return false;
  if (typeof item.name !== "string" || item.name.length === 0) return false;
  if (typeof item.image !== "string" || item.image.length === 0) return false;
  if (typeof item.imageAlt !== "string") return false;
  if (item.variantLabel !== undefined && (typeof item.variantLabel !== "string" || item.variantLabel.length === 0)) {
    return false;
  }
  if (typeof item.currency !== "string" || item.currency.length === 0) return false;
  if (typeof item.unitPrice !== "number" || !Number.isFinite(item.unitPrice) || item.unitPrice <= 0) return false;
  if (typeof item.quantity !== "number" || !Number.isInteger(item.quantity) || item.quantity <= 0) return false;

  return true;
}

export function isValidDemoOrder(data: unknown): data is DemoOrder {
  if (!data || typeof data !== "object") return false;
  const order = data as Record<string, unknown>;

  if (typeof order.orderId !== "string" || typeof order.createdAt !== "string") return false;

  if (
    typeof order.subtotal !== "number" ||
    typeof order.shipping !== "number" ||
    typeof order.total !== "number" ||
    !Number.isFinite(order.subtotal) ||
    !Number.isFinite(order.shipping) ||
    !Number.isFinite(order.total) ||
    order.subtotal <= 0 ||
    order.shipping < 0 ||
    order.total <= 0
  ) {
    return false;
  }

  // Cross-checked against the single source of truth in checkout-pricing.ts —
  // a stored shipping/total that doesn't match what today's pricing rules
  // produce for its own subtotal is corrupted or tampered, not just unusual.
  if (order.shipping !== getShippingAmount(order.subtotal) || order.total !== getCheckoutTotal(order.subtotal)) {
    return false;
  }

  if (!Array.isArray(order.items) || order.items.length === 0 || !order.items.every(isValidDemoOrderItem)) {
    return false;
  }

  const customer = order.customer as Record<string, unknown> | undefined;
  if (!customer || typeof customer.fullName !== "string") return false;

  const address = order.deliveryAddress as Record<string, unknown> | undefined;
  if (!address || typeof address.city !== "string" || typeof address.province !== "string") return false;

  return true;
}

export function saveDemoOrder(order: DemoOrder) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch {
    // Storage unavailable — the confirmation page will show its "no order found" state.
  }
}

export function parseDemoOrder(raw: string): DemoOrder | null {
  try {
    const parsed = JSON.parse(raw);
    return isValidDemoOrder(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function readDemoOrder(): DemoOrder | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? parseDemoOrder(raw) : null;
  } catch {
    return null;
  }
}
