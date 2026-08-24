import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DishCard } from "@/components/ui/DishCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BEST_SELLERS } from "@/lib/data";

const OFFSET = ["lg:mt-16", "lg:-mt-6", "lg:mt-24"];
const SIZE = ["lg:scale-105", "", ""];

export function BestSellers() {
  return (
    <section id="carte" className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Nos meilleures ventes"
          title="Les plats que vous aimez déjà"
          text="Des recettes généreuses, préparées avec soin et servies dans le respect des saveurs ivoiriennes."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {BEST_SELLERS.map((dish, index) => (
            <Reveal key={dish.slug} delay={index * 100} className={OFFSET[index] ?? ""}>
              <DishCard dish={dish} showBogolanCorner className={SIZE[index] ?? ""} />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button href="/menu" variant="outline">
            Découvrir toute la carte
          </Button>
        </div>
      </Container>
    </section>
  );
}
