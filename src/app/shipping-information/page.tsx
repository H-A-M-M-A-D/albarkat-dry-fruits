import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Shipping Information | ${siteConfig.fullName}`,
  description: "General shipping information for AL-Barkat.",
};

const SECTIONS = [
  {
    heading: "Delivery coverage",
    body: "Delivery coverage is being finalized. Please contact AL-Barkat to confirm whether delivery is available in your area.",
  },
  {
    heading: "Shipping charges",
    body: "Shipping charges and delivery estimates may vary and are not yet finalized. The checkout on this site currently shows demo shipping figures used only to test the ordering flow, not confirmed pricing.",
  },
  {
    heading: "Order processing",
    body: "Order processing times are not yet confirmed. Please contact AL-Barkat for current information.",
  },
  {
    heading: "Delivery questions",
    body: "For any other delivery question, use the Contact page.",
  },
];

export default function ShippingInformationPage() {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <PageHeader
        eyebrow="Help"
        title="Shipping Information"
        intro="Shipping availability, charges, and delivery estimates may vary. Please contact AL-Barkat for current delivery information."
      />

      <div className="mt-10 max-w-2xl space-y-8 sm:mt-12">
        {SECTIONS.map((section) => (
          <div key={section.heading}>
            <h2 className="font-serif text-xl tracking-tight text-cacao">{section.heading}</h2>
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
