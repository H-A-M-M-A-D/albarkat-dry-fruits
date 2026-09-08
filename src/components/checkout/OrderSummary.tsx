import { ProductImage } from "@/components/product/ProductImage";
import { formatPrice } from "@/lib/format-price";
import type { Currency } from "@/lib/product-types";

/**
 * The minimal shape both a live cart line (`CheckoutEligibleCartItem`) and a
 * saved demo order line (`DemoOrderItem`) satisfy — this component renders
 * either without caring which, so /checkout and /order-confirmation share
 * one summary rather than duplicating this markup.
 */
export interface OrderSummaryLine {
  productId: string;
  name: string;
  image: string;
  imageAlt: string;
  variantLabel?: string;
  unitPrice: number;
  currency?: Currency;
  quantity: number;
}

export function OrderSummary({
  items,
  subtotal,
  shipping,
  total,
}: {
  items: OrderSummaryLine[];
  subtotal: number;
  shipping: number;
  total: number;
}) {
  return (
    <div className="rounded-2xl border border-cacao/10 bg-card p-6">
      <h2 className="font-serif text-2xl text-cacao">Order Summary</h2>

      <ul className="mt-5 space-y-4">
        {items.map((line) => (
          <li key={`${line.productId}::${line.variantLabel ?? ""}`} className="flex gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-cacao/10 bg-ivory">
              <ProductImage src={line.image} alt={line.imageAlt} sizes="64px" />
            </div>
            <div className="flex min-w-0 flex-1 items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate font-serif text-base text-cacao">{line.name}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {[line.variantLabel, `Qty ${line.quantity}`].filter(Boolean).join(" · ")}
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium text-cacao">
                {formatPrice(line.unitPrice * line.quantity, line.currency)}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 space-y-2 border-t border-cacao/10 pt-5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted">Subtotal</span>
          <span className="font-medium text-cacao">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Shipping</span>
          <span className="font-medium text-cacao">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-cacao/10 pt-4">
        <span className="text-base font-medium text-cacao">Total</span>
        <span className="text-lg font-medium text-cacao">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
