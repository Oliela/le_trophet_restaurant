import Image from "next/image";
import type { GalleryItem } from "@/lib/gallery-data";

export function MasonryGrid({
  items,
  onSelect,
}: {
  items: GalleryItem[];
  onSelect: (index: number) => void;
}) {
  return (
    <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(index)}
          style={{ animationDelay: `${(index % 8) * 40}ms` }}
          className={`group mb-4 block w-full animate-fade-up overflow-hidden rounded-2xl opacity-0 [animation-fill-mode:forwards] focus-visible:outline-offset-4 ${
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
            className={`h-auto w-full transition-transform duration-500 group-hover:scale-105 ${
              item.tone === "sombre" ? "object-contain p-4" : "object-cover"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
