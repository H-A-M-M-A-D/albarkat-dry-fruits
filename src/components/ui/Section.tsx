import type { ComponentPropsWithoutRef } from "react";
import { Container } from "./Container";

const TONES = {
  ivory: "bg-ivory text-cacao",
  card: "bg-card text-cacao",
  forest: "bg-forest text-ivory",
  cacao: "bg-cacao text-ivory",
} as const;

const PADDING = {
  /** Standard editorial rhythm — hero-adjacent sections, story sections. */
  default: "py-16 sm:py-24 lg:py-32",
  /** Tighter rhythm for denser, browse-oriented sections (categories, grids). */
  compact: "py-12 sm:py-16 lg:py-24",
} as const;

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: keyof typeof TONES;
  padding?: keyof typeof PADDING;
  /** Set false for sections that manage their own inner container (e.g. full-bleed imagery). */
  contained?: boolean;
};

/** Vertical rhythm + background-tone wrapper shared by every homepage section. */
export function Section({
  tone = "ivory",
  padding = "default",
  contained = true,
  className,
  children,
  ...props
}: SectionProps) {
  // scroll-mt-32 (not scroll-mt-20): clears the sticky marquee+header stack
  // for any in-page anchor link that targets a Section's id, see
  // AnnouncementMarquee.tsx's doc comment.
  return (
    <section
      className={["scroll-mt-32", PADDING[padding], TONES[tone], className].filter(Boolean).join(" ")}
      {...props}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
