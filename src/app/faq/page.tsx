import type { Metadata } from "next";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { faqItems } from "@/lib/faq-content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `FAQ | ${siteConfig.fullName}`,
  description: "Answers to common questions about shopping, gifting, and the current demo checkout.",
};

export default function FaqPage() {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <PageHeader
        eyebrow="Help"
        title="Frequently asked questions."
        intro="Answers to a few common questions. For anything not covered here, contact AL-Barkat directly."
      />

      <div className="mt-10 max-w-2xl sm:mt-12">
        <FaqAccordion items={faqItems} />
      </div>
    </Container>
  );
}
