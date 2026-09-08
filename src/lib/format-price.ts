import type { Currency } from "./product-types";

/** Centralized price formatting — change the output format here, not at each call site. */
export function formatPrice(amount: number, currency: Currency = "PKR") {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency,
    currencyDisplay: "code",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
