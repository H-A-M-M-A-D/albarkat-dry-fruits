"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type SearchContextValue = {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
};

const SearchContext = createContext<SearchContextValue | null>(null);

/** Open/close coordination only — matches the isOpen slice of CartProvider. */
export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        lastFocused.current?.focus?.();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const value: SearchContextValue = {
    isOpen,
    openSearch: () => {
      lastFocused.current = document.activeElement as HTMLElement | null;
      setIsOpen(true);
    },
    closeSearch: () => {
      setIsOpen(false);
      lastFocused.current?.focus?.();
    },
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within a SearchProvider");
  return context;
}
