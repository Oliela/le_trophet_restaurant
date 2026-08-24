import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ClockIcon, MapPinIcon } from "@/components/icons/Icons";
import { SITE } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brun pb-20 pt-32 sm:pt-40 lg:pb-28 lg:pt-44">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-plat-ivoirien.jpg"
          alt="Grand plat traditionnel ivoirien servi au restaurant Le Trophée"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brun via-brun/60 to-brun/20" />
      </div>

      <div
        aria-hidden="true"
        className="bogolan-bg absolute inset-y-0 right-0 hidden w-3 sm:block lg:w-4"
      />

      <Container className="relative">
        <div className="max-w-2xl animate-fade-up">
          <span className="eyebrow text-ocre-light">Restaurant ivoirien à Dakar</span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] text-ivoire sm:text-5xl md:text-6xl">
            La Côte d’Ivoire s’invite à votre table
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivoire/80 md:text-lg">
            Découvrez l’authenticité de la cuisine ivoirienne dans une ambiance
            chaleureuse et conviviale, avec des plats à partir de 2 500 F CFA.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact" variant="primary">
              Réserver une table
            </Button>
            <Button href="/menu" variant="light">
              Découvrir la carte
            </Button>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-ivoire/15 pt-6 text-sm text-ivoire/75 sm:flex-row sm:items-center sm:gap-8">
            <span className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-ocre-light" />
              {SITE.addressShort}
            </span>
            <span className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-ocre-light" />
              Ouvert tous les jours, 11h00 – 23h00
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
