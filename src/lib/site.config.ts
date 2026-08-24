/**
 * Configuration centrale du restaurant Le Trophée.
 * Toutes les valeurs ci-dessous sont temporaires et doivent être remplacées
 * par les informations officielles du restaurant avant mise en production.
 */

export const SITE = {
  name: "Le Trophée",
  legalName: "Le Trophée SARL",
  tagline: "Les saveurs de la Côte d’Ivoire au cœur de Dakar.",
  description:
    "Restaurant ivoirien à Dakar : cuisine authentique, ambiance chaleureuse, plats à partir de 2 500 F CFA. Sur place, à emporter, livraison, karaoké et jeux de société.",
  phone: "+221 77 000 00 00",
  phoneDisplay: "77 000 00 00",
  whatsapp: "https://wa.me/221770000000",
  email: "contact@le-trophee-dakar.sn",
  address: "Rue 12, Angle Corniche Ouest, Dakar, Sénégal",
  addressShort: "Corniche Ouest, Dakar",
  city: "Dakar",
  country: "Sénégal",
  // Coordonnées temporaires (centre approximatif de Dakar) — à remplacer par la position exacte du restaurant.
  geo: { lat: 14.6937, lng: -17.4441 },
  hours: [
    { jours: "Lundi — Vendredi", heures: "11h00 – 23h00" },
    { jours: "Samedi — Dimanche", heures: "11h00 – 00h00" },
  ],
  // Horaires au format Schema.org (jour en 2 lettres, heures en HH:mm), dérivés de `hours` ci-dessus.
  openingHours: [
    { days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "11:00", closes: "23:00" },
    { days: ["Sa", "Su"], opens: "11:00", closes: "23:59" },
  ],
  cuisineType: "Cuisine ivoirienne",
  priceRange: "2 500 F CFA – 6 000 F CFA",
  startingPrice: 2500,
  siteUrl: "https://www.le-trophee-dakar.sn",
} as const;

export const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com/letrophee.dakar" },
  { label: "Instagram", href: "https://instagram.com/letrophee.dakar" },
  { label: "TikTok", href: "https://tiktok.com/@letrophee.dakar" },
  { label: "WhatsApp", href: SITE.whatsapp },
];

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "À la carte" },
  { href: "/galerie", label: "Galerie" },
  { href: "/evenements", label: "Événements" },
  { href: "/contact", label: "Contact" },
];

export function getDirectionsUrl(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.address)}`;
}

export function getMapEmbedUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${SITE.geo.lat},${SITE.geo.lng}`;
}
