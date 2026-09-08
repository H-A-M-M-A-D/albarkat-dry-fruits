import type { Category } from "./product-types";

/**
 * Category labels only — not inventory or availability claims. Images are
 * original Al Barkat prototype photography (see /public/categories);
 * everything else here reflects the categories this site is actually
 * organized around.
 */
export const categories: Category[] = [
  {
    id: "dates",
    slug: "dates",
    name: "Dates",
    image: "/categories/dates.webp",
    imageAlt: "Dates",
    href: "/shop/dates",
  },
  {
    id: "almonds",
    slug: "almonds",
    name: "Almonds",
    image: "/categories/almonds.webp",
    imageAlt: "Almonds",
    href: "/shop/almonds",
  },
  {
    id: "pistachios",
    slug: "pistachios",
    name: "Pistachios",
    image: "/categories/pistachios.webp",
    imageAlt: "Pistachios",
    href: "/shop/pistachios",
  },
  {
    id: "cashews",
    slug: "cashews",
    name: "Cashews",
    image: "/categories/cashews.webp",
    imageAlt: "Cashews",
    href: "/shop/cashews",
  },
  {
    id: "walnuts",
    slug: "walnuts",
    name: "Walnuts",
    image: "/categories/walnuts.webp",
    imageAlt: "Walnuts",
    href: "/shop/walnuts",
    imageScale: 1.15,
  },
  {
    id: "raisins",
    slug: "raisins",
    name: "Raisins",
    image: "/categories/raisins.webp",
    imageAlt: "Raisins",
    href: "/shop/raisins",
    imageScale: 1.3,
  },
  {
    id: "dried-fruits",
    slug: "dried-fruits",
    name: "Dried Fruits",
    image: "/categories/dried-fruits.webp",
    imageAlt: "Assorted dried fruits",
    href: "/shop/dried-fruits",
    imageScale: 1.2,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
