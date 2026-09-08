export interface StorefrontGroup {
  slug: string;
  label: string;
  /** Real `Category.slug` values this group spans — navigation/taxonomy only, never written onto any `Product`. */
  categorySlugs: string[];
}

export const storefrontGroups: StorefrontGroup[] = [
  {
    slug: "nuts",
    label: "Nuts",
    categorySlugs: ["almonds", "pistachios", "cashews", "walnuts"],
  },
];

export function getStorefrontGroupBySlug(slug: string): StorefrontGroup | undefined {
  return storefrontGroups.find((group) => group.slug === slug);
}
