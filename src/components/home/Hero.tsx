"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { heroContent } from "@/lib/home-content";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { HeroVisual } from "./HeroVisual";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useSafeReducedMotion();

  // `useSafeReducedMotion` always resolves `false` on the hydration render
  // (by design, to match the server), correcting to the real value on the
  // very next render — but `initial` is a mount-time-only prop, so on an
  // already-mounted motion element that correction alone doesn't stop the
  // full animated entrance already in flight. The `key` below forces a fresh
  // mount exactly when `reduced` flips, so `initial={false}` actually takes
  // effect for reduced-motion users instead of only being read too late.
  return (
    <section className="relative overflow-hidden bg-ivory">
      {/* lg:items-center + no lg:min-h-[86vh]: the old 86vh floor made the
          row far taller than HeroVisual's own footprint, so centering
          against it left a big dead gap above the headline. HeroVisual is
          now capped at 600px (not 680) and the row's own padding is
          trimmed, so the row height stays close to the visual's natural
          size — centering the shorter text column against it only adds a
          modest, even gap on each side instead of the old viewport-based
          stretch. */}
      <Container className="relative grid grid-cols-1 items-center gap-8 py-12 sm:py-14 md:gap-6 md:py-10 lg:grid-cols-[1fr_1.25fr] lg:items-center lg:gap-10 lg:pt-8 lg:pb-12">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <motion.p
            key={reduced ? "eyebrow-reduced" : "eyebrow-motion"}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-xs font-medium uppercase tracking-[0.18em] text-muted"
          >
            {heroContent.eyebrow}
          </motion.p>

          <h1 className="mt-5 font-serif text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            {heroContent.headline.map((line, index) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  key={reduced ? "reduced" : "motion"}
                  className="block"
                  initial={reduced ? false : { y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.15 + index * 0.12, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            key={reduced ? "body-reduced" : "body-motion"}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted lg:mx-0"
          >
            {heroContent.body}
          </motion.p>

          <motion.div
            key={reduced ? "ctas-reduced" : "ctas-motion"}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Button href={heroContent.primaryCta.href} size="lg">
              {heroContent.primaryCta.label}
            </Button>
            <Button href={heroContent.secondaryCta.href} size="lg" variant="secondary">
              {heroContent.secondaryCta.label}
            </Button>
          </motion.div>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}
