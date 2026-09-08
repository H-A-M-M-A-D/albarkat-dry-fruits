import { Gift, HeartHandshake, PartyPopper, Users } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Corporate Gifting | ${siteConfig.fullName}`,
  description: "Thoughtful gifting inquiries for teams, clients, and events.",
};

const USE_CASES = [
  { icon: Users, label: "Corporate Gifting" },
  { icon: HeartHandshake, label: "Team Gifting" },
  { icon: PartyPopper, label: "Event Gifting" },
  { icon: Gift, label: "Client & Custom Inquiries" },
];

export default function CorporateGiftingPage() {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <PageHeader
        eyebrow="Corporate Gifting"
        title="Thoughtful gifting for teams, clients, and events."
        intro="Nuts, dates, and dried fruits make a natural gift for colleagues, clients, and guests. If you're exploring options for your team or an upcoming event, we'd like to hear from you."
      />

      <ul className="mt-10 grid grid-cols-2 gap-5 sm:mt-12 sm:grid-cols-4 sm:gap-6">
        {USE_CASES.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex flex-col items-start gap-3 rounded-2xl border border-cacao/10 bg-card p-5"
          >
            <Icon className="h-5 w-5 text-olive" strokeWidth={1.5} aria-hidden />
            <span className="text-sm font-medium text-cacao">{label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 max-w-2xl sm:mt-12">
        <p className="text-base leading-relaxed text-muted">
          Share a few details about what you&apos;re looking for through the Contact page.
        </p>
        <Button href="/contact" size="lg" className="mt-6">
          Contact Us
        </Button>
      </div>
    </Container>
  );
}
