import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BagIcon, BikeIcon, UsersIcon, UtensilsIcon } from "@/components/icons/Icons";
import { SERVICES } from "@/lib/data";

const SPACES = [
  {
    title: "Notre espace intérieur",
    description:
      "Un cadre chaleureux et confortable pour vos repas en famille, entre amis ou entre collègues.",
    image: "/images/espaces/IMG_2527.JPG",
    alt: "Salle intérieure chaleureuse du restaurant Le Trophée à Dakar",
  },
  {
    title: "Notre espace extérieur",
    description:
      "Un espace ouvert et convivial pour profiter de votre repas dans une ambiance détendue.",
    image: "/images/espaces/IMG_2528.JPG",
    alt: "Terrasse extérieure conviviale du restaurant Le Trophée à Dakar",
  },
];

const SERVICE_ICONS = {
  utensils: UtensilsIcon,
  bag: BagIcon,
  bike: BikeIcon,
  users: UsersIcon,
};

export function SpacesServices() {
  return (
    <section className="bg-ivoire py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Nos espaces"
          title="Choisissez votre ambiance"
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {SPACES.map((space, index) => (
            <Reveal key={space.title} delay={index * 100}>
              <div className="group relative overflow-hidden rounded-[2rem] shadow-card">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={space.image}
                    alt={space.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brun/85 via-brun/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="font-display text-2xl font-semibold text-ivoire">
                    {space.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-ivoire/85">
                    {space.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.icon];
            return (
              <div
                key={service.label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-brun/10 bg-ivoire-card px-4 py-7 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-semibold text-brun">{service.label}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="relative col-span-1 aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/images/bogolan/2.jpg"
              alt="Détail de la salle intérieure du restaurant"
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
          <div className="relative col-span-1 aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/images/bogolan/3.jpg"
              alt="Détail de la terrasse extérieure du restaurant"
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
          <div className="relative col-span-1 aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/images/bogolan/4.jpg"
              alt="Détail du tissu bogolan authentique présent dans le restaurant"
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
          <div className="relative col-span-1 aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/images/bogolan/5.jpg"
              alt="Détail du tissu bogolan authentique présent dans le restaurant"
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
