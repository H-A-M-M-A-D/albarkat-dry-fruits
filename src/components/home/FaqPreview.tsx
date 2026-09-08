import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Section } from "@/components/ui/Section";
import { getFaqPreviewItems } from "@/lib/faq-content";

export function FaqPreview() {
  return (
    <Section tone="card" padding="compact">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-lg">
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">A few common questions</h2>
        </div>
        <Link
          href="/faq"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-sm text-sm font-medium text-cacao focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          View All FAQs
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={1.5}
          />
        </Link>
      </div>

      <div className="mt-8 max-w-2xl">
        <FaqAccordion items={getFaqPreviewItems()} />
      </div>
    </Section>
  );
}
