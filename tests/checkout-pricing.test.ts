/**
 * REAL-FILE tests: exercises the actual `getShippingAmount`/`getCheckoutTotal`
 * implementations in `src/lib/checkout-pricing.ts` — the shipping/total
 * formulas are never re-typed here. See `tests/README.md` for how these run.
 */
import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { getCheckoutTotal, getShippingAmount } from "../src/lib/checkout-pricing";
import { checkoutConfig } from "../src/lib/checkout-config";
import { getCartSubtotal } from "../src/lib/cart-reducer";
import { getCheckoutEligibleItems } from "../src/lib/checkout-validation";
import { addToCart } from "./support/cart-fixtures";
import type { CartItem } from "../src/lib/cart-types";

describe("checkout-pricing: shipping threshold", () => {
  test("subtotal below the free-shipping threshold charges the flat rate", () => {
    assert.equal(
      getShippingAmount(checkoutConfig.freeShippingThresholdPkr - 1),
      checkoutConfig.shippingFlatRate,
    );
  });

  test("subtotal exactly at the free-shipping threshold ships free", () => {
    assert.equal(getShippingAmount(checkoutConfig.freeShippingThresholdPkr), 0);
  });

  test("subtotal above the free-shipping threshold ships free", () => {
    assert.equal(getShippingAmount(checkoutConfig.freeShippingThresholdPkr + 1), 0);
  });
});

describe("checkout-pricing: checkout total", () => {
  test("total is subtotal + shipping when the flat rate applies", () => {
    const subtotal = checkoutConfig.freeShippingThresholdPkr - 1;
    assert.equal(getCheckoutTotal(subtotal), subtotal + checkoutConfig.shippingFlatRate);
  });

  test("total equals subtotal once shipping is free", () => {
    const subtotal = checkoutConfig.freeShippingThresholdPkr;
    assert.equal(getCheckoutTotal(subtotal), subtotal);
  });
});

describe("checkout-pricing: real cart scenarios (real catalog + real cart reducer)", () => {
  test("Scenario A — Almonds 250g x2 + Cashews 500g x1 → PKR 3,500 subtotal, flat shipping, PKR 3,750 total", () => {
    let cart: CartItem[] = [];
    cart = addToCart(cart, "premium-almonds", "250g", 2);
    cart = addToCart(cart, "whole-cashews", "500g", 1);

    const subtotal = getCartSubtotal(getCheckoutEligibleItems(cart));

    assert.equal(subtotal, 3500);
    assert.equal(getShippingAmount(subtotal), 250);
    assert.equal(getCheckoutTotal(subtotal), 3750);
  });

  test("Scenario B — Pistachios 1kg x1 + Cashews 500g x1 → PKR 5,600 subtotal, free shipping, PKR 5,600 total", () => {
    let cart: CartItem[] = [];
    cart = addToCart(cart, "roasted-pistachios", "1kg", 1);
    cart = addToCart(cart, "whole-cashews", "500g", 1);

    const subtotal = getCartSubtotal(getCheckoutEligibleItems(cart));

    assert.equal(subtotal, 5600);
    assert.equal(getShippingAmount(subtotal), 0);
    assert.equal(getCheckoutTotal(subtotal), 5600);
  });
});
