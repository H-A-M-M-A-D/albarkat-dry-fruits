/**
 * REAL-FILE tests: exercises the actual `buildDemoOrder`, `isValidDemoOrder`,
 * `parseDemoOrder`, and `generateDemoOrderId` implementations in
 * `src/lib/demo-order.ts` — including the hardened item/quantity/total
 * validation that guards the `sessionStorage`-backed order-confirmation read.
 */
import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { buildDemoOrder, generateDemoOrderId, isValidDemoOrder, parseDemoOrder } from "../src/lib/demo-order";
import { checkoutConfig } from "../src/lib/checkout-config";
import { getCartSubtotal } from "../src/lib/cart-reducer";
import { getCheckoutEligibleItems } from "../src/lib/checkout-validation";
import { addToCart, sampleCheckoutValues } from "./support/cart-fixtures";
import type { CartItem } from "../src/lib/cart-types";
import type { DemoOrder } from "../src/lib/checkout-types";

function scenarioAOrder(): { eligible: ReturnType<typeof getCheckoutEligibleItems>; order: DemoOrder } {
  let cart: CartItem[] = [];
  cart = addToCart(cart, "premium-almonds", "250g", 2);
  cart = addToCart(cart, "whole-cashews", "500g", 1);
  const eligible = getCheckoutEligibleItems(cart);
  const subtotal = getCartSubtotal(eligible);
  return { eligible, order: buildDemoOrder({ values: sampleCheckoutValues, items: eligible, subtotal }) };
}

function scenarioBOrder(): DemoOrder {
  let cart: CartItem[] = [];
  cart = addToCart(cart, "roasted-pistachios", "1kg", 1);
  cart = addToCart(cart, "whole-cashews", "500g", 1);
  const eligible = getCheckoutEligibleItems(cart);
  const subtotal = getCartSubtotal(eligible);
  return buildDemoOrder({ values: sampleCheckoutValues, items: eligible, subtotal });
}

describe("demo-order: generateDemoOrderId", () => {
  test("produces the DEMO-AB-XXXXXX shape every time", () => {
    for (let i = 0; i < 25; i++) {
      assert.match(generateDemoOrderId(), /^DEMO-AB-[A-Z0-9]{6}$/);
    }
  });
});

describe("demo-order: buildDemoOrder (Scenario A — flat shipping)", () => {
  const { eligible, order } = scenarioAOrder();

  test("subtotal, shipping and total are preserved from the real pricing helpers", () => {
    assert.equal(order.subtotal, 3500);
    assert.equal(order.shipping, 250);
    assert.equal(order.total, 3750);
  });

  test("item snapshot is preserved from the eligible cart lines", () => {
    assert.equal(order.items.length, eligible.length);
    order.items.forEach((line, index) => {
      const source = eligible[index];
      assert.equal(line.productId, source.productId);
      assert.equal(line.slug, source.slug);
      assert.equal(line.name, source.name);
      assert.equal(line.unitPrice, source.unitPrice);
      assert.equal(line.quantity, source.quantity);
      assert.equal(line.variantLabel, source.variantLabel);
    });
  });

  test("payment method is preserved from checkout config", () => {
    assert.equal(order.paymentMethod, checkoutConfig.paymentMethods[0]);
  });
});

describe("demo-order: buildDemoOrder (Scenario B — free shipping)", () => {
  const order = scenarioBOrder();

  test("subtotal, shipping and total are preserved from the real pricing helpers", () => {
    assert.equal(order.subtotal, 5600);
    assert.equal(order.shipping, 0);
    assert.equal(order.total, 5600);
  });
});

describe("demo-order: sessionStorage-read hardening (parseDemoOrder / isValidDemoOrder)", () => {
  test("malformed JSON does not throw and is rejected", () => {
    assert.doesNotThrow(() => parseDemoOrder("{not valid json"));
    assert.equal(parseDemoOrder("{not valid json"), null);
  });

  test("well-formed JSON that isn't an order shape is rejected", () => {
    assert.equal(parseDemoOrder(JSON.stringify({ hello: "world" })), null);
  });

  test("a genuinely valid order round-trips through parseDemoOrder", () => {
    const { order } = scenarioAOrder();
    assert.deepEqual(parseDemoOrder(JSON.stringify(order)), order);
  });

  test("an item missing required fields is rejected", () => {
    const { order } = scenarioAOrder();
    const missingName = { ...order, items: [{ ...order.items[0], name: undefined }] };
    assert.equal(isValidDemoOrder(missingName), false);
  });

  test("an item with a zero, negative, or fractional quantity is rejected", () => {
    const { order } = scenarioAOrder();
    assert.equal(isValidDemoOrder({ ...order, items: [{ ...order.items[0], quantity: 0 }] }), false);
    assert.equal(isValidDemoOrder({ ...order, items: [{ ...order.items[0], quantity: -1 }] }), false);
    assert.equal(isValidDemoOrder({ ...order, items: [{ ...order.items[0], quantity: 1.5 }] }), false);
  });

  test("an item with a non-positive unit price is rejected", () => {
    const { order } = scenarioAOrder();
    assert.equal(isValidDemoOrder({ ...order, items: [{ ...order.items[0], unitPrice: 0 }] }), false);
    assert.equal(isValidDemoOrder({ ...order, items: [{ ...order.items[0], unitPrice: -50 }] }), false);
  });

  test("an empty items array is rejected", () => {
    const { order } = scenarioAOrder();
    assert.equal(isValidDemoOrder({ ...order, items: [] }), false);
  });

  test("a NaN, infinite, or negative total does not validate", () => {
    const { order } = scenarioAOrder();
    assert.equal(isValidDemoOrder({ ...order, total: Number.NaN }), false);
    assert.equal(isValidDemoOrder({ ...order, total: Number.POSITIVE_INFINITY }), false);
    assert.equal(isValidDemoOrder({ ...order, total: -100 }), false);
  });

  test("a total inconsistent with the real pricing helpers is rejected even when well-typed", () => {
    const { order } = scenarioAOrder();
    assert.equal(isValidDemoOrder({ ...order, total: order.total + 1 }), false);
    assert.equal(isValidDemoOrder({ ...order, shipping: order.shipping + 1 }), false);
  });

  test("a non-object, null, or array payload is rejected", () => {
    assert.equal(isValidDemoOrder(null), false);
    assert.equal(isValidDemoOrder(undefined), false);
    assert.equal(isValidDemoOrder("a string"), false);
    assert.equal(isValidDemoOrder([]), false);
  });
});
