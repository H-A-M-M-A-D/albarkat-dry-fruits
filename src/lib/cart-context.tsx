"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cartReducer, getCartCount, getCartSubtotal, validateCartItems } from "./cart-reducer";
import type { CartItem } from "./cart-types";

const STORAGE_KEY = "albarkat:cart";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  incrementItem: (productId: string, variantId?: string) => void;
  decrementItem: (productId: string, variantId?: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  // Initial state always matches the server (`[]`) — real persisted state is
  // read from `localStorage` only after mount, in the effect below, so
  // hydration never has to reconcile a mismatch (same pattern as
  // `useSafeReducedMotion`).
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isOpen, setIsOpen] = useState(false);
  // Deliberately state, not a ref: the persist effect below needs to skip
  // every render up to *and including* the one that hydrated `items` — a
  // ref mutated inside the hydrate effect would already read `true` to the
  // persist effect running right after it in that same commit, while
  // `items` in that same effect's closure is still the pre-hydration `[]`,
  // overwriting `localStorage` before the hydrated value ever reaches it.
  // State guarantees `hydrated` and the hydrated `items` land together on
  // the same render.
  const [hydrated, setHydrated] = useState(false);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        dispatch({ type: "hydrate", items: validateCartItems(JSON.parse(raw)) });
      }
    } catch {
      // Malformed storage — start from an empty cart rather than crash.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    // Skip every render before hydration has actually landed, so an empty
    // initial state never overwrites whatever was persisted before it's
    // been read.
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage unavailable/full — cart still works for this session.
    }
  }, [items, hydrated]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const value = useMemo<CartContextValue>(() => {
    const count = getCartCount(items);
    const subtotal = getCartSubtotal(items);

    return {
      items,
      count,
      subtotal,
      isOpen,
      openCart: () => {
        lastFocused.current = document.activeElement as HTMLElement | null;
        setIsOpen(true);
      },
      closeCart: () => {
        setIsOpen(false);
        lastFocused.current?.focus?.();
      },
      addItem: (item, quantity) => dispatch({ type: "add", item, quantity }),
      removeItem: (productId, variantId) => dispatch({ type: "remove", productId, variantId }),
      incrementItem: (productId, variantId) => dispatch({ type: "increment", productId, variantId }),
      decrementItem: (productId, variantId) => dispatch({ type: "decrement", productId, variantId }),
      clearCart: () => dispatch({ type: "clear" }),
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
