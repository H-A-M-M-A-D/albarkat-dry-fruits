import Image from "next/image";
import type { CSSProperties } from "react";

type ProductImageProps = {
  src: string;
  alt: string;
  /** "contain" (default) suits transparent cutouts; "cover" suits full-bleed photography. */
  fit?: "contain" | "cover";
  sizes?: string;
  /** Next.js 16 renamed/replaced the old `priority` prop with `preload` — passing both throws. */
  preload?: boolean;
  className?: string;
  /** Inline style applied to the underlying image element itself (e.g. a restrained `transform: scale()`), not the wrapper. */
  imageStyle?: CSSProperties;
};

const DEFAULT_SIZES = "(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 50vw";

/** Consistent image treatment for every product/category tile — swap `src` for real photography without touching layout. */
export function ProductImage({
  src,
  alt,
  fit = "contain",
  sizes = DEFAULT_SIZES,
  preload = false,
  className,
  imageStyle,
}: ProductImageProps) {
  return (
    <div className={`relative h-full w-full${className ? ` ${className}` : ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        preload={preload}
        loading={preload ? undefined : "lazy"}
        sizes={sizes}
        style={imageStyle}
        className={fit === "contain" ? "object-contain p-[12%]" : "object-cover"}
      />
    </div>
  );
}
