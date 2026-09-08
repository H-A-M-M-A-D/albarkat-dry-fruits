import Link from "next/link";
import { categories } from "@/lib/categories";
import { storefrontGroups } from "@/lib/storefront-groups";

type Tab = { slug: string | undefined; name: string; href: string };

/**
 * Builds the tab order data-driven, with no per-category or per-group
 * name check: each group's tab is placed immediately before the first
 * category (in `categories` order) that belongs to it — e.g. "Nuts" lands
 * right before "Almonds" because Almonds is the first nuts-group category
 * in `categories`. Adding/reordering groups or categories never needs this
 * file touched.
 */
function buildTabs(): Tab[] {
  const groupInsertionPoint = new Map<string, (typeof storefrontGroups)[number]>();
  for (const group of storefrontGroups) {
    const firstMember = categories.find((category) => group.categorySlugs.includes(category.slug));
    if (firstMember) groupInsertionPoint.set(firstMember.slug, group);
  }

  const tabs: Tab[] = [{ slug: undefined, name: "All", href: "/shop" }];
  for (const category of categories) {
    const group = groupInsertionPoint.get(category.slug);
    if (group) tabs.push({ slug: group.slug, name: group.label, href: `/shop/${group.slug}` });
    tabs.push({ slug: category.slug, name: category.name, href: category.href });
  }
  return tabs;
}

/**
 * Real navigation, not client-side filtering — each pill is a plain `<Link>`
 * to `/shop`, `/shop/[category]`, or a storefront group's `/shop/[group]`,
 * so the active state is derivable server-side from the current route with
 * no client JS required.
 */
export function CategoryFilterNav({ activeSlug }: { activeSlug?: string }) {
  const tabs = buildTabs();

  return (
    <nav aria-label="Filter by category" className="edge-fade-x scrollbar-hide -mx-5 flex gap-2.5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0">
      {tabs.map((tab) => {
        const isActive = activeSlug === tab.slug;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory ${
              isActive
                ? "border-cacao bg-cacao text-ivory shadow-[0_2px_10px_-4px_rgba(59,33,24,0.5)]"
                : "border-cacao/15 text-cacao/80 hover:border-cacao/40 hover:text-cacao"
            }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </nav>
  );
}
