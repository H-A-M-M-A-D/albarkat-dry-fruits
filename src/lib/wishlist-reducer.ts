import type { WishlistItem } from "./wishlist-types";

export type WishlistAction =
  | { type: "add"; item: WishlistItem }
  | { type: "remove"; productId: string }
  | { type: "toggle"; item: WishlistItem }
  | { type: "clear" }
  | { type: "hydrate"; items: WishlistItem[] };

export function wishlistReducer(state: WishlistItem[], action: WishlistAction): WishlistItem[] {
  switch (action.type) {
    case "add": {
      if (state.some((line) => line.productId === action.item.productId)) return state;
      return [...state, action.item];
    }

    case "remove":
      return state.filter((line) => line.productId !== action.productId);

    case "toggle": {
      const exists = state.some((line) => line.productId === action.item.productId);
      return exists
        ? state.filter((line) => line.productId !== action.item.productId)
        : [...state, action.item];
    }

    case "clear":
      return [];

    case "hydrate":
      return action.items;

    default:
      return state;
  }
}

/**
 * Defensively narrows an arbitrary JSON value (from `localStorage`) into a
 * safe `WishlistItem[]`: drops malformed entries, drops duplicate
 * `productId`s, and drops any `productId` not present in `validProductIds`
 * (e.g. a product removed from the catalog since it was saved) — a
 * wishlist read from storage can never crash rendering or reference a
 * product that no longer exists.
 */
export function validateWishlistItems(data: unknown, validProductIds: ReadonlySet<string>): WishlistItem[] {
  if (!Array.isArray(data)) return [];

  const seen = new Set<string>();
  const items: WishlistItem[] = [];
  for (const raw of data) {
    if (!raw || typeof raw !== "object") continue;
    const candidate = raw as Record<string, unknown>;

    if (typeof candidate.productId !== "string" || candidate.productId.length === 0) continue;
    if (typeof candidate.slug !== "string" || candidate.slug.length === 0) continue;
    if (seen.has(candidate.productId)) continue;
    if (!validProductIds.has(candidate.productId)) continue;

    seen.add(candidate.productId);
    items.push({ productId: candidate.productId, slug: candidate.slug });
  }
  return items;
}
