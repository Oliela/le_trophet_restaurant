/**
 * Données temporaires des événements du restaurant.
 * Dates, horaires et tarifs sont fictifs, à mettre à jour avec le calendrier réel.
 */

export type EventItem = {
  id: string;
  slug: string;
  titre: string;
  dateLabel: string;
  heure: string;
  tarif: string;
  description: string;
  image: string;
  places?: string;
};

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: "evt-karaoke",
    slug: "soiree-karaoke",
    titre: "Soirée karaoké",
    dateLabel: "Tous les vendredis · prochaine soirée le 28 août 2026",
    heure: "20h00 – 23h00",
    tarif: "Entrée libre",
    description:
      "Venez chanter vos chansons préférées et partager un moment convivial autour d'un bon repas.",
    image: "/images/evenement-karaoke.jpg",
  },
  {
    id: "evt-jeux",
    slug: "apres-midi-jeux-de-societe",
    titre: "Après-midi jeux de société",
    dateLabel: "Tous les dimanches · prochaine session le 30 août 2026",
    heure: "15h00 – 18h00",
    tarif: "Entrée libre",
    description:
      "Profitez de nos après-midis jeux pour vous détendre entre amis ou faire de nouvelles rencontres.",
    image: "/images/evenement-jeux.jpg",
  },
  {
    id: "evt-match",
    slug: "diffusion-dun-match",
    titre: "Diffusion d'un match",
    dateLabel: "Samedi 5 septembre 2026",
    heure: "20h00",
    tarif: "Entrée libre",
    description:
      "Vivez l'ambiance d'un grand match sur écran, autour d'un plat et d'un verre entre supporters.",
    image: "/images/galerie/evenement-match.jpg",
    places: "40 places",
  },
  {
    id: "evt-decouverte",
    slug: "soiree-decouverte-specialite-ivoirienne",
    titre: "Soirée découverte d'une spécialité ivoirienne",
    dateLabel: "Vendredi 11 septembre 2026",
    heure: "19h30 – 22h00",
    tarif: "5 000 F CFA / personne",
    description:
      "Une soirée à thème pour découvrir en dégustation une spécialité emblématique de la Côte d'Ivoire.",
    image: "/images/galerie/evenement-decouverte.jpg",
    places: "30 places",
  },
  {
    id: "evt-prive",
    slug: "anniversaire-evenement-prive",
    titre: "Anniversaire ou événement privé",
    dateLabel: "Sur réservation",
    heure: "À définir avec vous",
    tarif: "Sur devis",
    description:
      "Anniversaire, repas de groupe ou rencontre professionnelle : nous privatisons un espace pour votre événement.",
    image: "/images/evenement-prive.jpg",
  },
];

export const PAST_EVENTS_GALLERY = [
  { src: "/images/evenement-karaoke.jpg", alt: "Précédente soirée karaoké" },
  { src: "/images/evenement-jeux.jpg", alt: "Précédent après-midi jeux de société" },
  { src: "/images/evenement-prive.jpg", alt: "Précédent événement privé" },
  { src: "/images/galerie/evenement-match.jpg", alt: "Précédente diffusion d'un match" },
  { src: "/images/galerie/evenement-decouverte.jpg", alt: "Précédente soirée découverte" },
];
