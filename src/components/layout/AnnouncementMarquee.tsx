"use client";

import { siteConfig } from "@/lib/site-config";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

const BRAND = siteConfig.name;
const MESSAGES = [BRAND, "Premium Nuts & Dried Fruits", "Thoughtful Gifting", "Shop the Collection"];

/**
 * One pass of the four messages, dot-separated — repeated to build a track
 * wide enough to loop seamlessly on any screen. The container applies a CSS
 * `uppercase` transform for the generic phrases, so the brand token is
 * wrapped in `normal-case` to keep its exact "AL-Barkat" casing intact.
 */
function MessageRun() {
  return (
    <>
      {MESSAGES.map((message) => (
        <span key={message} className="flex items-center gap-3">
          <span className={message === BRAND ? "normal-case" : undefined}>{message}</span>
          <span aria-hidden="true" className="text-ivory/40">
            ·
          </span>
        </span>
      ))}
    </>
  );
}

/**
 * Thin premium strip stacked above the main Header — both are `sticky` so
 * the combined chrome height stays constant at every scroll position
 * (see `Header.tsx`'s `top-8 sm:top-9` offset, tuned to sit right below
 * this bar's own `h-8 sm:h-9`). Every other fixed/sticky offset that
 * assumed a header-only top chrome (`SearchOverlay`, the checkout summary
 * sidebar, in-page anchor `scroll-margin`) was audited and bumped to match.
 */
export function AnnouncementMarquee() {
  const reduced = useSafeReducedMotion();

  if (reduced) {
    return (
      <div className="sticky top-0 z-50 bg-ink text-ivory">
        <div className="scrollbar-hide flex h-8 items-center gap-3 overflow-x-auto whitespace-nowrap px-5 text-[11px] font-medium uppercase tracking-[0.14em] sm:h-9 sm:justify-center sm:px-8">
          <MessageRun />
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-50 overflow-hidden bg-ink text-ivory">
      <div className="flex h-8 items-center sm:h-9">
        {/* The two track divs must be pixel-identical with nothing (no gap)
            between them: translateX(-50%) then moves by exactly one track's
            width, which is what makes the loop reset invisible. Any gap here
            would leave the halves unequal and produce a visible snag. */}
        <div
          className="animate-marquee flex w-max shrink-0 items-center text-[11px] font-medium uppercase tracking-[0.14em]"
          aria-hidden="true"
        >
          <div className="flex shrink-0 items-center gap-3">
            {Array.from({ length: 6 }, (_, index) => (
              <MessageRun key={index} />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {Array.from({ length: 6 }, (_, index) => (
              <MessageRun key={index} />
            ))}
          </div>
        </div>
      </div>
      <span className="sr-only">{MESSAGES.join(", ")}</span>
    </div>
  );
}
