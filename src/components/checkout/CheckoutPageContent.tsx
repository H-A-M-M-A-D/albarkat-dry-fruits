"use client";

import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useCart } from "@/lib/cart-context";
import { getCartSubtotal } from "@/lib/cart-reducer";
import { getCheckoutTotal, getShippingAmount } from "@/lib/checkout-pricing";
import type { CheckoutFormValues } from "@/lib/checkout-types";
import { getCheckoutEligibleItems } from "@/lib/checkout-validation";
import { buildDemoOrder, saveDemoOrder } from "@/lib/demo-order";
import { CheckoutForm } from "./CheckoutForm";
import { OrderSummary } from "./OrderSummary";

export function CheckoutPageContent() {
  const { items, clearCart } = useCart();
  const router = useRouter();

  // Never trust a cart line without a real price/quantity into checkout —
  // see `getCheckoutEligibleItems`'s doc comment.
  const eligibleItems = useMemo(() => getCheckoutEligibleItems(items), [items]);
  const subtotal = useMemo(() => getCartSubtotal(eligibleItems), [eligibleItems]);
  const shipping = getShippingAmount(subtotal);
  const total = getCheckoutTotal(subtotal);

  if (eligibleItems.length === 0) {
    return (
      <Container className="flex flex-col items-center gap-5 py-24 text-center sm:py-32">
        <ShoppingBag className="h-10 w-10 text-cacao/25" strokeWidth={1} aria-hidden />
        <div>
          <h1 className="font-display font-medium text-4xl leading-tight tracking-tight sm:text-5xl">Your cart is empty.</h1>
          <p className="mt-3 max-w-md text-base text-muted">Add something to your cart before checking out.</p>
        </div>
        <Button href="/shop" size="lg">
          Browse Collection
        </Button>
      </Container>
    );
  }

  function handleValidSubmit(values: CheckoutFormValues) {
    const order = buildDemoOrder({ values, items: eligibleItems, subtotal });
    saveDemoOrder(order);
    clearCart();
    router.push("/order-confirmation");
  }

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Checkout</p>
        <h1 className="mt-3 font-display font-medium text-4xl leading-tight tracking-tight sm:text-5xl">Complete your order.</h1>
        <p className="mt-3 text-base text-muted">
          Enter your delivery details and review your order before placing it.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <CheckoutForm onValidSubmit={handleValidSubmit} />
        </div>
        <div className="lg:col-span-5">
          {/* lg:top-32 (not lg:top-24): clears the sticky marquee+header
              stack, not just the header — see AnnouncementMarquee.tsx. */}
          <div className="lg:sticky lg:top-32">
            <OrderSummary items={eligibleItems} subtotal={subtotal} shipping={shipping} total={total} />
          </div>
        </div>
      </div>
    </Container>
  );
}
