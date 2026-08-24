import type { Metadata } from "next";
import Image from "next/image";
import { EventCard } from "@/components/events/EventCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { PAST_EVENTS_GALLERY, UPCOMING_EVENTS } from "@/lib/events-data";

export const metadata: Metadata = {
  title: "Événements — Le Trophée",
  description:
    "Karaoké, jeux de société, diffusions de matchs et événements privés au restaurant ivoirien Le Trophée à Dakar.",
};

export default function EvenementsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Événements"
        title="Les rendez-vous du restaurant"
        text="Des moments gourmands, festifs et conviviaux à partager."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="section-title">Prochains événements</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {UPCOMING_EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brun py-20">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="eyebrow text-ocre-light">Sur mesure</span>
            <h2 className="section-title text-ivoire">
              Organisez votre événement chez nous
            </h2>
            <p className="section-text text-ivoire/75">
              Vous souhaitez organiser un anniversaire, un repas de groupe ou une
              rencontre professionnelle ? Présentez-nous votre projet et notre
              équipe vous accompagnera dans son organisation.
            </p>
            <Button href="/contact?occasion=evenement-prive" variant="primary" className="mt-8">
              Parler de mon événement
            </Button>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem]">
            <Image
              src="/images/evenement-prive.jpg"
              alt="Événement privé organisé au restaurant Le Trophée"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="section-title">Nos derniers événements</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {PAST_EVENTS_GALLERY.map((photo) => (
              <div key={photo.src} className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
