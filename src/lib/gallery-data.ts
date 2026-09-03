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
    src: "/images/plats/garba.jpeg",
    alt: "Garba, thon frit et attiéké",
    caption: "Garba, l'incontournable du Trophée",
    category: "plats",
    width: 1200,
    height: 1400,
  },
  {
    id: "g-plat-kedjenou",
    src: "/images/plats/kedjenou de poulet.avif",
    alt: "Kédjénou de poulet",
    caption: "Kédjénou de poulet mijoté",
    category: "plats",
    width: 1200,
    height: 1000,
  },
  {
    id: "g-plat-poisson",
    src: "/images/plats/pechedujour1.jpg",
    alt: "Poisson braisé et attiéké",
    caption: "Poisson braisé, sauce piquante maison",
    category: "plats",
    width: 1200,
    height: 1000,
  },
  {
    id: "g-plat-alloco",
    src: "/images/plats/alloco-x.jpg",
    alt: "Alloco doré",
    caption: "Alloco doré à souhait",
    category: "plats",
    width: 1000,
    height: 900,
  },
  {
    id: "g-plat-sauce-graine",
    src: "/images/plats/La-sauce-graine-ivoirienne.jpg",
    alt: "Sauce graine traditionnelle",
    caption: "Sauce graine, recette traditionnelle",
    category: "plats",
    width: 1000,
    height: 900,
  },
  {
    id: "g-plat-beignets",
    src: "/images/plats/neems2.jpeg",
    alt: "Neems",
    caption: "Beignets sucrés faits maison",
    category: "plats",
    width: 1000,
    height: 900,
  },
  //espaces
  {
    id: "g-espace-interieur",
    src: "/images/espaces/espace4.jpeg",
    alt: "Salle intérieure du restaurant",
    caption: "Notre salle intérieure",
    category: "espaces",
    width: 1200,
    height: 900,
  },
  {
    id: "g-espace-exterieur",
    src: "/images/espaces/espace1.jpeg",
    alt: "Terrasse extérieure du restaurant",
    caption: "Notre terrasse extérieure",
    category: "espaces",
    width: 1200,
    height: 900,
  },
  {
    id: "g-espace-bar",
    src: "/images/espaces/bar1.jpeg",
    alt: "Bar du restaurant",
    caption: "Notre bar",
    category: "espaces",
    width: 1000,
    height: 1250,
  },
  {
    id: "g-espace-terrasse-soir",
    src: "/images/espaces/espace2.jpeg",
    alt: "Terrasse du restaurant en soirée",
    caption: "La terrasse en soirée",
    category: "espaces",
    width: 1200,
    height: 900,
  },
  //boisson
  {
    id: "g-boisson-tipunch",
    src: "/images/boissons/mon soleil.jpeg",
    alt: "MOn Soleil, cocktail ivoirien",
    caption: "Mon Soleil",
    category: "boissons",
    width: 900,
    height: 1100,
  },
  {
    id: "g-boisson-bissap",
    src: "/images/boissons/bissap.jpeg",
    alt: "Bissap glacé",
    caption: "Bissap glacé maison",
    category: "boissons",
    width: 900,
    height: 1100,
  },
  {
    id: "g-boisson-cafe",
    src: "/images/boissons/shotbaddies.jpeg",
    alt: "Shot Baddies",
    caption: "Shot Baddies",
    category: "boissons",
    width: 900,
    height: 1100,
  },
  //evenements
  {
    id: "g-evenement-karaoke",
    src: "/images/evenements/karaoke.png",
    alt: "Soirée karaoké au restaurant",
    caption: "Soirée karaoké",
    category: "evenements",
    width: 1200,
    height: 900,
  },
  {
    id: "g-evenement-jeux",
    src: "/images/evenements/secrethitler.jpg",
    alt: "SOiree jeux de société",
    caption: "Secret Hitler, soirée jeux de société",
    category: "evenements",
    width: 1200,
    height: 900,
  },
  {
    id: "g-evenement-match",
    src: "/images/evenements/evenement-match.jpg",
    alt: "Diffusion d'un match au restaurant",
    caption: "Diffusion d'un match",
    category: "evenements",
    width: 1200,
    height: 900,
  },
  {
    id: "g-evenement-prive",
    src: "/images/evenements/evenement-prive.jpg",
    alt: "Événement privé au restaurant",
    caption: "Anniversaire et événement privé",
    category: "evenements",
    width: 1200,
    height: 900,
  },
  //decorations
  {
    id: "g-decoration-bogolan-1",
    src: "/images/bogolan/bogolan-1.jpg",
    alt: "Bogolan aux bandes ocre, noires et ivoire exposé au restaurant",
    caption: "Bogolan aux motifs traditionnels",
    category: "decoration",
    width: 1350,
    height: 1800,
  },
  {
    id: "g-decoration-bogolan-2",
    src: "/images/bogolan/bogolan-2.jpg",
    alt: "Bogolan aux bandes indigo, ocre et ivoire exposé au restaurant",
    caption: "Bogolan indigo et ocre",
    category: "decoration",
    width: 1350,
    height: 1800,
  },
  {
    id: "g-decoration-bogolan-3",
    src: "/images/bogolan/bogolan-3.jpg",
    alt: "Bogolan brun orné de fins motifs géométriques ivoire",
    caption: "Bogolan brun aux motifs géométriques",
    category: "decoration",
    width: 1350,
    height: 1800,
  },
  {
    id: "g-decoration-bogolan-4",
    src: "/images/bogolan/bogolan-4.jpg",
    alt: "Bogolan noir et ivoire à rayures verticales exposé au restaurant",
    caption: "Bogolan noir et ivoire",
    category: "decoration",
    width: 1350,
    height: 1800,
  },
  {
    id: "g-decoration-bogolan-5",
    src: "/images/bogolan/bogolan-5.jpg",
    alt: "Bogolan brun décoré de grands symboles géométriques ivoire",
    caption: "Bogolan brun et ivoire",
    category: "decoration",
    width: 1350,
    height: 1800,
  },
  {
    id: "g-decoration-poupee-1",
    src: "/images/poupee-africaine-1.jpeg",
    alt: "Poupée africaine faisant partie de la décoration",
    caption: "L'une de nos poupées africaines",
    category: "decoration",
    width: 700,
    height: 1100,
    tone: "sombre",
  },
  {
    id: "g-decoration-poupee-2",
    src: "/images/poupee-africaine-2.jpeg",
    alt: "Poupée africaine en situation dans le décor",
    caption: "Poupée africaine, dans son décor",
    category: "decoration",
    width: 700,
    height: 1100,
    tone: "sombre",
  },
  {
    id: "g-decoration-poupee-3",
    src: "/images/poupee-africaine-1.jpeg",
    alt: "Poupée africaine, signature du restaurant",
    caption: "Poupée africaine, signature du lieu",
    category: "decoration",
    width: 700,
    height: 1100,
    tone: "sombre",
  },
  {
    id: "g-decoration-table",
    src: "/images/decoration/decoration-table.jpg",
    alt: "Détail décoratif d'une table",
    caption: "Détail d'une table",
    category: "decoration",
    width: 1000,
    height: 1000,
  },
  // equipes
  {
    id: "g-equipe-salle",
    src: "/images/equipe/equipe-1.jpg",
    alt: "L'équipe en salle",
    caption: "L'équipe en salle",
    category: "equipe",
    width: 900,
    height: 1100,
  },
  {
    id: "g-equipe-cuisine",
    src: "/images/equipe/equipe-2.jpg",
    alt: "L'équipe en cuisine",
    caption: "L'équipe en cuisine",
    category: "equipe",
    width: 900,
    height: 1100,
  },
  {
    id: "g-equipe-accueil",
    src: "/images/equipe/equipe-3.jpg",
    alt: "L'équipe à l'accueil",
    caption: "L'accueil du restaurant",
    category: "equipe",
    width: 900,
    height: 1100,
  },
];
