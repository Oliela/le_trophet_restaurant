import Image from "next/image";
import type { GalleryItem } from "@/lib/gallery-data";

/**
 * Une vignette de la galerie masonry. Nommé "GalleryTile" (et non
 * "GalleryItem") pour ne pas entrer en collision avec le type
 * `GalleryItem` de src/lib/gallery-data.ts, utilisé juste en dessous.
 */
export function GalleryTile({
  item,
  index,
  onSelect,
}: {
  item: GalleryItem;
  index: number;
  onSelect: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      style={{ animationDelay: `${(index % 8) * 40}ms` }}
      className={`group mb-4 block w-full overflow-hidden rounded-2xl motion-safe:animate-fade-up motion-safe:opacity-0 motion-safe:[animation-fill-mode:forwards] focus-visible:outline-offset-4 ${
        item.tone === "sombre" ? "bg-brun" : "bg-ivoire-card"
      }`}
    >
      <span className="sr-only">Agrandir la photo : {item.caption}</span>
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes="(min-width: 1024px) 25vw, 50vw"
        className={`h-auto w-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-105 ${
          item.tone === "sombre" ? "object-contain p-4" : "object-cover"
        }`}
      />
    </button>
  );
}
