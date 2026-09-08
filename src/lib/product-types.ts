export type Currency = "PKR";

export type ProductAvailability = "in-stock" | "out-of-stock" | "preorder";

/** Only set when real — never used to fabricate a claim. */
export type ProductBadge = "new" | "limited" | "bestseller";

export interface ProductVariant {
  id: string;
  /** Display label, e.g. "250g". */
  label: string;
  /** Weight in grams — the single canonical unit; `label` carries the display string (e.g. "1kg"). */
  weightGrams: number;
  price: number;
  /** Only present when a real, confirmed discount applies. */
  compareAtPrice?: number;
  available: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Shorter label for tight layouts (cards, chips), falls back to `name`. */
  shortName?: string;
  category: string;
  categorySlug: string;
  description: string;
  image: string;
  imageAlt: string;
  /**
   * All commercial fields below are optional and must be **entirely absent**
   * (not zero, not empty-string) for a product without confirmed catalog
   * data — `ProductCard` renders no price/variant/CTA row at all in that
   * case rather than fabricating placeholder commercial values.
   */
  variants?: ProductVariant[];
  /** Default/starting price shown on the card — mirrors the default variant. */
  price?: number;
  compareAtPrice?: number;
  currency?: Currency;
  availability?: ProductAvailability;
  badge?: ProductBadge;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  tags?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string;
  image: string;
  imageAlt: string;
  href: string;
  /**
   * Restrained CSS zoom (e.g. 1.15) applied to the tile image only — some
   * source photos show more/smaller pieces than others, so a slight per-image
   * scale keeps the apparent subject mass visually consistent across the set
   * without cropping or re-exporting any source file.
   */
  imageScale?: number;
}
