import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HeartIcon, LeafIcon, PlateIcon, StarIcon } from "@/components/icons/Icons";
import { VALUES } from "@/lib/data";

const VALUE_ICONS = {
  leaf: LeafIcon,
  plate: PlateIcon,
  heart: HeartIcon,
  star: StarIcon,
};

export function WhyUs() {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Nos engagements"
          title="Pourquoi venir chez nous ?"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, index) => {
            const Icon = VALUE_ICONS[value.icon];
            return (
              <Reveal key={value.title} delay={index * 90} className="text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-olive/10 text-olive">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-brun">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-grisbrun">
                  {value.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
