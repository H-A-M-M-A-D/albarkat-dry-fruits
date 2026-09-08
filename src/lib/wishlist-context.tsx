"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import type { ReactNode } from "react";
import { products } from "./products";
import { validateWishlistItems, wishlistReducer } from "./wishlist-reducer";
import type { WishlistItem } from "./wishlist-types";

const STORAGE_KEY = "albarkat:wishlist";
const VALID_PRODUCT_IDS = new Set(products.map((product) => product.id));

type WishlistContextValue = {
  items: WishlistItem[];
  count: number;
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  toggleItem: (item: WishlistItem) => void;
  clearWishlist: () => void;
  isWishlisted: (productId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  // Same hydration-safe shape as CartProvider: state starts empty (matching
  // the server), the real value loads from localStorage after mount, and
  // `hydrated` is state (not a ref) so the persist effect below can never
  // run against a stale, pre-hydration `items` value.
  const [items, dispatch] = useReducer(wishlistReducer, []);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        dispatch({ type: "hydrate", items: validateWishlistItems(JSON.parse(raw), VALID_PRODUCT_IDS) });
      }
    } catch {
      // Malformed storage — start from an empty wishlist rather than crash.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage unavailable/full — wishlist still works for this session.
    }
  }, [items, hydrated]);

  useEffect(() => {
    // Cross-tab sync: the `storage` event only fires in *other* tabs, never
    // the tab that made the write, so this can't loop with the persist
    // effect above.
    function onStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY) return;
      try {
        const nextItems = event.newValue
          ? validateWishlistItems(JSON.parse(event.newValue), VALID_PRODUCT_IDS)
          : [];
        dispatch({ type: "hydrate", items: nextItems });
      } catch {
        // Malformed write from another tab — ignore, keep current state.
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo<WishlistContextValue>(() => {
    const ids = new Set(items.map((item) => item.productId));
    return {
      items,
      count: items.length,
      addItem: (item) => dispatch({ type: "add", item }),
      removeItem: (productId) => dispatch({ type: "remove", productId }),
      toggleItem: (item) => dispatch({ type: "toggle", item }),
      clearWishlist: () => dispatch({ type: "clear" }),
      isWishlisted: (productId) => ids.has(productId),
    };
  }, [items]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
}
