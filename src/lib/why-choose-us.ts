import { Gift, MousePointerClick, PackageCheck, Sparkles, Truck, type LucideIcon } from "lucide-react";

/**
 * Config-driven benefits list. `confirmed: true` is reserved for statements
 * the business owner has actually verified — never for operational/logistics
 * claims about the real business (packaging methods, delivery network,
 * timelines) or capabilities that don't exist yet in the product (cart/order
 * flow, confirmed catalog quality, purchasable gifting inventory). Every
 * entry below is currently unconfirmed (see Phase 4.1: catalog/quality isn't
 * confirmed, gifting is a merchandising section without real inventory yet,
 * and ordering/checkout isn't built) — `WhyChooseUs` returns `null` when
 * nothing is confirmed rather than showing filler.
 */
export interface Benefit {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  confirmed: boolean;
}

export const benefits: Benefit[] = [
  {
    id: "selection",
    label: "Premium Selection",
    description: "Not yet confirmed — pending verified catalog/quality information.",
    icon: Sparkles,
    confirmed: false,
  },
  {
    id: "gifting",
    label: "Gifting Options",
    description: "Not yet confirmed — no purchasable gifting inventory exists yet.",
    icon: Gift,
    confirmed: false,
  },
  {
    id: "ordering",
    label: "Convenient Ordering",
    description: "Not yet confirmed — cart/order/checkout isn't implemented yet.",
    icon: MousePointerClick,
    confirmed: false,
  },
  {
    id: "packaging",
    label: "Careful Packaging",
    description: "Not yet confirmed by the business — do not enable until verified.",
    icon: PackageCheck,
    confirmed: false,
  },
  {
    id: "delivery",
    label: "Nationwide Delivery",
    description: "Not yet confirmed by the business — do not enable until verified.",
    icon: Truck,
    confirmed: false,
  },
];
