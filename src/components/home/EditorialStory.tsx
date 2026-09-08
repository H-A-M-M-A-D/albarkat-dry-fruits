import { ProductImage } from "@/components/product/ProductImage";
import { ClipReveal } from "@/components/ui/ClipReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function EditorialStory() {
  return (
    <Section tone="forest">
      <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10">
        <ClipReveal className="lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <ProductImage
              src="/editorial/story.png"
              alt="A dark, moody bowl of mixed nuts and dates"
              fit="cover"
              sizes="(min-width: 1024px) 740px, 100vw"
            />
          </div>
        </ClipReveal>

        <Reveal className="mt-10 lg:col-span-4 lg:col-start-9 lg:mt-0">
          <h2 className="font-serif text-4xl leading-tight tracking-tight text-ivory sm:text-5xl">
            Good food starts with thoughtful selection.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ivory/70">
            Flavour, texture, and presentation matter just as much as what&apos;s on the label.
            Whether it&apos;s a bowl for the everyday or something set aside for guests, we&apos;re
            building a shop worth returning to, one category at a time.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
