import { Gift, Sparkles, Sun, UtensilsCrossed, type LucideIcon } from "lucide-react";

/**
 * Merchandising themes, not business claims: a way to browse the same
 * catalog by occasion rather than a promise about assortment, sourcing, or
 * stock. `ctaHref`/`ctaLabel` route each tile to the destination that
 * actually matches its theme: gifting has its own dedicated inquiry page,
 * the rest link back to the shop.
 */
export interface Purpose {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  featured?: boolean;
  ctaHref: string;
  ctaLabel: string;
}

export const purposes: Purpose[] = [
  {
    id: "gifting",
    title: "Thoughtful Gifting",
    description: "An elegant way to explore options for sharing and gifting.",
    icon: Gift,
    image: "/purpose/gifting.png",
    imageAlt: "An arrangement of nuts and dried fruits in a ribboned gift box",
    featured: true,
    ctaHref: "/corporate-gifting",
    ctaLabel: "Explore Gifting",
  },
  {
    id: "everyday",
    title: "Everyday Snacking",
    description: "Easy, satisfying picks for a regular day.",
    icon: Sun,
    image: "/purpose/everyday.png",
    imageAlt: "A bowl of mixed nuts and dried fruits on a table",
    ctaHref: "/shop",
    ctaLabel: "Browse products",
  },
  {
    id: "premium",
    title: "Premium Selection",
    description: "A focused way to browse more considered choices.",
    icon: Sparkles,
    image: "/purpose/premium.png",
    imageAlt: "A bowl of roasted pistachios",
    ctaHref: "/shop",
    ctaLabel: "Browse products",
  },
  {
    id: "sharing",
    title: "Sharing & Hosting",
    description: "Explore ideas suited to sharing and hosting.",
    icon: UtensilsCrossed,
    image: "/purpose/sharing.png",
    imageAlt: "Hands sharing a platter of nuts and dried fruits",
    ctaHref: "/shop",
    ctaLabel: "Browse products",
  },
];
