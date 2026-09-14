"use client";

import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const MAX_SIZE = 5 * 1024 * 1024;

export function EventImageUpload({
  initialUrl = "",
}: {
  initialUrl?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Choisissez une image JPG, PNG, WebP ou AVIF.");
      return;
    }

    if (file.size > MAX_SIZE) {
      setError("L’image ne doit pas dépasser 5 Mo.");
      return;
    }

    const safeName = file.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9.-]+/g, "-");

    try {
      setUploading(true);

      const blob = await upload(
        `events/${Date.now()}-${safeName}`,
        file,
        {
          access: "public",
          handleUploadUrl: "/api/admin/event-images/upload",
        },
      );

      setImageUrl(blob.url);
    } catch {
      setError("L’envoi de l’image a échoué.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input type="hidden" name="imageUrl" value={imageUrl} />

      {imageUrl ? (
        <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={imageUrl}
            alt="Aperçu de l’événement"
            fill
            sizes="700px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="mb-4 flex aspect-[16/9] items-center justify-center rounded-2xl border border-dashed border-brun/20 bg-white text-sm text-grisbrun">
          Aucune image sélectionnée
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.avif"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (file) {
            void handleFile(file);
          }
        }}
      />

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="btn-outline"
        >
          {uploading ? "Envoi en cours…" : "Choisir une image"}
        </button>

        {imageUrl ? (
          <button
            type="button"
            disabled={uploading}
            onClick={() => setImageUrl("")}
            className="text-sm font-semibold text-red-700"
          >
            Retirer l’image
          </button>
        ) : null}
      </div>

      <p className="mt-2 text-xs text-grisbrun">
        JPG, PNG, WebP ou AVIF — maximum 5 Mo.
      </p>

      {error ? (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}