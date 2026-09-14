const FALLBACK_IMAGE =
  "/images/evenements/evenement-prive.jpg";

export function isVercelBlobUrl(
  imageUrl: string | null | undefined,
) {
  if (!imageUrl) {
    return false;
  }

  try {
    const url = new URL(imageUrl);

    return (
      url.protocol === "https:" &&
      url.hostname.endsWith(
        ".public.blob.vercel-storage.com",
      )
    );
  } catch {
    return false;
  }
}

export function getEventImageUrl(
  imageUrl: string | null | undefined,
) {
  if (imageUrl?.startsWith("/images/")) {
    return imageUrl;
  }

  if (isVercelBlobUrl(imageUrl)) {
    return imageUrl!;
  }

  return FALLBACK_IMAGE;
}