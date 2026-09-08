import type { Currency } from "./product-types";

export const PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
] as const;

export type Province = (typeof PROVINCES)[number];

export interface CheckoutFormValues {
  fullName: string;
  phone: string;
  /** Optional for this demo. */
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  /** Optional — business requirements for this field aren't confirmed yet. */
  postalCode: string;
}

export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormValues, string>>;

/** A snapshot of a cart line as it existed at the moment a demo order was placed — never re-derived from the live catalog. */
export interface DemoOrderItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  imageAlt: string;
  variantLabel?: string;
  unitPrice: number;
  currency: Currency;
  quantity: number;
}

export interface DemoOrder {
  orderId: string;
  /** ISO timestamp. */
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
  };
  deliveryAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    province: string;
    postalCode?: string;
  };
  items: DemoOrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: Currency;
  paymentMethod: string;
}
