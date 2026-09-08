import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const SIZES = {
  sm: "h-10 px-4 text-sm gap-1.5",
  md: "h-12 px-6 text-[15px] gap-2",
  lg: "h-14 px-8 text-base gap-2",
} as const;

const VARIANTS = {
  primary: "bg-cacao text-ivory hover:bg-ink",
  secondary: "border border-cacao/25 text-cacao hover:border-cacao/50 hover:bg-cacao/5",
  ghost: "text-cacao hover:bg-cacao/5",
} as const;

const VARIANTS_INVERSE = {
  primary: "bg-ivory text-cacao hover:bg-white",
  secondary: "border border-ivory/30 text-ivory hover:border-ivory/60 hover:bg-ivory/10",
  ghost: "text-ivory hover:bg-ivory/10",
} as const;

type Variant = keyof typeof VARIANTS;
type Size = keyof typeof SIZES;

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Use on dark section backgrounds (forest / cacao tones). */
  inverse?: boolean;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

type ButtonAsLink = CommonProps &
  ComponentPropsWithoutRef<typeof Link> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-medium tracking-tight transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

export function Button({
  variant = "primary",
  size = "md",
  inverse = false,
  className,
  href,
  ...props
}: ButtonProps) {
  const classes = [
    baseClasses,
    SIZES[size],
    inverse ? VARIANTS_INVERSE[variant] : VARIANTS[variant],
    inverse ? "focus-visible:ring-offset-forest" : "focus-visible:ring-offset-ivory",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as Omit<ComponentPropsWithoutRef<typeof Link>, "href">)}
      />
    );
  }

  return (
    <button className={classes} {...(props as ComponentPropsWithoutRef<"button">)} />
  );
}
