import Image from "next/image";
import { BogolanDivider } from "@/components/ui/BogolanDivider";
import type { Dish } from "@/lib/data";

export function DishCard({
  dish,
  className = "",
  showBogolanCorner = false,
}: {
  dish: Dish;
  className?: string;
  showBogolanCorner?: boolean;
}) {
  return (
    <article
      className={`card-surface group relative flex flex-col overflow-hidden rounded-[2rem] transition-shadow duration-300 hover:shadow-card ${className}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={dish.image}
          alt={`${dish.name} — plat ivoirien servi au restaurant Le Trophée`}
          fill
          sizes="(min-width: 1024px) 33vw, 90vw"
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-brun/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ivoire backdrop-blur-sm">
          {dish.tag}
        </span>
        <span className="absolute -bottom-4 right-4 flex h-16 w-16 items-center justify-center rounded-full bg-ocre text-center text-xs font-bold leading-tight text-brun shadow-soft">
          {dish.price.replace(" F CFA", "")}
          <span className="sr-only"> F CFA</span>
        </span>
        {showBogolanCorner ? (
          <BogolanDivider variant="coin-carte" className="absolute right-0 top-0" />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6 pt-8">
        <h3 className="font-display text-2xl font-semibold text-brun">{dish.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-grisbrun">{dish.description}</p>
        <span className="mt-4 text-sm font-semibold text-terracotta">{dish.price}</span>
      </div>
    </article>
  );
}
