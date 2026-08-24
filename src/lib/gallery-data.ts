/**
 * Données temporaires de la galerie. Les visuels sont des images générées
 * (couleurs et formes de la charte graphique) en attendant le reportage
 * photo officiel du restaurant.
 */

export type GalleryCategory =
  | "plats"
  | "espaces"
  | "boissons"
  | "evenements"
  | "decoration"
  | "equipe";

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  width: number;
  height: number;
  tone?: "clair" | "sombre";
};

export const GALLERY_FILTERS: { value: "tout" | GalleryCategory; label: string }[] = [
  { value: "tout", label: "Tout" },
  { value: "plats", label: "Nos plats" },
  { value: "espaces", label: "Nos espaces" },
  { value: "boissons", label: "Boissons" },
  { value: "evenements", label: "Événements" },
  { value: "decoration", label: "Décoration" },
  { value: "equipe", label: "Notre équipe" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-plat-garba",
    src: "/images/plat-garba.jpg",
    alt: "Garba, thon frit et attiéké",
    caption: "Garba, l'incontournable du Trophée",
    category: "plats",
    width: 1200,
    height: 1400,
  },
  {
    id: "g-plat-kedjenou",
    src: "/images/plat-kedjenou.jpg",
    alt: "Kédjénou de poulet",
    caption: "Kédjénou de poulet mijoté",
    category: "plats",
    width: 1200,
    height: 1000,
  },
  {
    id: "g-plat-poisson",
    src: "/images/plat-poisson-braise.jpg",
    alt: "Poisson braisé et attiéké",
    caption: "Poisson braisé, sauce piquante maison",
    category: "plats",
    width: 1200,
    height: 1000,
  },
  {
    id: "g-plat-alloco",
    src: "/images/menu/alloco-nature.jpg",
    alt: "Alloco doré",
    caption: "Alloco doré à souhait",
    category: "plats",
    width: 1000,
    height: 900,
  },
  {
    id: "g-plat-sauce-graine",
    src: "/images/menu/sauce-graine.jpg",
    alt: "Sauce graine traditionnelle",
    caption: "Sauce graine, recette traditionnelle",
    category: "plats",
    width: 1000,
    height: 900,
  },
  {
    id: "g-plat-beignets",
    src: "/images/menu/beignets-sucres.jpg",
    alt: "Beignets sucrés maison",
    caption: "Beignets sucrés faits maison",
    category: "plats",
    width: 1000,
    height: 900,
  },
  {
    id: "g-espace-interieur",
    src: "/images/espace-interieur.jpg",
    alt: "Salle intérieure du restaurant",
    caption: "Notre salle intérieure",
    category: "espaces",
    width: 1200,
    height: 900,
  },
  {
    id: "g-espace-exterieur",
    src: "/images/espace-exterieur.jpg",
    alt: "Terrasse extérieure du restaurant",
    caption: "Notre terrasse extérieure",
    category: "espaces",
    width: 1200,
    height: 900,
  },
  {
    id: "g-espace-bar",
    src: "/images/galerie/espace-bar.jpg",
    alt: "Bar du restaurant",
    caption: "Notre bar",
    category: "espaces",
    width: 1000,
    height: 1250,
  },
  {
    id: "g-espace-terrasse-soir",
    src: "/images/galerie/espace-terrasse-soir.jpg",
    alt: "Terrasse du restaurant en soirée",
    caption: "La terrasse en soirée",
    category: "espaces",
    width: 1200,
    height: 900,
  },
  {
    id: "g-boisson-tipunch",
    src: "/images/menu/ti-punch-ivoirien.jpg",
    alt: "Ti'Punch ivoirien",
    caption: "Ti'Punch ivoirien",
    category: "boissons",
    width: 900,
    height: 1100,
  },
  {
    id: "g-boisson-bissap",
    src: "/images/menu/bissap-glace.jpg",
    alt: "Bissap glacé",
    caption: "Bissap glacé maison",
    category: "boissons",
    width: 900,
    height: 1100,
  },
  {
    id: "g-boisson-cafe",
    src: "/images/menu/cafe-ivoirien.jpg",
    alt: "Café ivoirien",
    caption: "Café ivoirien",
    category: "boissons",
    width: 900,
    height: 1100,
  },
  {
    id: "g-evenement-karaoke",
    src: "/images/evenement-karaoke.jpg",
    alt: "Soirée karaoké au restaurant",
    caption: "Soirée karaoké",
    category: "evenements",
    width: 1200,
    height: 900,
  },
  {
    id: "g-evenement-jeux",
    src: "/images/evenement-jeux.jpg",
    alt: "Après-midi jeux de société",
    caption: "Après-midi jeux de société",
    category: "evenements",
    width: 1200,
    height: 900,
  },
  {
    id: "g-evenement-match",
    src: "/images/galerie/evenement-match.jpg",
    alt: "Diffusion d'un match au restaurant",
    caption: "Diffusion d'un match",
    category: "evenements",
    width: 1200,
    height: 900,
  },
  {
    id: "g-evenement-prive",
    src: "/images/evenement-prive.jpg",
    alt: "Événement privé au restaurant",
    caption: "Anniversaire et événement privé",
    category: "evenements",
    width: 1200,
    height: 900,
  },
  {
    id: "g-decoration-bogolan",
    src: "/images/bogolan-texture.jpg",
    alt: "Tissu bogolan authentique du restaurant",
    caption: "Notre tissu bogolan authentique",
    category: "decoration",
    width: 1600,
    height: 1600,
  },
  {
    id: "g-decoration-poupee-1",
    src: "/images/poupee-africaine-1.png",
    alt: "Poupée africaine faisant partie de la décoration",
    caption: "L'une de nos poupées africaines",
    category: "decoration",
    width: 700,
    height: 1100,
    tone: "sombre",
  },
  {
    id: "g-decoration-poupee-2",
    src: "/images/poupee-africaine-2.png",
    alt: "Poupée africaine en situation dans le décor",
    caption: "Poupée africaine, dans son décor",
    category: "decoration",
    width: 700,
    height: 1100,
    tone: "sombre",
  },
  {
    id: "g-decoration-poupee-3",
    src: "/images/poupee-africaine-3.png",
    alt: "Poupée africaine, signature du restaurant",
    caption: "Poupée africaine, signature du lieu",
    category: "decoration",
    width: 700,
    height: 1100,
    tone: "sombre",
  },
  {
    id: "g-decoration-table",
    src: "/images/galerie/decoration-table.jpg",
    alt: "Détail décoratif d'une table",
    caption: "Détail d'une table",
    category: "decoration",
    width: 1000,
    height: 1000,
  },
  {
    id: "g-equipe-salle",
    src: "/images/galerie/equipe-1.jpg",
    alt: "L'équipe en salle",
    caption: "L'équipe en salle",
    category: "equipe",
    width: 900,
    height: 1100,
  },
  {
    id: "g-equipe-cuisine",
    src: "/images/galerie/equipe-2.jpg",
    alt: "L'équipe en cuisine",
    caption: "L'équipe en cuisine",
    category: "equipe",
    width: 900,
    height: 1100,
  },
  {
    id: "g-equipe-accueil",
    src: "/images/galerie/equipe-3.jpg",
    alt: "L'équipe à l'accueil",
    caption: "L'accueil du restaurant",
    category: "equipe",
    width: 900,
    height: 1100,
  },
];
