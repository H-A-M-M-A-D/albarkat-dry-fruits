import type { Product } from "./product-types";

/**
 * Case-insensitive substring match over real product fields only (name,
 * category, description, slug) — no fabricated search metadata. Simple
 * native matching is intentional; no fuzzy-search dependency.
 */
export function searchProducts(products: Product[], query: string): Product[] {
  const normalized = query.trim().toLowerCase().replace(/\s+/g, " ");
  if (!normalized) return [];

  return products.filter((product) => {
    const haystacks = [product.name, product.category, product.description, product.slug];
    return haystacks.some((value) => value.toLowerCase().includes(normalized));
  });
}
