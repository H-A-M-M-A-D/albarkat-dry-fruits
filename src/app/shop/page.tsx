import type { Metadata } from "next";
import { ShopPageContent } from "@/components/shop/ShopPageContent";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Shop | ${siteConfig.fullName}`,
  description: "Browse dates, nuts, dried fruits, and gifting selections in one place.",
};

export default function ShopPage() {
  return <ShopPageContent />;
}
