import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactElement } from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

const SOCIAL_ICONS: Record<string, (props: { className?: string }) => ReactElement> = {
  instagram: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path d="M15 8.5h-2a2 2 0 0 0-2 2V21m0-7h5m-5 0H8m3-7.5V21" />
      <path d="M13 3H8a2 2 0 0 0-2 2v16h5" />
    </svg>
  ),
  tiktok: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path d="M14 4v11a3.5 3.5 0 1 1-3-3.46" />
      <path d="M14 4a4.5 4.5 0 0 0 4.5 4.5" />
    </svg>
  ),
};

const FOOTER_COLUMNS: Array<{ title: string; links: readonly { label: string; href: string | null }[] }> = [
  { title: "Shop", links: siteConfig.footer.shop },
  { title: "Help", links: siteConfig.footer.help },
  { title: "Company", links: siteConfig.footer.company },
];

export function Footer() {
  const { contact, social } = siteConfig;
  const socialEntries = (Object.entries(social) as Array<[keyof typeof social, string | null]>).filter(
    ([, url]) => Boolean(url),
  );
  const hasContact = contact.phone || contact.email || contact.address;

  return (
    <footer className="bg-forest text-ivory">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
        <div className="max-w-sm">
          <p className="font-display font-medium text-3xl tracking-tight">{siteConfig.name}</p>
          <p className="mt-4 text-sm leading-relaxed text-ivory/70">
            {siteConfig.tagline}.
          </p>

          {hasContact && (
            <ul className="mt-6 space-y-3 text-sm text-ivory/70">
              {contact.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  <a
                    href={`tel:${contact.phone}`}
                    className="rounded-sm transition-colors hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  <a
                    href={`mailto:${contact.email}`}
                    className="rounded-sm transition-colors hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.address && (
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  <span>{contact.address}</span>
                </li>
              )}
            </ul>
          )}

          {socialEntries.length > 0 && (
            <div className="mt-6 flex items-center gap-3">
              {socialEntries.map(([platform, url]) => {
                const Icon = SOCIAL_ICONS[platform];
                if (!Icon || !url) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ivory/70 transition-colors hover:bg-ivory/10 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-medium tracking-wide text-ivory/50">{column.title}</p>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <Link
                      href={link.href}
                      className="rounded-sm text-sm text-ivory/80 transition-colors hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    // No page exists for this yet — plain, non-focusable text rather than a link that would 404.
                    <span className="text-sm text-ivory/35">{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-ivory/10">
        <Container className="flex flex-col items-center gap-2 py-6 text-xs text-ivory/50 sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
