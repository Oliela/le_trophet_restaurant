import type { Metadata } from "next";
import { SITE } from "@/lib/site.config";

const DEFAULT_OG_IMAGE = "/images/og-image.jpg";

/**
 * Construit les metadata Next.js d'une page (titre, description, Open Graph,
 * image de partage, informations locales) à partir des valeurs du fichier
 * de configuration central (src/lib/site.config.ts).
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const fullTitle = title === SITE.name ? title : `${title} — ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE.name,
      locale: "fr_SN",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/**
 * Données structurées Schema.org (type Restaurant) injectées dans le layout
 * racine. Valeurs temporaires à remplacer par les informations officielles.
 */
export function buildRestaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: SITE.name,
    legalName: SITE.legalName,
    description: SITE.description,
    servesCuisine: SITE.cuisineType,
    priceRange: SITE.priceRange,
    telephone: SITE.phone,
    email: SITE.email,
    url: SITE.siteUrl,
    image: `${SITE.siteUrl}${DEFAULT_OG_IMAGE}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressLocality: SITE.city,
      addressCountry: SITE.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHoursSpecification: SITE.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    sameAs: [
      "https://facebook.com/letrophee.dakar",
      "https://instagram.com/letrophee.dakar",
      "https://tiktok.com/@letrophee.dakar",
    ],
  };
}
