import type { CartItem } from "./cart-types";
import type { CheckoutFormErrors, CheckoutFormValues } from "./checkout-types";

/** Strips spaces and dashes so "0300-1234567" and "0300 1234567" validate the same as "03001234567". */
export function normalizePhone(value: string): string {
  return value.replace(/[\s-]/g, "");
}

/** Accepts common Pakistani mobile formats: 03XXXXXXXXX or +923XXXXXXXXX. */
const PK_PHONE_REGEX = /^(?:0|\+92)3\d{9}$/;

export function validatePhone(value: string): string | undefined {
  const normalized = normalizePhone(value.trim());
  if (!normalized) return "Phone number is required.";
  if (!PK_PHONE_REGEX.test(normalized)) {
    return "Enter a valid Pakistani phone number (e.g. 03XXXXXXXXX).";
  }
  return undefined;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Email is optional for this demo — only validated when non-empty. */
export function validateEmail(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (!EMAIL_REGEX.test(trimmed)) return "Enter a valid email address.";
  return undefined;
}

export function validateRequired(value: string, label: string): string | undefined {
  if (!value.trim()) return `${label} is required.`;
  return undefined;
}

export function validateCheckoutForm(values: CheckoutFormValues): CheckoutFormErrors {
  const errors: CheckoutFormErrors = {};

  const fullName = validateRequired(values.fullName, "Full name");
  if (fullName) errors.fullName = fullName;

  const phone = validatePhone(values.phone);
  if (phone) errors.phone = phone;

  const email = validateEmail(values.email);
  if (email) errors.email = email;

  const addressLine1 = validateRequired(values.addressLine1, "Address line 1");
  if (addressLine1) errors.addressLine1 = addressLine1;

  const city = validateRequired(values.city, "City");
  if (city) errors.city = city;

  const province = validateRequired(values.province, "Province");
  if (province) errors.province = province;

  return errors;
}

export type CheckoutEligibleCartItem = CartItem & { unitPrice: number };

/**
 * The subset of cart lines that can actually be checked out: a real,
 * positive price and a positive quantity. Hand-edited/malformed
 * `localStorage` cart data can otherwise pass `validateCartItems`'s shape
 * check (which allows `unitPrice` to be absent) while still being
 * unsellable — checkout must never build a demo order from those lines.
 */
export function getCheckoutEligibleItems(items: CartItem[]): CheckoutEligibleCartItem[] {
  return items.filter(
    (item): item is CheckoutEligibleCartItem =>
      typeof item.unitPrice === "number" &&
      Number.isFinite(item.unitPrice) &&
      item.unitPrice > 0 &&
      Number.isFinite(item.quantity) &&
      item.quantity > 0,
  );
}
