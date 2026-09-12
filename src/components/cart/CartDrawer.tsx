"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { ProductImage } from "@/components/product/ProductImage";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { useCart } from "@/lib/cart-context";
import { cartLineKey } from "@/lib/cart-types";
import { getCheckoutEligibleItems } from "@/lib/checkout-validation";
import { formatPrice } from "@/lib/format-price";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, removeItem, incrementItem, decrementItem } = useCart();
  const reduced = useSafeReducedMotion();
  const canCheckout = getCheckoutEligibleItems(items).length > 0;

  const backdropTransition = reduced ? { duration: 0 } : { duration: 0.2 };
  const panelTransition = reduced ? { duration: 0 } : { duration: 0.35, ease: EASE };

  return (
    <AnimatePresence>
      {isOpen && (
        <div>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
            onClick={closeCart}
            aria-hidden
          />
          <motion.div
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-ivory shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={panelTransition}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-cacao/10 px-6 py-5">
              <h2 className="font-display font-medium text-2xl tracking-tight text-cacao">Your Cart</h2>
              <IconButton aria-label="Close cart" onClick={closeCart} autoFocus>
                <X className="h-5 w-5" strokeWidth={1.5} />
              </IconButton>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <ShoppingBag className="h-10 w-10 text-cacao/20" strokeWidth={1} aria-hidden />
                <div>
                  <p className="font-display text-xl text-cacao">Your cart is empty.</p>
                  <p className="mt-2 text-sm text-muted">
                    Browse the collection to find something for the table, pantry, or gifting.
                  </p>
                </div>
                <Button href="/shop" onClick={closeCart} size="sm">
                  Browse Collection
                </Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6 py-5">
                  {items.map((line) => (
                    <li
                      key={cartLineKey(line)}
                      className="flex gap-4 border-b border-cacao/10 py-6 first:pt-0 last:border-b-0"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-cacao/10 bg-card">
                        <ProductImage src={line.image} alt={line.imageAlt} sizes="80px" />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              href={`/product/${line.slug}`}
                              onClick={closeCart}
                              className="rounded-sm font-display text-base leading-snug text-cacao hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                            >
                              {line.name}
                            </Link>
                            {(line.variantLabel || line.unitPrice !== undefined) && (
                              <p className="mt-0.5 text-xs text-muted">
                                {[line.variantLabel, line.unitPrice !== undefined ? formatPrice(line.unitPrice, line.currency) : null]
                                  .filter(Boolean)
                                  .join(" · ")}
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            aria-label={`Remove ${line.name} from cart`}
                            onClick={() => removeItem(line.productId, line.variantId)}
                            className="shrink-0 rounded-sm text-xs font-medium text-cacao/50 underline-offset-2 transition-colors hover:text-cacao hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div
                            className="flex items-center gap-3 rounded-full border border-cacao/15 px-1"
                            role="group"
                            aria-label={`${line.name} quantity`}
                          >
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => decrementItem(line.productId, line.variantId)}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-cacao transition-colors hover:bg-cacao/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                            >
                              <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                            </button>
                            <span className="min-w-[1ch] text-sm font-medium text-cacao">{line.quantity}</span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => incrementItem(line.productId, line.variantId)}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-cacao transition-colors hover:bg-cacao/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                            >
                              <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                            </button>
                          </div>

                          {line.unitPrice !== undefined && (
                            <span className="text-sm font-medium text-cacao">
                              {formatPrice(line.unitPrice * line.quantity, line.currency)}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-cacao/10 px-6 py-6">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-cacao">Subtotal</span>
                    <span className="text-lg font-medium text-cacao">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted">Shipping is calculated at checkout.</p>
                  {canCheckout && (
                    <Button href="/checkout" onClick={closeCart} size="lg" className="mt-5 w-full">
                      Proceed to Checkout
                    </Button>
                  )}
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="mt-3 inline-flex rounded-sm text-sm font-medium text-cacao underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                  >
                    Continue shopping
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
