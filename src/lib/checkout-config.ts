/**
 * DEMO CHECKOUT CONFIGURATION
 * Replace with confirmed Al Barkat business rules before production.
 *
 * Every value below (shipping rate, free-shipping threshold, payment
 * method) is temporary demo data added only so the full purchase flow can
 * be built and tested end-to-end — none of it has been confirmed by the
 * business. `DEMO_CHECKOUT` exists purely so this can never be mistaken
 * for a confirmed policy.
 */
export const DEMO_CHECKOUT = true;

export const checkoutConfig = {
  currency: "PKR" as const,
  /** COD only — no real payment gateway exists yet. */
  paymentMethods: ["Cash on Delivery"] as const,
  /** Flat rate applied below `freeShippingThresholdPkr`. */
  shippingFlatRate: 250,
  /** Subtotal at or above this amount ships free. */
  freeShippingThresholdPkr: 5000,
  /** Descriptive only — not used for any address/postal-code validation. */
  deliveryScope: "Pakistan",
} as const;
