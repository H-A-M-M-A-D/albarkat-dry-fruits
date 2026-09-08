import type { Metadata } from "next";
import { CheckoutPageContent } from "@/components/checkout/CheckoutPageContent";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Checkout | ${siteConfig.fullName}`,
  description: "Complete your order.",
};

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}
