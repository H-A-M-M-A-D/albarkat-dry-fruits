import { Gift } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** One restrained row, not a full editorial section, linking to the dedicated /corporate-gifting page. */
export function CorporateGiftingTeaser() {
  return (
    <div className="border-y border-cacao/10 bg-ivory">
      <Container className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:justify-between sm:gap-6 sm:py-9 sm:text-left">
        <div className="flex items-center gap-3">
          <Gift className="h-5 w-5 shrink-0 text-olive" strokeWidth={1.5} aria-hidden />
          <p className="text-base font-medium text-cacao">Gifting for teams, clients, or events?</p>
        </div>
        <Button href="/corporate-gifting" variant="secondary" size="sm" className="shrink-0">
          Corporate Gifting
        </Button>
      </Container>
    </div>
  );
}
