import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageWithPattern } from "@/components/ui/ImageWithPattern";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section className="overflow-hidden py-24 sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <SectionHeading
            eyebrow="Notre histoire"
            title="Un coin de Côte d’Ivoire à Dakar"
          />
          <p className="section-text">
            Notre restaurant vous invite à découvrir une cuisine ivoirienne
            authentique, généreuse et pleine de caractère. À travers nos
            plats, notre décoration et notre accueil, nous avons souhaité
            créer à Dakar un véritable espace de partage inspiré de la Côte
            d’Ivoire.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-grisbrun md:text-lg">
            Que vous connaissiez déjà ces saveurs ou que vous les découvriez
            pour la première fois, notre équipe vous accueille dans une
            ambiance conviviale, comme à la maison.
          </p>
          <Button href="/contact" variant="outline" className="mt-9">
            Découvrir le restaurant
          </Button>
        </div>

        <div className="order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-none">
          <ImageWithPattern
            src="/images/decoration/Design sans titre (4).png"
            alt="Poupée africaine faisant partie du décor du restaurant Le Trophée, symbole de l’identité ivoirienne du lieu"
            sizes="(min-width: 1024px) 40vw, 90vw"
            aspect="aspect-[3/4]"
            shape="rounded"
            backdrop="terracotta"
            backdropClassName="-left-6 -top-6 h-[85%] w-[85%] sm:-left-10 sm:-top-10"
            bogolanCorner
            bogolanCornerClassName="-bottom-6 -right-6 sm:-bottom-8 sm:-right-8"
          />
        </div>
      </Container>
    </section>
  );
}
