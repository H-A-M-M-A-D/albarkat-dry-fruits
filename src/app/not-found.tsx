import { Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-5 py-24 text-center sm:py-32">
      <Compass className="h-10 w-10 text-cacao/25" strokeWidth={1} aria-hidden />
      <div>
        <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">We couldn&apos;t find that.</h1>
        <p className="mt-3 max-w-md text-base text-muted">
          The page you&apos;re looking for may have moved or doesn&apos;t exist. Let&apos;s get you back to
          browsing.
        </p>
      </div>
      <Button href="/shop" size="lg">
        Browse the Collection
      </Button>
    </Container>
  );
}
