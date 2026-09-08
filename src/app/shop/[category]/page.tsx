import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopPageContent } from "@/components/shop/ShopPageContent";
import { categories } from "@/lib/categories";
import { resolveShopTarget } from "@/lib/shop-routing";
import { siteConfig } from "@/lib/site-config";
import { storefrontGroups } from "@/lib/storefront-groups";

export function generateStaticParams() {
  return [
    ...categories.map((category) => ({ category: category.slug })),
    ...storefrontGroups.map((group) => ({ category: group.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const target = resolveShopTarget(slug);
  if (!target) return {};

  return {
    title: `${target.name} | ${siteConfig.fullName}`,
    description: `Browse ${target.name.toLowerCase()} at ${siteConfig.fullName}.`,
  };
}

export default async function CategoryShopPage({ params }: PageProps<"/shop/[category]">) {
  const { category: slug } = await params;
  const target = resolveShopTarget(slug);

  if (!target) {
    notFound();
  }

  return <ShopPageContent targetSlug={slug} />;
}
