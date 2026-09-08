import type { ComponentPropsWithoutRef } from "react";

const TONES = {
  neutral: "bg-cacao/[0.06] text-cacao",
  gold: "bg-gold/15 text-cacao",
  olive: "bg-olive/12 text-olive",
  outline: "border border-cacao/20 text-cacao",
} as const;

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  tone?: keyof typeof TONES;
};

/** Small static label for product badges (Best Seller, New) and category tags. */
export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        TONES[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
