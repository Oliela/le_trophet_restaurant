import type { Metadata } from "next";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { GALLERY_ITEMS } from "@/lib/gallery-data";

export const metadata: Metadata = {
  title: "Galerie — Le Trophée",
  description:
    "Découvrez en images les plats, les espaces, la décoration et l’ambiance du restaurant ivoirien Le Trophée à Dakar.",
};

export default function GaleriePage() {
  return (
    <>
      <PageIntro
        eyebrow="En images"
        title="Les couleurs, les saveurs et l’ambiance"
        text="Découvrez en images nos plats, nos espaces, notre décoration et les moments partagés dans notre restaurant."
      />
      <section className="py-16 sm:py-20">
        <Container>
          <GalleryExplorer items={GALLERY_ITEMS} />
        </Container>
      </section>
    </>
  );
}
