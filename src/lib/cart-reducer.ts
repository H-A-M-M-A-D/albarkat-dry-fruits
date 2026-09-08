import { cartLineKey, type CartItem } from "./cart-types";

export type CartAction =
  | { type: "add"; item: Omit<CartItem, "quantity">; quantity?: number }
  | { type: "remove"; productId: string; variantId?: string }
  | { type: "increment"; productId: string; variantId?: string }
  | { type: "decrement"; productId: string; variantId?: string }
  | { type: "clear" }
  | { type: "hydrate"; items: CartItem[] };

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "add": {
      const key = cartLineKey(action.item);
      const quantity = Math.max(1, action.quantity ?? 1);
      const existing = state.find((line) => cartLineKey(line) === key);
      if (existing) {
        return state.map((line) =>
          cartLineKey(line) === key ? { ...line, quantity: line.quantity + quantity } : line,
        );
      }
      return [...state, { ...action.item, quantity }];
    }

    case "remove": {
      const key = cartLineKey(action);
      return state.filter((line) => cartLineKey(line) !== key);
    }

    case "increment": {
      const key = cartLineKey(action);
      return state.map((line) =>
        cartLineKey(line) === key ? { ...line, quantity: line.quantity + 1 } : line,
      );
    }

    case "decrement": {
      const key = cartLineKey(action);
      return state
        .map((line) => (cartLineKey(line) === key ? { ...line, quantity: line.quantity - 1 } : line))
        .filter((line) => line.quantity > 0);
    }

    case "clear":
      return [];

    case "hydrate":
      return action.items;

    default:
      return state;
  }
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((sum, line) => sum + line.quantity, 0);
}

/** Sum of unitPrice × quantity across every line — see `CartItem`'s doc comment for why this uses the price captured at add-time, not a live catalog lookup. */
export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, line) => sum + (line.unitPrice ?? 0) * line.quantity, 0);
}

/**
 * Defensively narrows an arbitrary JSON value (from `localStorage`) into a
 * safe `CartItem[]`, dropping anything malformed instead of throwing —
 * corrupted or hand-edited storage must never crash rendering.
 */
export function validateCartItems(data: unknown): CartItem[] {
  if (!Array.isArray(data)) return [];

  const items: CartItem[] = [];
  for (const raw of data) {
    if (!raw || typeof raw !== "object") continue;
    const candidate = raw as Record<string, unknown>;

    if (typeof candidate.productId !== "string" || candidate.productId.length === 0) continue;
    if (typeof candidate.slug !== "string" || candidate.slug.length === 0) continue;
    if (typeof candidate.name !== "string" || candidate.name.length === 0) continue;
    if (typeof candidate.image !== "string" || candidate.image.length === 0) continue;
    if (typeof candidate.imageAlt !== "string") continue;
    if (typeof candidate.category !== "string") continue;
    if (typeof candidate.quantity !== "number" || !Number.isFinite(candidate.quantity) || candidate.quantity <= 0) {
      continue;
    }
    if (candidate.variantId !== undefined && typeof candidate.variantId !== "string") continue;
    if (candidate.variantLabel !== undefined && typeof candidate.variantLabel !== "string") continue;
    if (candidate.unitPrice !== undefined && typeof candidate.unitPrice !== "number") continue;
    if (candidate.currency !== undefined && typeof candidate.currency !== "string") continue;

    items.push({
      productId: candidate.productId,
      slug: candidate.slug,
      name: candidate.name,
      image: candidate.image,
      imageAlt: candidate.imageAlt,
      category: candidate.category,
      quantity: Math.floor(candidate.quantity),
      ...(candidate.variantId !== undefined ? { variantId: candidate.variantId as string } : {}),
      ...(candidate.variantLabel !== undefined ? { variantLabel: candidate.variantLabel as string } : {}),
      ...(candidate.unitPrice !== undefined ? { unitPrice: candidate.unitPrice as number } : {}),
      ...(candidate.currency !== undefined ? { currency: candidate.currency as CartItem["currency"] } : {}),
    });
  }
  return items;
}
