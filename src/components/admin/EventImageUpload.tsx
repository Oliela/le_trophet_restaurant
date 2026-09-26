"use client";

import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { useEffect, useRef, useState } from "react";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const MAX_SIZE = 5 * 1024 * 1024;

export function EventImageUpload({
  initialUrl = "",
  onBlockedChange,
}: {
  initialUrl?: string;
  onBlockedChange: (reason: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const blockedReason = uploading
    ? "Enregistrement indisponible : attendez la fin de l’envoi et de la vérification de l’image."
    : error ? "Enregistrement indisponible : choisissez une autre image ou retirez l’image pour continuer." : "";

  useEffect(() => {
    onBlockedChange(blockedReason);
  }, [blockedReason, onBlockedChange]);

  async function handleFile(file: File) {
    setError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError(`Format non accepté pour « ${file.name} ». Choisissez un JPG, PNG, WebP ou AVIF. Les photos HEIC/HEIF doivent être converties en JPG ou PNG.`);
      return;
    }

    if (file.size > MAX_SIZE) {
      setError(`Image trop volumineuse (${(file.size / 1024 / 1024).toFixed(1)} Mo). La limite est de 5 Mo : réduisez sa taille puis réessayez.`);
      return;
    }

    const safeName = file.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9.-]+/g, "-");

    try {
      setUploading(true);

      const localUrl = URL.createObjectURL(file);
      try {
        const preview = new window.Image();
        preview.src = localUrl;
        await preview.decode();
      } catch {
        setError("Ce fichier ne peut pas être lu comme une image par votre navigateur. Il peut être endommagé ou utiliser un encodage non pris en charge. Exportez-le en JPG ou PNG puis réessayez.");
        return;
      } finally {
        URL.revokeObjectURL(localUrl);
      }

      const blob = await upload(
        `events/${Date.now()}-${safeName}`,
        file,
        {
          access: "public",
          handleUploadUrl: "/api/admin/event-images/upload",
        },
      );

      try {
        const remotePreview = new window.Image();
        remotePreview.src = blob.url;
        await remotePreview.decode();
      } catch {
        setError("L’image a été envoyée, mais son aperçu ne peut pas être chargé. Elle peut être inaccessible depuis votre connexion. Réessayez ou retirez l’image pour enregistrer sans image.");
        return;
      }
      setImageUrl(blob.url);
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "";
      setError(!navigator.onLine
        ? "L’envoi a échoué : aucune connexion Internet. Reconnectez-vous puis choisissez à nouveau l’image."
        : /client token|presigned URL|unauthorized|access denied/i.test(message)
          ? "Le serveur n’a pas autorisé l’envoi de l’image. Votre session peut avoir expiré ou le stockage peut être indisponible. Reconnectez-vous puis réessayez ; si le problème persiste, contactez l’administrateur."
          : "L’envoi de l’image a échoué. La cause exacte n’a pas été transmise : vérifiez votre connexion puis réessayez. Si le problème persiste, contactez l’administrateur.");
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
            key={imageUrl}
            src={imageUrl}
            unoptimized
            onError={() => setError("L’aperçu n’a pas pu être chargé depuis l’adresse de l’image. Le fichier peut être inaccessible ou illisible. Vérifiez votre connexion, puis choisissez à nouveau l’image ou retirez-la pour enregistrer sans image.")}
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

          event.target.value = "";

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

        {imageUrl || error ? (
          <button
            type="button"
            disabled={uploading}
            onClick={() => { setImageUrl(""); setError(""); }}
            className="text-sm font-semibold text-red-700"
          >
            Retirer l’image
          </button>
        ) : null}
      </div>

      <p className="mt-2 text-xs text-grisbrun">
        JPG, PNG, WebP ou AVIF — maximum 5 Mo.
      </p>

      {uploading ? <p role="status" className="mt-2 text-sm text-grisbrun">Envoi et vérification de l’image en cours…</p> : null}

      {error ? (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}