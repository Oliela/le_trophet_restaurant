import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/data";

export function ReservationCta() {
  return (
    <section className="relative isolate overflow-hidden py-28">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/drapeaux1.jpeg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-brun/90" />
      </div>

      <Container className="text-center">
        <h2 className="font-display text-3xl font-semibold text-ivoire sm:text-4xl md:text-5xl">
          Une table vous attend
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ivoire/75 md:text-lg">
          Réservez dès maintenant votre table et venez profiter d’un moment
          chaleureux aux couleurs de la Côte d’Ivoire.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href="/contact" variant="primary">
            Réserver une table
          </Button>
          <Button href={`tel:${SITE.phone.replace(/\s/g, "")}`} variant="light">
            Appeler le restaurant
          </Button>
        </div>
      </Container>
    </section>
  );
}
