/**
 * Central business/content configuration.
 *
 * Fields marked `PLACEHOLDER` are not real business facts and must not be
 * presented to users as confirmed information. Replace them with confirmed
 * details before launch, see the audit notes shared with the project owner.
 *
 * `href: null` marks a link with no real destination yet, components must
 * render these as plain, non-interactive text rather than a `<Link>`, since
 * a `<Link>` would 404. As of the information-architecture pass every nav
 * and footer link resolves to a real route; `href: null` stays supported
 * for the next placeholder that comes along.
 *
 * "Nuts" points at `/shop/nuts`, a storefront-only grouping (see
 * `storefront-groups.ts`) spanning the Almonds/Pistachios/Cashews/Walnuts
 * categories. No individual product's `categorySlug` changes; the grouping
 * exists purely for navigation.
 */

export const siteConfig = {
  name: "AL-Barkat",
  fullName: "AL-Barkat Dry Fruits",
  tagline: "Premium dry fruits, nuts & gifting", // PLACEHOLDER: confirm final brand tagline

  /**
   * Shown in the top announcement bar — omitted entirely from the rendered
   * page when empty (see Header.tsx). Add a real message here once
   * delivery/shipping/COD details are confirmed; never fill this with
   * placeholder text, since it renders directly to customers.
   */
  announcements: [] as string[],

  nav: [
    { label: "Shop", href: "/shop" },
    { label: "Dates", href: "/shop/dates" },
    { label: "Nuts", href: "/shop/nuts" },
    { label: "Dried Fruits", href: "/shop/dried-fruits" },
    { label: "Gifting", href: "/corporate-gifting" },
    { label: "Our Story", href: "/our-story" },
  ] as { label: string; href: string | null }[],

  footer: {
    shop: [
      { label: "Shop All", href: "/shop" },
      { label: "Dates", href: "/shop/dates" },
      { label: "Nuts", href: "/shop/nuts" },
      { label: "Dried Fruits", href: "/shop/dried-fruits" },
      { label: "Corporate Gifting", href: "/corporate-gifting" },
    ] as { label: string; href: string | null }[],
    help: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping Information", href: "/shipping-information" },
      { label: "Returns & Refunds", href: "/returns-refunds" },
      { label: "Contact Us", href: "/contact" },
      { label: "Feedback", href: "/feedback" },
    ] as { label: string; href: string | null }[],
    company: [{ label: "Our Story", href: "/our-story" }] as { label: string; href: string | null }[],
  },

  /** PLACEHOLDER: none of the following have been confirmed by the business. */
  contact: {
    phone: null as string | null,
    email: null as string | null,
    address: null as string | null,
    whatsapp: null as string | null,
  },

  /** PLACEHOLDER: set to a real URL only once the account exists. */
  social: {
    instagram: null as string | null,
    facebook: null as string | null,
    tiktok: null as string | null,
  },

  /** PLACEHOLDER: none of these are confirmed. Do not render as claims until set. */
  policies: {
    freeShippingThresholdPkr: null as number | null,
    codAvailable: null as boolean | null,
    returnWindowDays: null as number | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;
