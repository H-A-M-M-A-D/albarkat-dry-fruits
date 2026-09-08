import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { CartProvider } from "@/lib/cart-context";
import { SearchProvider } from "@/lib/search-context";
import { siteConfig } from "@/lib/site-config";
import { WishlistProvider } from "@/lib/wishlist-context";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteConfig.fullName} | ${siteConfig.tagline}`,
  description: siteConfig.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-cacao">
        <CartProvider>
          <WishlistProvider>
            <SearchProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
              <SearchOverlay />
            </SearchProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
