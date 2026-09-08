import type { Product, ProductVariant } from "./product-types";

/**
 * ⚠️ DEV / PLACEHOLDER DATA ⚠️
 *
 * Name, description, and image fields below are temporary development data
 * used only to build and test the storefront architecture — none of it
 * reflects a confirmed catalog. Replace this entire array with real catalog
 * data before launch; nothing here should be treated as a business claim.
 * All seven products' `image` fields now point to original Al Barkat
 * prototype photography (see /public/products) — the illustrated
 * /public/dev placeholders are no longer referenced by any product.
 *
 * DEMO COMMERCIAL DATA
 * `price`/`variants`/`currency` below (added in Phase 7) are temporary
 * placeholder values, added only so the purchase and cart UX can be built
 * and tested end-to-end — not confirmed Al Barkat pricing. Replace with
 * confirmed catalog pricing before production launch. `DEMO_COMMERCE_DATA`
 * exists purely so this can never be mistaken for confirmed business data.
 */
export const DEMO_COMMERCE_DATA = true;

/** The temporary 250g/500g/1kg tiers shared by every demo product — see DEMO COMMERCIAL DATA above. */
function demoVariants(prices: { g250: number; g500: number; kg1: number }): ProductVariant[] {
  return [
    { id: "250g", label: "250g", weightGrams: 250, price: prices.g250, available: true },
    { id: "500g", label: "500g", weightGrams: 500, price: prices.g500, available: true },
    { id: "1kg", label: "1kg", weightGrams: 1000, price: prices.kg1, available: true },
  ];
}

export const products: Product[] = [
  {
    id: "dev-almonds",
    slug: "premium-almonds",
    name: "Premium Almonds",
    category: "Almonds",
    categorySlug: "almonds",
    description: "Placeholder description, replace with real product copy.",
    image: "/products/premium-almonds.webp",
    imageAlt: "Premium Almonds",
    featured: true,
    variants: demoVariants({ g250: 850, g500: 1600, kg1: 3000 }),
    price: 850,
    currency: "PKR",
  },
  {
    id: "dev-cashews",
    slug: "whole-cashews",
    name: "Whole Cashews",
    category: "Cashews",
    categorySlug: "cashews",
    description: "Placeholder description, replace with real product copy.",
    image: "/products/whole-cashews.png",
    imageAlt: "Whole Cashews",
    featured: true,
    variants: demoVariants({ g250: 950, g500: 1800, kg1: 3400 }),
    price: 950,
    currency: "PKR",
  },
  {
    id: "dev-dates",
    slug: "whole-dates",
    name: "Whole Dates",
    category: "Dates",
    categorySlug: "dates",
    description: "Placeholder description, replace with real product copy.",
    image: "/products/whole-dates.png",
    imageAlt: "Whole Dates",
    featured: true,
    variants: demoVariants({ g250: 550, g500: 1000, kg1: 1850 }),
    price: 550,
    currency: "PKR",
  },
  {
    id: "dev-pistachios",
    slug: "roasted-pistachios",
    name: "Roasted Pistachios",
    category: "Pistachios",
    categorySlug: "pistachios",
    description: "Placeholder description, replace with real product copy.",
    image: "/products/roasted-pistachios.png",
    imageAlt: "Roasted Pistachios",
    featured: true,
    variants: demoVariants({ g250: 1050, g500: 2000, kg1: 3800 }),
    price: 1050,
    currency: "PKR",
  },
  {
    id: "dev-walnuts",
    slug: "whole-walnuts",
    name: "Whole Walnuts",
    category: "Walnuts",
    categorySlug: "walnuts",
    description: "Placeholder description, replace with real product copy.",
    image: "/products/whole-walnuts.png",
    imageAlt: "Whole Walnuts",
    variants: demoVariants({ g250: 700, g500: 1300, kg1: 2450 }),
    price: 700,
    currency: "PKR",
  },
  {
    id: "dev-raisins",
    slug: "golden-raisins",
    name: "Golden Raisins",
    category: "Raisins",
    categorySlug: "raisins",
    description: "Placeholder description, replace with real product copy.",
    image: "/products/golden-raisins.png",
    imageAlt: "Golden Raisins",
    variants: demoVariants({ g250: 450, g500: 800, kg1: 1500 }),
    price: 450,
    currency: "PKR",
  },
  {
    id: "dev-dried-fruits",
    slug: "mixed-dried-fruits",
    name: "Mixed Dried Fruits",
    category: "Dried Fruits",
    categorySlug: "dried-fruits",
    description: "Placeholder description, replace with real product copy.",
    image: "/products/mixed-dried-fruits.png",
    imageAlt: "Mixed Dried Fruits",
    variants: demoVariants({ g250: 650, g500: 1200, kg1: 2250 }),
    price: 650,
    currency: "PKR",
  },
];

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.categorySlug === categorySlug);
}

/** For storefront groups (e.g. "Nuts") that span several real categories. */
export function getProductsByCategorySlugs(categorySlugs: string[]): Product[] {
  return products.filter((product) => categorySlugs.includes(product.categorySlug));
}

/** Other products from the same category, excluding the product itself. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((candidate) => candidate.categorySlug === product.categorySlug && candidate.id !== product.id)
    .slice(0, limit);
}

/**
 * The price to show in a listing (card/search result): the lowest price
 * across available variants, falling back to the product's own `price`
 * when it has no variants. `undefined` means no commercial data exists at
 * all — callers must render no price/CTA in that case.
 */
export function getStartingPrice(product: Product): number | undefined {
  const availableVariantPrices = (product.variants ?? [])
    .filter((variant) => variant.available)
    .map((variant) => variant.price);

  if (availableVariantPrices.length > 0) return Math.min(...availableVariantPrices);
  return product.price;
}
