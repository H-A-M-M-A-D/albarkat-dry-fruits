"use client";

import { Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";
import { useDemoOrder } from "@/lib/use-demo-order";
import { OrderSummary } from "./OrderSummary";

export function OrderConfirmationContent() {
  const order = useDemoOrder();

  if (order === null) {
    return (
      <Container className="flex flex-col items-center gap-5 py-24 text-center sm:py-32">
        <Compass className="h-10 w-10 text-cacao/25" strokeWidth={1} aria-hidden />
        <div>
          <h1 className="font-display font-medium text-4xl leading-tight tracking-tight sm:text-5xl">No demo order found.</h1>
          <p className="mt-3 max-w-md text-base text-muted">
            We couldn&apos;t find a demo order for this session. Start again from the shop.
          </p>
        </div>
        <Button href="/shop" size="lg">
          Browse Collection
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Demo Order</p>
        <h1 className="mt-3 font-display font-medium text-4xl leading-tight tracking-tight sm:text-5xl">
          Your demo order has been created.
        </h1>
        <p className="mt-4 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-cacao">
          This is a demonstration order and has not been submitted to {siteConfig.name}. No payment was processed
          and nothing will be delivered.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 className="font-display font-medium text-2xl text-cacao">Order Details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-cacao/10 pb-3">
              <dt className="text-muted">Demo order number</dt>
              <dd className="font-medium text-cacao">{order.orderId}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-cacao/10 pb-3">
              <dt className="text-muted">Customer</dt>
              <dd className="font-medium text-cacao">{order.customer.fullName}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-cacao/10 pb-3">
              <dt className="text-muted">Delivery city</dt>
              <dd className="font-medium text-cacao">
                {order.deliveryAddress.city}, {order.deliveryAddress.province}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Payment method</dt>
              <dd className="font-medium text-cacao">{order.paymentMethod}</dd>
            </div>
          </dl>

          <Button href="/shop" variant="secondary" size="lg" className="mt-8">
            Continue Shopping
          </Button>
        </div>
        <div className="lg:col-span-5">
          <OrderSummary items={order.items} subtotal={order.subtotal} shipping={order.shipping} total={order.total} />
        </div>
      </div>
    </Container>
  );
}
