"use client";

import { useMemo, useState } from "react";
import { GalleryFilters } from "@/components/gallery/GalleryFilters";
import { Lightbox } from "@/components/gallery/Lightbox";
import { MasonryGrid } from "@/components/gallery/MasonryGrid";
import { GALLERY_FILTERS, type GalleryCategory, type GalleryItem } from "@/lib/gallery-data";

export function GalleryExplorer({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<"tout" | GalleryCategory>("tout");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "tout" ? items : items.filter((item) => item.category === filter)),
    [items, filter]
  );

  return (
    <div>
      <GalleryFilters
        filters={GALLERY_FILTERS}
        active={filter}
        onChange={(value) => {
          setFilter(value);
          setLightboxIndex(null);
        }}
      />

      <div className="mt-10">
        <MasonryGrid key={filter} items={filtered} onSelect={setLightboxIndex} />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-grisbrun">
          Aucune photo dans cette catégorie pour le moment.
        </p>
      ) : null}

      {lightboxIndex !== null ? (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((current) =>
              current === null ? null : (current - 1 + filtered.length) % filtered.length
            )
          }
          onNext={() =>
            setLightboxIndex((current) => (current === null ? null : (current + 1) % filtered.length))
          }
        />
      ) : null}
    </div>
  );
}
