/**
 * FAQ copy. Kept honest about what is and isn't confirmed: unconfirmed
 * business rules (shipping times, returns windows, payment options beyond
 * the current demo) are answered by pointing to AL-Barkat directly rather
 * than inventing specifics.
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: "place-order",
    question: "How do I place an order?",
    answer:
      "Browse the shop, choose a pack size on the product page, and add it to your cart. When you're ready, go to checkout and enter your delivery details to complete a demo order.",
  },
  {
    id: "pack-sizes",
    question: "Can I choose different pack sizes?",
    answer:
      "Most products are available in a few pack sizes, such as 250g, 500g, and 1kg. Available sizes are shown on each product page.",
  },
  {
    id: "contact",
    question: "How can I contact AL-Barkat?",
    answer:
      "Use the Contact page to send an inquiry, or the Feedback page to share comments about your experience on the site.",
  },
  {
    id: "gifting",
    question: "Can I ask about gifting options?",
    answer: "Yes. Visit the Corporate Gifting page to explore gifting options and use the Contact page for current information.",
  },
  {
    id: "demo-checkout",
    question: "How does the current demo checkout work?",
    answer:
      "This site currently runs a demo checkout for testing purposes. Demo orders placed here are not real, no payment is processed, and nothing is shipped.",
  },
  {
    id: "shipping",
    question: "What are the shipping charges and delivery times?",
    answer: "Please contact AL-Barkat for current delivery information.",
  },
  {
    id: "returns",
    question: "What is the return or refund policy?",
    answer: "Please contact AL-Barkat for the latest details on returns and refunds.",
  },
  {
    id: "payment",
    question: "What payment methods are available?",
    answer: "The current demo checkout supports Cash on Delivery only. Please contact AL-Barkat for current payment options.",
  },
];

/** Shown on the homepage preview — a short, useful subset, not the full list. */
export const faqPreviewIds = ["place-order", "pack-sizes", "contact", "gifting"];

export function getFaqPreviewItems(): FaqItem[] {
  return faqPreviewIds
    .map((id) => faqItems.find((item) => item.id === id))
    .filter((item): item is FaqItem => Boolean(item));
}
