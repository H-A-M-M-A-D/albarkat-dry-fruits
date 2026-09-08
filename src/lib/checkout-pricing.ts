import { checkoutConfig } from "./checkout-config";

/**
 * DEMO shipping rule (see checkout-config.ts): a flat rate below the
 * free-shipping threshold, free at or above it.
 */
export function getShippingAmount(subtotal: number): number {
  return subtotal >= checkoutConfig.freeShippingThresholdPkr ? 0 : checkoutConfig.shippingFlatRate;
}

export function getCheckoutTotal(subtotal: number): number {
  return subtotal + getShippingAmount(subtotal);
}
