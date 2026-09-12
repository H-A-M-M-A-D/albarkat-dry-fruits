import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { benefits } from "@/lib/why-choose-us";

export function WhyChooseUs() {
  const activeBenefits = benefits.filter((benefit) => benefit.confirmed);
  if (activeBenefits.length === 0) return null;

  return (
    <Section tone="card" padding="compact">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <h2 className="font-display font-medium text-3xl leading-tight tracking-tight sm:text-4xl lg:max-w-xs">
          Why shop with us
        </h2>

        <ul className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {activeBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <li
                key={benefit.id}
                className="border-t border-cacao/10 pt-5 first:border-t-0 first:pt-0 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0 sm:first:border-l-0 sm:first:pl-0"
              >
                <Reveal delay={index * 0.06}>
                  <div className="flex flex-col gap-2">
                    <Icon className="h-5 w-5 text-olive" strokeWidth={1.5} aria-hidden />
                    <p className="text-base font-medium text-cacao">{benefit.label}</p>
                    <p className="text-sm text-muted">{benefit.description}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
