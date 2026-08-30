/**
 * Configuration centrale du restaurant Le Trophée.
 * Toutes les valeurs ci-dessous sont temporaires et doivent être remplacées
 * par les informations officielles du restaurant avant mise en production.
 */

export const SITE = {
  name: "Le Trofet",
  legalName: "Le Trofet",
  tagline: "Les saveurs de la Côte d’Ivoire au cœur de Dakar.",
  description:
    "Restaurant ivoirien à Dakar : cuisine authentique, ambiance chaleureuse, plats à partir de 2 500 F CFA. Sur place, à emporter, livraison, karaoké et jeux de société.",
  phone: "+221 77 227 65 80",
  phoneDisplay: "77 227 65 80",
  whatsapp: "https://wa.me/221772276580",
  email: "contact@le-trophee-dakar.sn",
  address: "36 Rue PE 43, Dakar, Sénégal",
  addressShort: "36 Rue PE 43, Dakar",
  city: "Dakar",
  country: "Sénégal",
  // Coordonnées temporaires (centre approximatif de Dakar) — à remplacer par la position exacte du restaurant.
  geo: { lat: 14.6937, lng: -17.4441 },
  hours: [
    { jours: "Dimanche — Jeudi", heures: "9h00 – 00h00" },
    { jours: "Vendredi — Samedi", heures: "9h00 – 01h00" },
  ],
  // Horaires au format Schema.org (jour en 2 lettres, heures en HH:mm), dérivés de `hours` ci-dessus.
  openingHours: [
    { days: ["Su", "Mo", "Tu", "We", "Th"], opens: "09:00", closes: "00:00" },
    { days: ["Fr", "Sa"], opens: "09:00", closes: "01:00" },
  ],
  cuisineType: "Cuisine ivoirienne",
  priceRange: "2 500 F CFA – 7 500 F CFA",
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
