import Image from "next/image";
import { BogolanDivider } from "@/components/ui/BogolanDivider";
import { MenuBadgeList } from "@/components/ui/MenuBadgeList";
import { MenuRowDivider } from "@/components/ui/MenuRowDivider";
import { PriceTag } from "@/components/ui/PriceTag";
import { Reveal } from "@/components/ui/Reveal";
import type { MenuCategorySlug, MenuItem } from "@/lib/menu-data";

export function CategorySection({
  slug,
  label,
  index,
  items,
}: {
  slug: MenuCategorySlug;
  label: string;
  index: number;
  items: MenuItem[];
}) {
  if (items.length === 0) return null;

  const featured = items.find((item) => item.recommandation) ?? items[0];
  const rest = items.filter((item) => item.id !== featured.id);
  const imageOnRight = index % 2 === 1;

  return (
    <section
      id={slug}
      aria-labelledby={`${slug}-heading`}
      className="scroll-mt-[168px] border-t border-brun/10 py-16 first:border-t-0 sm:py-20"
    >
      <div className="flex items-center gap-4">
        <span className="font-display text-3xl text-terracotta/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 id={`${slug}-heading`} className="font-display text-3xl font-semibold text-brun sm:text-4xl">
          {label}
        </h2>
        <BogolanDivider variant="carre" className="hidden sm:block" />
      </div>

      {/* Plat mis en avant */}
      <Reveal className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className={`relative mx-auto w-full max-w-md ${imageOnRight ? "lg:order-2" : ""}`}>
          <div
            aria-hidden="true"
            className="absolute -inset-4 -z-10 rounded-organic bg-ocre/15"
          />
          {index % 2 === 0 ? (
            <BogolanDivider
              variant="angle"
              className={`absolute -z-10 ${imageOnRight ? "-right-5 -top-5" : "-left-5 -top-5"}`}
            />
          ) : null}
          <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-organic shadow-card">
            <Image
              src={featured.image}
              alt={`${featured.nom} — ${label.toLowerCase()} du restaurant Le Trophée`}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
            />
          </div>
          <PriceTag
            amount={featured.prix}
            size="lg"
            className={`absolute -bottom-5 ${imageOnRight ? "left-4" : "right-4"}`}
          />
        </div>

        <div className={imageOnRight ? "lg:order-1" : ""}>
          <span className="eyebrow">Plat mis en avant</span>
          <h3 className="mt-2 font-display text-3xl font-semibold text-brun">{featured.nom}</h3>
          <p className="mt-3 max-w-md text-base leading-relaxed text-grisbrun">
            {featured.description}
          </p>
          <MenuBadgeList badges={featured.badges} className="mt-5" />
        </div>
      </Reveal>

      {/* Autres plats de la catégorie */}
      {rest.length > 0 ? (
        <ul className="mt-14 divide-y divide-transparent">
          {rest.map((item) => (
            <li key={item.id}>
              <div className="flex items-center gap-5 py-5">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full sm:h-20 sm:w-20">
                  <Image
                    src={item.image}
                    alt={item.nom}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h4 className="font-display text-xl font-semibold text-brun">{item.nom}</h4>
                    {item.disponibilite === "sur_commande" ? (
                      <span className="text-xs font-semibold uppercase tracking-wide text-grisbrun">
                        Sur commande
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-grisbrun">
                    {item.description}
                  </p>
                  <MenuBadgeList badges={item.badges} className="mt-2" />
                </div>
                <PriceTag amount={item.prix} size="sm" className="ml-auto" />
              </div>
              <MenuRowDivider />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
