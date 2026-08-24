import { UPCOMING_EVENTS } from "@/lib/events-data";
import { formatPrice } from "@/lib/format";
import { getMenuItemsByCategory } from "@/lib/menu-data";

export const SITE = {
  name: "Le Trophée",
  tagline: "Les saveurs de la Côte d’Ivoire au cœur de Dakar.",
  phone: "+221 77 000 00 00",
  phoneDisplay: "77 000 00 00",
  whatsapp: "https://wa.me/221770000000",
  email: "contact@le-trophee-dakar.sn",
  address: "Rue 12, Angle Corniche Ouest, Dakar, Sénégal",
  addressShort: "Corniche Ouest, Dakar",
  hours: [
    { jours: "Lundi — Vendredi", heures: "11h00 – 23h00" },
    { jours: "Samedi — Dimanche", heures: "11h00 – 00h00" },
  ],
};

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "À la carte" },
  { href: "/galerie", label: "Galerie" },
  { href: "/evenements", label: "Événements" },
  { href: "/contact", label: "Contact" },
];

export type Dish = {
  slug: string;
  name: string;
  description: string;
  price: string;
  tag: string;
  image: string;
};

// Dérivé de la carte officielle (src/lib/menu-data.ts) pour éviter toute divergence de contenu.
export const BEST_SELLERS: Dish[] = getMenuItemsByCategory("incontournables").map((item) => ({
  slug: item.slug,
  name: item.nom,
  description: item.description,
  price: formatPrice(item.prix),
  tag: item.recommandation ? "Spécialité de la maison" : "Très apprécié",
  image: item.image,
}));

export const SERVICES = [
  { label: "Sur place", icon: "utensils" },
  { label: "À emporter", icon: "bag" },
  { label: "Livraison", icon: "bike" },
  { label: "Réservation de groupe", icon: "users" },
] as const;

export type EventCard = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

// Sélection de 3 rendez-vous mis en avant sur l'accueil, dérivée de src/lib/events-data.ts
// (la liste complète, avec dates et tarifs, est présentée sur la page /evenements).
const HOMEPAGE_EVENT_SLUGS = [
  "soiree-karaoke",
  "apres-midi-jeux-de-societe",
  "anniversaire-evenement-prive",
];

export const EVENTS: EventCard[] = HOMEPAGE_EVENT_SLUGS.map((slug) => {
  const event = UPCOMING_EVENTS.find((item) => item.slug === slug)!;
  return {
    slug: event.slug,
    title: event.titre,
    description: event.description,
    image: event.image,
  };
});

export const VALUES = [
  {
    title: "Des saveurs authentiques",
    description: "Des recettes inspirées de la véritable cuisine ivoirienne.",
    icon: "leaf",
  },
  {
    title: "Des plats généreux",
    description:
      "Des portions gourmandes accessibles à partir de 2 500 F CFA.",
    icon: "plate",
  },
  {
    title: "Une ambiance conviviale",
    description: "Un espace chaleureux pour manger, échanger et se retrouver.",
    icon: "heart",
  },
  {
    title: "Une expérience complète",
    description: "De bons plats, des événements et des moments à partager.",
    icon: "star",
  },
] as const;

export const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com/letrophee.dakar" },
  { label: "Instagram", href: "https://instagram.com/letrophee.dakar" },
  { label: "TikTok", href: "https://tiktok.com/@letrophee.dakar" },
  { label: "WhatsApp", href: SITE.whatsapp },
];

export const SPECIALITES_FOOTER = [
  "Garba",
  "Kédjénou de poulet",
  "Poisson braisé",
  "Alloco",
  "Attiéké poisson",
];
