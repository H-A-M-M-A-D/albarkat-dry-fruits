"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import type { FaqItem } from "@/lib/faq-content";

/**
 * One row's open/closed state lives here so each question toggles
 * independently. The expand/collapse uses the CSS grid-rows 0fr/1fr trick
 * (animating `grid-template-rows`, not `height`, since the content's natural
 * height is unknown ahead of time) — no JS measurement, no animation
 * library, and it's already governed by the project's global
 * `prefers-reduced-motion` rule in globals.css (all transition durations
 * collapse to ~0 there), so no extra reduced-motion handling is needed here.
 */
function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const triggerId = useId();
  const panelId = useId();

  return (
    <div className="border-b border-cacao/10 py-5 first:pt-0 last:border-b-0">
      <h3>
        <button
          type="button"
          id={triggerId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-4 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          <span className="font-serif text-lg text-cacao sm:text-xl">{item.question}</span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-cacao/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            strokeWidth={1.5}
            aria-hidden
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pt-3 pr-8 text-sm leading-relaxed text-muted">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div>
      {items.map((item) => (
        <FaqRow key={item.id} item={item} />
      ))}
    </div>
  );
}
