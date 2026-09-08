import type { Metadata } from "next";
import { WishlistPageContent } from "@/components/wishlist/WishlistPageContent";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Wishlist | ${siteConfig.fullName}`,
  description: "Products you've saved to come back to.",
};

export default function WishlistPage() {
  return <WishlistPageContent />;
}
