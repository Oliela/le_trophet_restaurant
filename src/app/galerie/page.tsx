import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Galerie — Le Trophée",
  description: "Un aperçu en images du restaurant Le Trophée à Dakar.",
};

const GALLERY_IMAGES = [
  { src: "/images/plat-garba.jpg", alt: "Garba, spécialité du restaurant Le Trophée" },
  { src: "/images/espace-interieur.jpg", alt: "Salle intérieure du restaurant" },
  { src: "/images/espace-exterieur.jpg", alt: "Terrasse extérieure du restaurant" },
  { src: "/images/plat-kedjenou.jpg", alt: "Kédjénou de poulet" },
  { src: "/images/evenement-karaoke.jpg", alt: "Soirée karaoké au restaurant" },
  { src: "/images/plat-poisson-braise.jpg", alt: "Poisson braisé" },
  { src: "/images/evenement-jeux.jpg", alt: "Soirée jeux de société" },
  { src: "/images/bogolan-texture.jpg", alt: "Tissu bogolan authentique du restaurant" },
];

export default function GaleriePage() {
  return (
    <>
      <PageIntro
        eyebrow="En images"
        title="Galerie"
        text="Un aperçu du restaurant, de nos plats et de nos événements. Photographies temporaires en attendant le reportage photo officiel."
      />
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {GALLERY_IMAGES.map((img) => (
              <div key={img.src} className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 45vw"
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
