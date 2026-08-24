"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { CloseIcon } from "@/components/icons/Icons";
import { GALLERY_FILTERS, type GalleryItem } from "@/lib/gallery-data";

const CATEGORY_LABEL = Object.fromEntries(
  GALLERY_FILTERS.map((f) => [f.value, f.label])
);

export function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo agrandie : ${item.caption}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brun/95 p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Fermer la photo agrandie"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-ivoire/30 text-ivoire hover:border-ivoire sm:right-6 sm:top-6"
      >
        <CloseIcon className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Photo précédente"
        className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivoire/30 text-ivoire hover:border-ivoire sm:left-6"
      >
        <span aria-hidden="true" className="text-xl">
          ‹
        </span>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Photo suivante"
        className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivoire/30 text-ivoire hover:border-ivoire sm:right-6"
      >
        <span aria-hidden="true" className="text-xl">
          ›
        </span>
      </button>

      <figure
        className="flex max-h-full max-w-3xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-h-[70vh] w-full overflow-hidden rounded-2xl">
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            sizes="90vw"
            className="max-h-[70vh] w-full object-contain"
            priority
          />
        </div>
        <figcaption className="mt-5 text-center text-ivoire">
          <p className="font-display text-xl font-semibold">{item.caption}</p>
          <p className="mt-1 text-sm uppercase tracking-wide text-ocre-light">
            {CATEGORY_LABEL[item.category]} · {index + 1} / {items.length}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
