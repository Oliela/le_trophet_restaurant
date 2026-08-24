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
  { href: "/carte", label: "À la carte" },
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

export const BEST_SELLERS: Dish[] = [
  {
    slug: "garba",
    name: "Garba",
    description:
      "Thon frit et attiéké parfumé, servi avec notre sauce tomate maison et légumes frais.",
    price: "2 500 F CFA",
    tag: "Spécialité de la maison",
    image: "/images/plat-garba.jpg",
  },
  {
    slug: "kedjenou-poulet",
    name: "Kédjénou de poulet",
    description:
      "Poulet mijoté lentement à l’étouffée avec légumes et épices, selon la tradition ivoirienne.",
    price: "4 500 F CFA",
    tag: "Très apprécié",
    image: "/images/plat-kedjenou.jpg",
  },
  {
    slug: "poisson-braise",
    name: "Poisson braisé",
    description:
      "Poisson braisé à la braise, accompagné d’attiéké et d’une sauce piquante maison.",
    price: "5 000 F CFA",
    tag: "Très apprécié",
    image: "/images/plat-poisson-braise.jpg",
  },
];

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

export const EVENTS: EventCard[] = [
  {
    slug: "karaoke",
    title: "Soirées karaoké",
    description:
      "Venez chanter vos chansons préférées et partager un moment convivial autour d’un bon repas.",
    image: "/images/evenement-karaoke.jpg",
  },
  {
    slug: "jeux-de-societe",
    title: "Jeux de société",
    description:
      "Profitez de nos journées et soirées jeux pour vous détendre entre amis ou faire de nouvelles rencontres.",
    image: "/images/evenement-jeux.jpg",
  },
  {
    slug: "evenements-prives",
    title: "Événements privés",
    description:
      "Anniversaire, repas de groupe ou rencontre professionnelle : contactez-nous pour organiser votre événement.",
    image: "/images/evenement-prive.jpg",
  },
];

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
