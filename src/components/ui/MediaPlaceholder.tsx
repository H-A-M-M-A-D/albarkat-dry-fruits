import type { LucideIcon } from "lucide-react";

const TONES = {
  ivory: { bg: "bg-gradient-to-br from-card to-ivory", icon: "text-cacao/20" },
  olive: { bg: "bg-gradient-to-br from-olive/20 via-card to-ivory", icon: "text-cacao/25" },
  // White-on-dark reads much fainter than dark-on-light at the same opacity,
  // so this tone needs a noticeably higher value to feel equally intentional.
  forest: { bg: "bg-gradient-to-br from-[#141d19] to-forest", icon: "text-ivory/30" },
} as const;

type MediaPlaceholderProps = {
  icon: LucideIcon;
  tone?: keyof typeof TONES;
  className?: string;
};

/**
 * Temporary compositional placeholder for a Phase 4 media slot — real
 * photography is pending (see the completion report's asset list). Swap the
 * contents for a `next/image` `fill` element inside the same aspect-ratio
 * wrapper once an asset exists; nothing else in the layout needs to change.
 */
export function MediaPlaceholder({ icon: Icon, tone = "ivory", className }: MediaPlaceholderProps) {
  const { bg, icon } = TONES[tone];
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${bg}${className ? ` ${className}` : ""}`}
    >
      <Icon className={`h-14 w-14 sm:h-20 sm:w-20 ${icon}`} strokeWidth={1} aria-hidden />
    </div>
  );
}
