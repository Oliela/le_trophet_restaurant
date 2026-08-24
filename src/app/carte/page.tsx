import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { BEST_SELLERS } from "@/lib/data";

export const metadata: Metadata = {
  title: "À la carte — Le Trophée",
  description: "Découvrez la carte du restaurant ivoirien Le Trophée à Dakar.",
};

export default function CartePage() {
  return (
    <>
      <PageIntro
        eyebrow="Notre carte"
        title="À la carte"
        text="Une sélection de nos plats phares, à partir de 2 500 F CFA. La carte complète du restaurant sera bientôt disponible sur cette page."
      />
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {BEST_SELLERS.map((dish) => (
              <article key={dish.slug} className="card-surface overflow-hidden rounded-3xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-semibold text-brun">{dish.name}</h2>
                  <p className="mt-2 text-sm text-grisbrun">{dish.description}</p>
                  <p className="mt-3 text-sm font-semibold text-terracotta">{dish.price}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
