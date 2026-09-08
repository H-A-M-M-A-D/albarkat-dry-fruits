import { getCategoryBySlug } from "./categories";
import type { Category } from "./product-types";
import { getStorefrontGroupBySlug, type StorefrontGroup } from "./storefront-groups";

/**
 * Single place that resolves a `/shop/[category]` URL segment to what it
 * actually means — a real category, a storefront group (e.g. "nuts"), or
 * neither. Every consumer (the route, the page shell, the filter nav) goes
 * through this instead of re-checking category/group lists itself.
 */
export type ShopTarget =
  | { type: "category"; slug: string; name: string; category: Category }
  | { type: "group"; slug: string; name: string; group: StorefrontGroup };

export function resolveShopTarget(slug: string): ShopTarget | undefined {
  const category = getCategoryBySlug(slug);
  if (category) {
    return { type: "category", slug: category.slug, name: category.name, category };
  }

  const group = getStorefrontGroupBySlug(slug);
  if (group) {
    return { type: "group", slug: group.slug, name: group.label, group };
  }

  return undefined;
}
