import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EVENTS } from "@/lib/data";

export function Events() {
  return (
    <section id="evenements" className="bg-ivoire py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Bien plus qu’un restaurant"
          title="Mangez, partagez et amusez-vous"
        />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((event) => (
            <article
              key={event.slug}
              className="card-surface flex flex-col overflow-hidden rounded-[2rem]"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-2xl font-semibold text-brun">
                  {event.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-grisbrun">
                  {event.description}
                </p>
                <Button href="/evenements" variant="outline" className="mt-6 self-start">
                  En savoir plus
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button href="/evenements" variant="primary">
            Découvrir nos événements
          </Button>
        </div>
      </Container>
    </section>
  );
}
