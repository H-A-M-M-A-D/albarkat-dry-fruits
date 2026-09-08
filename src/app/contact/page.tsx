import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.fullName}`,
  description: "Send AL-Barkat an inquiry.",
};

export default function ContactPage() {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <PageHeader
        eyebrow="Contact"
        title="Get in touch."
        intro="Have a question about an order, a product, or gifting? Share a few details using the form below."
      />

      <div className="mt-10 max-w-2xl sm:mt-12">
        <ContactForm />
      </div>
    </Container>
  );
}
