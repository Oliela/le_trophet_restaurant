import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BEST_SELLERS, type Dish } from "@/lib/data";

const OFFSET = ["lg:mt-16", "lg:-mt-6", "lg:mt-24"];
const SIZE = ["lg:scale-105", "", ""];

function DishCard({ dish, index }: { dish: Dish; index: number }) {
  return (
    <article
      className={`card-surface group relative flex flex-col overflow-hidden rounded-[2rem] ${OFFSET[index] ?? ""} ${SIZE[index] ?? ""}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={dish.image}
          alt={`${dish.name} — plat ivoirien servi au restaurant Le Trophée`}
          fill
          sizes="(min-width: 1024px) 33vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-brun/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ivoire backdrop-blur-sm">
          {dish.tag}
        </span>
        <span className="absolute -bottom-4 right-4 flex h-16 w-16 items-center justify-center rounded-full bg-ocre text-center text-xs font-bold leading-tight text-brun shadow-card">
          {dish.price.replace(" F CFA", "")}
          <span className="sr-only"> F CFA</span>
        </span>
        <span
          aria-hidden="true"
          className="bogolan-bg absolute right-0 top-0 h-10 w-10 opacity-90 [clip-path:polygon(100%_0,100%_100%,0_0)]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 pt-8">
        <h3 className="font-display text-2xl font-semibold text-brun">{dish.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-grisbrun">{dish.description}</p>
        <span className="mt-4 text-sm font-semibold text-terracotta">{dish.price}</span>
      </div>
    </article>
  );
}

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
            <DishCard key={dish.slug} dish={dish} index={index} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button href="/carte" variant="outline">
            Découvrir toute la carte
          </Button>
        </div>
      </Container>
    </section>
  );
}
