import type { Metadata } from "next";
import Image from "next/image";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { BogolanDivider } from "@/components/ui/BogolanDivider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/lib/menu-data";
import { SITE } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "À la carte",
  description:
    "La carte du restaurant ivoirien Le Trophée à Dakar : entrées, sauces, grillades, incontournables, desserts et boissons, à partir de 2 500 F CFA.",
  path: "/menu",
  image: "/images/hero/menu-banniere.jpg",
});

export default function MenuPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-brun pb-16 pt-32 sm:pt-40">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero/menu-banniere.jpg"
            alt="Plusieurs plats ivoiriens dressés sur une table au restaurant Le Trophée"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brun via-brun/70 to-brun/30" />
        </div>

        <Container className="relative">
          <div className="flex items-center gap-3">
            <span className="eyebrow text-ocre-light">Notre carte</span>
            <BogolanDivider variant="carre" className="h-6 w-6" />
          </div>
          <h1 className="section-title text-ivoire">À la carte</h1>
          <p className="section-text text-ivoire/80">
            Explorez les saveurs généreuses de la cuisine ivoirienne.
          </p>

          <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-ocre/30 bg-brun/60 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-ivoire/85">
              Certains plats sont préparés à la demande. Pour réduire votre temps
              d’attente, nous vous recommandons d’appeler au moins 30 minutes
              avant votre arrivée.
            </p>
            <Button href={`tel:${SITE.phone.replace(/\s/g, "")}`} variant="primary" className="shrink-0">
              Appeler pour commander
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <MenuBrowser categories={MENU_CATEGORIES} items={MENU_ITEMS} />
        </Container>

        <Container className="mt-4">
          <p className="text-xs leading-relaxed text-grisbrun/70">
            Les plats, descriptions et prix présentés sur cette page sont temporaires
            et seront remplacés par la carte officielle du restaurant.
          </p>
        </Container>
      </section>
    </>
  );
}
