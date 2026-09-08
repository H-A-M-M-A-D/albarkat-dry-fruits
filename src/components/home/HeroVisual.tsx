"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useState, type PointerEvent } from "react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Parallax = { x: MotionValue<number>; y: MotionValue<number> };

function FloatingItem({
  position,
  ratio = "aspect-square",
  rotate = 0,
  delay,
  duration = 7,
  float = true,
  card = true,
  parallax,
  src,
  sizes,
  preload = false,
}: {
  position: string;
  ratio?: string;
  rotate?: number;
  delay: number;
  duration?: number;
  float?: boolean;
  card?: boolean;
  parallax?: Parallax;
  src: string;
  sizes: string;
  /** Next.js 16 renamed/replaced the old `priority` prop with `preload` — passing both throws. */
  preload?: boolean;
}) {
  const reduced = useSafeReducedMotion();

  const photo = (
    <Image
      src={src}
      alt=""
      fill
      preload={preload}
      loading={preload ? undefined : "lazy"}
      sizes={sizes}
      className="object-contain"
    />
  );

  const content = card ? (
    <div className="relative h-full w-full overflow-hidden rounded-full border border-cacao/15 bg-card shadow-[0_24px_50px_-28px_rgba(59,33,24,0.45)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.75), rgba(255,255,255,0) 58%)",
        }}
      />
      <div className="absolute inset-[9%]">{photo}</div>
    </div>
  ) : (
    <div className="relative h-full w-full">{photo}</div>
  );

  const shouldFloat = float && !reduced;

  const floated = (
    <motion.div
      className="h-full w-full"
      animate={shouldFloat ? { y: [0, -7, 0], rotate: [0, 1.4, 0] } : undefined}
      transition={
        shouldFloat
          ? { duration, repeat: Infinity, ease: "easeInOut", delay: delay + 0.4 }
          : undefined
      }
    >
      {content}
    </motion.div>
  );

  const parallaxed = parallax ? (
    <motion.div className="h-full w-full" style={{ x: parallax.x, y: parallax.y }}>
      {floated}
    </motion.div>
  ) : (
    floated
  );

  return (
    // `key` forces a fresh mount the moment `reduced` corrects from its
    // forced-`false` hydration value, so `initial={false}` actually applies
    // instead of an already-mounted element ignoring the late prop change
    // (see the Phase 4.2 Hero reduced-motion fix for the full explanation).
    <motion.div
      key={reduced ? "reduced" : "motion"}
      className={`absolute ${ratio} ${position}`}
      style={{ rotate }}
      initial={reduced ? false : { opacity: 0, y: 28, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {parallaxed}
    </motion.div>
  );
}

export function HeroVisual() {
  const reduced = useSafeReducedMotion();
  const [hasFinePointer] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches,
  );
  const parallaxEnabled = hasFinePointer && !reduced;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.5 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.5 });

  const mainX = useTransform(springX, (v) => v * 8);
  const mainY = useTransform(springY, (v) => v * 8);
  const fgX = useTransform(springX, (v) => v * 16);
  const fgY = useTransform(springY, (v) => v * 16);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!parallaxEnabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - rect.left) / rect.width - 0.5);
    rawY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[680px]"
    >
      <FloatingItem
        src="/hero/dominant.webp"
        sizes="(min-width: 1024px) 530px, (min-width: 640px) 345px, 255px"
        ratio="aspect-[3/2]"
        position="bottom-[6%] right-[-2%] w-[84%]"
        rotate={-2}
        delay={0.5}
        float={false}
        card={false}
        preload
        parallax={{ x: mainX, y: mainY }}
      />

      <FloatingItem
        src="/hero/nuts.webp"
        sizes="(min-width: 1024px) 320px, (min-width: 640px) 205px, 150px"
        ratio="aspect-[3/2]"
        position="left-[8%] top-[17%] w-[52%]"
        rotate={3}
        delay={0.62}
        duration={6.5}
        card={false}
        parallax={{ x: mainX, y: mainY }}
      />

      <FloatingItem
        src="/hero/dates.webp"
        sizes="(min-width: 1024px) 270px, (min-width: 640px) 175px, 130px"
        ratio="aspect-[3/2]"
        position="left-[2%] bottom-[2%] w-[40%]"
        rotate={-4}
        delay={0.72}
        duration={8}
        card={false}
        parallax={{ x: mainX, y: mainY }}
      />

      <FloatingItem
        src="/hero/accent-almond.webp"
        sizes="(min-width: 1024px) 115px, (min-width: 640px) 75px, 55px"
        ratio="aspect-[3/2]"
        position="right-[18%] top-[28%] w-[16%]"
        rotate={16}
        delay={0.85}
        duration={5.5}
        card={false}
        parallax={{ x: fgX, y: fgY }}
      />

      <FloatingItem
        src="/hero/accent-cashew.webp"
        sizes="(min-width: 1024px) 100px, (min-width: 640px) 65px, 48px"
        ratio="aspect-[3/2]"
        position="left-[32%] bottom-[-4%] w-[15%]"
        rotate={-11}
        delay={0.95}
        duration={6}
        card={false}
        parallax={{ x: fgX, y: fgY }}
      />
    </div>
  );
}
