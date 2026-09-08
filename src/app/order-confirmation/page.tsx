import type { Metadata } from "next";
import { OrderConfirmationContent } from "@/components/checkout/OrderConfirmationContent";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Demo Order Confirmation | ${siteConfig.fullName}`,
  description: "Demo order confirmation.",
};

export default function OrderConfirmationPage() {
  return <OrderConfirmationContent />;
}
