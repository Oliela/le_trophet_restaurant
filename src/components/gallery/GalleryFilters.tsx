import type { GalleryCategory } from "@/lib/gallery-data";

export function GalleryFilters({
  filters,
  active,
  onChange,
}: {
  filters: { value: "tout" | GalleryCategory; label: string }[];
  active: "tout" | GalleryCategory;
  onChange: (value: "tout" | GalleryCategory) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filtrer la galerie par catégorie"
      className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
    >
      {filters.map((filter) => {
        const isActive = filter.value === active;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            aria-pressed={isActive}
            className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? "border-terracotta bg-terracotta text-ivoire"
                : "border-brun/15 text-grisbrun hover:border-terracotta hover:text-terracotta"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
