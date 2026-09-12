import type { Metadata } from "next";
import { ProductImage } from "@/components/product/ProductImage";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Our Story | ${siteConfig.fullName}`,
  description: "What AL-Barkat cares about: thoughtful selection, everyday use, and gifting.",
};

const SECTIONS = [
  {
    heading: "What we care about",
    body: "We pay attention to selection and presentation: the details that make a bowl of almonds or a box of dates feel considered rather than ordinary.",
  },
  {
    heading: "For every day, and for guests",
    body: "Some things are for the everyday: a handful of cashews with your tea, a shared plate of dried fruit after dinner. Others are for moments that call for a little more care, hosting, celebrating, or simply saying thank you.",
  },
  {
    heading: "Thoughtful gifting",
    body: "Nuts and dried fruits have long been a natural way to mark an occasion or extend a courtesy. We keep that in mind in how the collection is presented, whether you're shopping for yourself or someone else.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <Section tone="forest">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <ProductImage
                src="/editorial/story.png"
                alt="A dark, moody bowl of mixed nuts and dates"
                fit="cover"
                sizes="(min-width: 1024px) 740px, 100vw"
              />
            </div>
          </div>

          <div className="mt-10 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ivory/60">Our Story</p>
            <h1 className="mt-3 font-display font-medium text-4xl leading-tight tracking-tight text-ivory sm:text-5xl">
              A closer look at what we do.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ivory/70">
              AL-Barkat is built around a simple idea: good nuts, dates, and dried fruits deserve thoughtful
              presentation, whether they&apos;re headed for your own pantry or someone else&apos;s table.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="ivory">
        <div className="mx-auto grid max-w-3xl gap-10 sm:grid-cols-3 sm:gap-8">
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display font-medium text-xl tracking-tight text-cacao">{section.heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="/shop" size="lg">
            Shop the Collection
          </Button>
        </div>
      </Section>
    </>
  );
}
