"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { IconButton } from "@/components/ui/IconButton";
import { useCart } from "@/lib/cart-context";
import { useSearch } from "@/lib/search-context";
import { siteConfig } from "@/lib/site-config";
import { useWishlist } from "@/lib/wishlist-context";
import { AnnouncementMarquee } from "./AnnouncementMarquee";

const navLinkFocus =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory";

/** Shared by the desktop utility row and the mobile drawer's utility row. */
function WishlistLink({ count, onClick }: { count: number; onClick?: () => void }) {
  return (
    <IconButton
      aria-label={`Wishlist${count > 0 ? ` (${count} item${count === 1 ? "" : "s"})` : ""}`}
      href="/wishlist"
      onClick={onClick}
      className="relative"
    >
      <Heart className="h-5 w-5" strokeWidth={1.5} />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-cacao px-1 text-[10px] font-medium leading-none text-ivory">
          {count}
        </span>
      )}
    </IconButton>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openCart } = useCart();
  const { openSearch, closeSearch } = useSearch();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <AnnouncementMarquee />

      {/* z-50: must stay above the mobile-menu panel (z-40) below — the panel is a
          fixed full-height sheet that would otherwise cover this header's own
          open/close toggle button, making it invisible and unclickable while open.
          top-8 sm:top-9 (not top-0): sits directly beneath the sticky
          AnnouncementMarquee above (itself h-8 sm:h-9), so the two stay
          stacked with no gap or overlap at every scroll position — see that
          component's doc comment for the other offsets tuned to match. */}
      <header
        className={`sticky top-8 z-50 border-b transition-colors duration-300 sm:top-9 ${
          scrolled
            ? "border-cacao/10 bg-ivory/90 backdrop-blur supports-[backdrop-filter]:bg-ivory/80"
            : "border-transparent bg-ivory"
        }`}
      >
        <Container className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className={`font-display font-medium text-3xl tracking-tight text-cacao ${navLinkFocus}`}>
            {siteConfig.name}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {siteConfig.nav.map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[15px] font-medium text-cacao/80 transition-colors hover:text-cacao ${navLinkFocus}`}
                >
                  {item.label}
                </Link>
              ) : (
                // No page exists for this yet — plain, non-focusable text rather than a link that would 404.
                <span key={item.label} className="text-[15px] font-medium text-cacao/40">
                  {item.label}
                </span>
              ),
            )}
          </nav>

          <div className="flex items-center gap-1">
            <IconButton
              aria-label="Search"
              onClick={() => {
                setMobileOpen(false);
                openSearch();
              }}
            >
              <Search className="h-5 w-5" strokeWidth={1.5} />
            </IconButton>
            {/* Wishlist lives in the mobile drawer below `sm`; IconButton already
                hardcodes `inline-flex`, so the visibility toggle goes on this
                wrapper (`contents` at `sm+` keeps the icon a direct flex child,
                matching the row's gap) rather than on IconButton itself, which
                would just lose the fight against its own class. */}
            <span className="hidden sm:contents">
              <WishlistLink count={wishlistCount} />
            </span>
            <IconButton
              aria-label={`Cart${count > 0 ? ` (${count} item${count === 1 ? "" : "s"})` : ""}`}
              onClick={() => {
                closeSearch();
                openCart();
              }}
              className="relative"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-cacao px-1 text-[10px] font-medium leading-none text-ivory">
                  {count}
                </span>
              )}
            </IconButton>
            <IconButton
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="lg:hidden"
              onClick={() =>
                setMobileOpen((open) => {
                  const next = !open;
                  if (next) closeSearch();
                  return next;
                })
              }
            >
              {mobileOpen ? (
                <X className="h-5 w-5" strokeWidth={1.5} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              )}
            </IconButton>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden">
            <motion.div
              className="fixed inset-0 z-30 bg-ink/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-40 w-full max-w-xs bg-ivory p-6 shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
            >
              {/* mt-28 (not mt-16): with the panel's own p-6 (24px), clears
                  the marquee+header stack (44/45px + 80px) that now sits in
                  front of this panel's top edge — see AnnouncementMarquee's
                  doc comment for the full offset audit. */}
              <nav className="mt-28 flex flex-col gap-1" aria-label="Mobile">
                {siteConfig.nav.map((item) =>
                  item.href ? (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-3 text-lg font-medium text-cacao transition-colors hover:bg-cacao/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span key={item.label} className="rounded-lg px-3 py-3 text-lg font-medium text-cacao/40">
                      {item.label}
                    </span>
                  ),
                )}
              </nav>
              <div className="mt-8 flex items-center gap-2 border-t border-cacao/10 pt-6">
                <WishlistLink count={wishlistCount} onClick={() => setMobileOpen(false)} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
