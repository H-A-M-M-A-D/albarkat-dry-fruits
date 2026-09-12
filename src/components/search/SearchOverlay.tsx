"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Search as SearchIcon, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductImage } from "@/components/product/ProductImage";
import { IconButton } from "@/components/ui/IconButton";
import { formatPrice } from "@/lib/format-price";
import { getStartingPrice, products } from "@/lib/products";
import { searchProducts } from "@/lib/search";
import { useSearch } from "@/lib/search-context";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Split out from `SearchOverlay` so `query` state lives inside the subtree
 * `AnimatePresence` mounts/unmounts — a fresh instance (and therefore a
 * blank field) is created every time the overlay opens, with no effect
 * needed to reset it on close.
 */
function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const trimmedQuery = query.trim();
  const results = useMemo(() => searchProducts(products, query), [query]);

  return (
    <div className="overflow-hidden rounded-2xl border border-cacao/10 bg-ivory shadow-xl">
      <div className="flex items-center gap-3 border-b border-cacao/10 px-5 py-4">
        <SearchIcon className="h-5 w-5 shrink-0 text-cacao/40" strokeWidth={1.5} aria-hidden />
        <label htmlFor="site-search-input" className="sr-only">
          Search products
        </label>
        <input
          id="site-search-input"
          type="text"
          autoFocus
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the collection"
          className="w-full bg-transparent text-base text-cacao placeholder:text-cacao/40 focus:outline-none"
        />
        <IconButton aria-label="Close search" onClick={onClose} className="shrink-0">
          <X className="h-5 w-5" strokeWidth={1.5} />
        </IconButton>
      </div>

      <div className="max-h-[60vh] overflow-y-auto p-2">
        {trimmedQuery === "" ? (
          <p className="px-4 py-10 text-center text-sm text-muted">Search the collection</p>
        ) : results.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <p className="text-sm font-medium text-cacao">No products found.</p>
            <p className="mt-1 text-sm text-muted">Try another product or category.</p>
          </div>
        ) : (
          <ul>
            {results.map((product) => {
              const startingPrice = getStartingPrice(product);
              const hasMultipleVariants = (product.variants?.length ?? 0) > 1;
              return (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-cacao/[0.04] focus-visible:outline-none focus-visible:bg-cacao/[0.04] focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-cacao/10 bg-card">
                      <ProductImage src={product.image} alt={product.imageAlt} sizes="56px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-base text-cacao">
                        {product.shortName ?? product.name}
                      </p>
                      <p className="text-xs text-muted">{product.category}</p>
                    </div>
                    {startingPrice !== undefined && (
                      <span className="shrink-0 text-sm font-medium text-cacao">
                        {hasMultipleVariants ? "From " : ""}
                        {formatPrice(startingPrice, product.currency)}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export function SearchOverlay() {
  const { isOpen, closeSearch } = useSearch();
  const reduced = useSafeReducedMotion();

  const backdropTransition = reduced ? { duration: 0 } : { duration: 0.2 };
  const panelTransition = reduced ? { duration: 0 } : { duration: 0.25, ease: EASE };

  return (
    <AnimatePresence>
      {isOpen && (
        <div>
          {/* z-40, deliberately below the header's z-50: keeps the header's own
              Search/Cart/menu controls clickable above this backdrop, which is
              what lets those handlers close this overlay when opened. */}
          <motion.div
            className="fixed inset-0 z-40 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
            onClick={closeSearch}
            aria-hidden
          />
          <motion.div
            // top-32 (not top-24): clears the sticky AnnouncementMarquee +
            // Header stack (44/45px + 80px), not just the header alone.
            className="fixed inset-x-0 top-32 z-40 mx-auto w-full max-w-2xl px-4 sm:px-6"
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
            transition={panelTransition}
            // Deliberately non-modal: the header's Search/Cart/menu controls
            // stay interactive above this overlay (see the z-index note
            // above) and focus isn't trapped inside it, so `aria-modal`
            // would misrepresent the actual behavior to assistive tech.
            role="dialog"
            aria-label="Search"
          >
            <SearchPanel onClose={closeSearch} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
