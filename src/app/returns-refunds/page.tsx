import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Returns & Refunds | ${siteConfig.fullName}`,
  description: "How to reach AL-Barkat about a return, refund, or order concern.",
};

const SECTIONS = [
  {
    heading: "Damaged or incorrect items",
    body: "If an item arrives damaged or isn't what you ordered, contact AL-Barkat with your order details.",
  },
  {
    heading: "Product-condition concerns",
    body: "If you have a concern about the condition or quality of a product you received, reach out with your order details and photos where possible.",
  },
  {
    heading: "Refund and return process",
    body: "Return and refund terms are not yet finalized. For return or refund questions, contact AL-Barkat with your order details.",
  },
];

export default function ReturnsRefundsPage() {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <PageHeader
        eyebrow="Help"
        title="Returns & Refunds"
        intro="For return or refund questions, contact AL-Barkat with your order details."
      />

      <div className="mt-10 max-w-2xl space-y-8 sm:mt-12">
        {SECTIONS.map((section) => (
          <div key={section.heading}>
            <h2 className="font-display font-medium text-xl tracking-tight text-cacao">{section.heading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{section.body}</p>
          </div>
        ))}
      </div>

      <Button href="/contact" size="lg" className="mt-10">
        Contact Us
      </Button>
    </Container>
  );
}
