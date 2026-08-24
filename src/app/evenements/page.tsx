import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { EVENTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Événements — Le Trophée",
  description:
    "Soirées karaoké, jeux de société et événements privés au restaurant Le Trophée à Dakar.",
};

export default function EvenementsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Bien plus qu’un restaurant"
        title="Nos événements"
        text="Karaoké, jeux de société et événements privés : Le Trophée est aussi un lieu de partage et de bonne humeur."
      />
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {EVENTS.map((event) => (
              <article key={event.slug} className="card-surface overflow-hidden rounded-3xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-7">
                  <h2 className="font-display text-2xl font-semibold text-brun">
                    {event.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-grisbrun">
                    {event.description}
                  </p>
                  <Button href="/contact" variant="outline" className="mt-6">
                    Nous contacter
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
