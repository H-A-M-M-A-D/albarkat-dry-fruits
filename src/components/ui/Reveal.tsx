"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  delay?: number;
  y?: number;
  className?: string;
  children: ReactNode;
  /**
   * "scroll" (default) triggers via IntersectionObserver as the element
   * scrolls into view — the intended editorial pacing for long homepage
   * sections. "mount" triggers immediately once mounted, regardless of
   * scroll position: a real browser only recomputes `whileInView`
   * intersection on an actual scroll/resize, so anything rendered via a
   * non-scrolling capture path (a full-page screenshot tool, print-to-PDF,
   * etc.) leaves below-the-fold `scroll`-triggered content stuck at
   * `opacity: 0` forever — verified on `/shop`'s product grid. Use "mount"
   * for commerce-critical content (product cards) that must never depend on
   * scroll to become visible.
   */
  trigger?: "scroll" | "mount";
};

/**
 * Small client-only entrance wrapper so parent sections (category grid,
 * product grid) can stay server components — only this leaf needs the
 * "use client" boundary for `whileInView`/`animate` + reduced-motion.
 *
 * For reduced-motion users this renders a plain, always-visible `div` —
 * content must never sit at `opacity: 0` waiting on an IntersectionObserver
 * that a reduced-motion user has no reason to expect. `useSafeReducedMotion`
 * resolves to `false` on both the server and the client's hydration render
 * (see that hook), so this branch is only ever taken in a normal post-mount
 * re-render, never during hydration — no server/client mismatch risk.
 */
export function Reveal({ delay = 0, y = 20, className, children, trigger = "scroll" }: RevealProps) {
  const reduced = useSafeReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const triggerProps =
    trigger === "mount"
      ? { animate: { opacity: 1, y: 0 } }
      : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } as const };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...triggerProps}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
