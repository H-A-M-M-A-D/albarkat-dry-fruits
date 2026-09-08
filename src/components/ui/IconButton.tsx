import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type CommonProps = {
  /** Required — icon-only controls must announce their purpose to assistive tech. */
  "aria-label": string;
  inverse?: boolean;
  className?: string;
};

type IconButtonAsButton = CommonProps & ComponentPropsWithoutRef<"button"> & { href?: undefined };
type IconButtonAsLink = CommonProps & ComponentPropsWithoutRef<typeof Link> & { href: string };

type IconButtonProps = IconButtonAsButton | IconButtonAsLink;

const baseClasses =
  "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

/** Square icon-only control used in the header, cart, and product cards. Renders a `<Link>` when `href` is given. */
export function IconButton({ className, inverse = false, href, ...props }: IconButtonProps) {
  const classes = [
    baseClasses,
    inverse
      ? "text-ivory hover:bg-ivory/10 focus-visible:ring-offset-forest"
      : "text-cacao hover:bg-cacao/[0.06] focus-visible:ring-offset-ivory",
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

  return <button type="button" className={classes} {...(props as ComponentPropsWithoutRef<"button">)} />;
}
