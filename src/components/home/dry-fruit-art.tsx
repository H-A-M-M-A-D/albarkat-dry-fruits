import { useId } from "react";

/**
 * Original, hand-drawn placeholder illustrations standing in for real
 * product photography in the hero composition. Bold flat silhouettes with
 * subtle tonal shading — a deliberate modern-editorial abstraction rather
 * than an attempt at photorealism. Replace with proper cutout photography
 * once assets are available (see Phase 2 report).
 */

type GlyphProps = {
  className?: string;
};

function useGradientId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
}

const TEARDROP = "M50 4c17 0 26 26 26 46s-11 46-26 46-26-26-26-46S33 4 50 4Z";

export function DateGlyph({ className }: GlyphProps) {
  const gradId = useGradientId("date");
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="20" y1="10" x2="80" y2="95">
          <stop offset="0" stopColor="#54301F" />
          <stop offset="1" stopColor="#2A150C" />
        </linearGradient>
      </defs>
      <g transform="rotate(-14 50 50)">
        <path d={TEARDROP} fill={`url(#${gradId})`} />
      </g>
    </svg>
  );
}

export function AlmondGlyph({ className }: GlyphProps) {
  const gradId = useGradientId("almond");
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="20" y1="10" x2="80" y2="95">
          <stop offset="0" stopColor="#D6A968" />
          <stop offset="1" stopColor="#A87B3F" />
        </linearGradient>
      </defs>
      <g transform="rotate(-6 50 50)">
        <path d={TEARDROP} fill={`url(#${gradId})`} />
      </g>
    </svg>
  );
}

export function PistachioGlyph({ className }: GlyphProps) {
  const shellId = useGradientId("shell");
  const nutId = useGradientId("nut");
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={shellId} x1="20" y1="10" x2="80" y2="95">
          <stop offset="0" stopColor="#F3ECD2" />
          <stop offset="1" stopColor="#DCD2AA" />
        </linearGradient>
        <linearGradient id={nutId} x1="30" y1="10" x2="70" y2="40">
          <stop offset="0" stopColor="#7C8768" />
          <stop offset="1" stopColor="#525E42" />
        </linearGradient>
      </defs>
      <g transform="rotate(6 50 50)">
        <path d={TEARDROP} fill={`url(#${shellId})`} />
        <path
          d="M50 4c11 0 18 12 21 24-6 6-14 9-21 9s-15-3-21-9c3-12 10-24 21-24Z"
          fill={`url(#${nutId})`}
        />
      </g>
    </svg>
  );
}

export function CashewGlyph({ className }: GlyphProps) {
  const gradId = useGradientId("cashew");
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="15" y1="15" x2="80" y2="80">
          <stop offset="0" stopColor="#F0E0AE" />
          <stop offset="1" stopColor="#D3AE68" />
        </linearGradient>
      </defs>
      <path
        d="M24 68C10 58 8 36 22 20c9-10 24-15 36-11-11 1-19 9-20 19-1 10 5 17 13 19 12 4 22-2 27-13 4 14-2 29-16 36-13 7-27 6-38-2Z"
        fill={`url(#${gradId})`}
      />
    </svg>
  );
}
