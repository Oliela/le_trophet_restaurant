import { GalleryTile } from "@/components/gallery/GalleryTile";
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
        <GalleryTile key={item.id} item={item} index={index} onSelect={onSelect} />
      ))}
    </div>
  );
}
