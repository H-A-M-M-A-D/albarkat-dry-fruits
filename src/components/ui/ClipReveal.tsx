"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// The wrapper (observed by `whileInView`) carries no visual change of its
// own — these variants exist purely so Motion propagates the "hidden"/
// "visible" state to the scaled child below without applying it twice.
const WRAPPER_VARIANTS = { hidden: {}, visible: {} };
const CLIP_VARIANTS = { hidden: { scaleY: 0 }, visible: { scaleY: 1 } };

type ClipRevealProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Slow editorial image reveal (vertical wipe) for flagship media moments —
 * distinct from `Reveal`'s fade/slide used everywhere else. Built on
 * `scaleY` + `overflow-hidden` rather than an animated `clip-path`: this
 * Motion version's `clip-path` keyframe interpolation silently never
 * triggers `whileInView` (verified — the inline style never updates), while
 * `transform` is Motion's most reliable animated property.
 *
 * The `whileInView`/`viewport` trigger lives on the outer wrapper, not on
 * the scaled child itself — an element observed by IntersectionObserver
 * while also carrying its own `scaleY(0)` collapses its own rendered rect to
 * zero height, so the observer can never register it "entering" the
 * viewport (a zero-area target never crosses a >0 intersection-ratio
 * threshold) and `whileInView` silently never fires. The wrapper stays
 * unscaled and always has real geometry, so it observes correctly and
 * cascades its "hidden"/"visible" state to the scaled child via `variants`.
 *
 * Same reduced-motion contract as `Reveal`: renders a plain, always-visible
 * `div` for reduced-motion users instead of waiting on `whileInView`.
 */
export function ClipReveal({ className, children }: ClipRevealProps) {
  const reduced = useSafeReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`overflow-hidden${className ? ` ${className}` : ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={WRAPPER_VARIANTS}
    >
      <motion.div className="origin-top" variants={CLIP_VARIANTS} transition={{ duration: 1.1, ease: EASE }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
