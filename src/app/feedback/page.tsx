import type { Metadata } from "next";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Feedback | ${siteConfig.fullName}`,
  description: "Share feedback about your experience with AL-Barkat.",
};

export default function FeedbackPage() {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <PageHeader
        eyebrow="Feedback"
        title="Share your feedback."
        intro="Thoughts on the site, a product, or your experience so far? This helps shape what comes next."
      />

      <div className="mt-10 max-w-2xl sm:mt-12">
        <FeedbackForm />
      </div>
    </Container>
  );
}
