/**
 * Données temporaires de la carte du restaurant Le Trophée.
 * Noms, descriptions, prix et photos sont fictifs et doivent être remplacés
 * par la carte officielle et les photographies réelles du restaurant avant mise en production.
 */

export type MenuCategorySlug =
  | "entrees"
  | "sauces"
  | "accompagnements"
  | "grillades"
  | "incontournables"
  | "desserts"
  | "cocktails"
  | "mocktails"
  | "boissons-chaudes"
  | "boissons-alcoolisees"
  | "softs";

export type MenuBadge = "Populaire" | "Épicé" | "Végétarien" | "Sur commande";

export type MenuAvailability = "disponible" | "sur_commande" | "rupture";

export type MenuItem = {
  id: string;
  nom: string;
  slug: string;
  categorie: MenuCategorySlug;
  description: string;
  prix: number;
  image: string;
  badges: MenuBadge[];
  disponibilite: MenuAvailability;
  recommandation: boolean;
};

export const MENU_CATEGORIES: { slug: MenuCategorySlug; label: string }[] = [
  { slug: "entrees", label: "Entrées" },
  { slug: "sauces", label: "Sauces" },
  { slug: "accompagnements", label: "Accompagnements" },
  { slug: "grillades", label: "Grillades" },
  { slug: "incontournables", label: "Incontournables" },
  { slug: "desserts", label: "Desserts" },
  { slug: "cocktails", label: "Cocktails" },
  { slug: "mocktails", label: "Mocktails" },
  { slug: "boissons-chaudes", label: "Boissons chaudes" },
  { slug: "boissons-alcoolisees", label: "Boissons alcoolisées" },
  { slug: "softs", label: "Softs" },
];

const menuImage = (slug: string) => `/images/menu/${slug}.jpg`;

export const MENU_ITEMS: MenuItem[] = [
  // Entrées
  {
    id: "entree-1",
    nom: "Alloco nature",
    slug: "alloco-nature",
    categorie: "entrees",
    description: "Bananes plantains mûres frites, dorées et légèrement caramélisées.",
    prix: 1500,
    image: menuImage("alloco-nature"),
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "entree-2",
    nom: "Accras de poisson",
    slug: "accras-de-poisson",
    categorie: "entrees",
    description: "Beignets moelleux de poisson émietté et épices, servis avec une sauce pimentée.",
    prix: 2000,
    image: menuImage("accras-de-poisson"),
    badges: ["Épicé", "Populaire"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "entree-3",
    nom: "Salade avocat-mangue",
    slug: "salade-avocat-mangue",
    categorie: "entrees",
    description: "Avocat mûr et mangue fraîche relevés d'une vinaigrette au citron vert.",
    prix: 2200,
    image: menuImage("salade-avocat-mangue"),
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "entree-4",
    nom: "Samoussas de bœuf",
    slug: "samoussas-de-boeuf",
    categorie: "entrees",
    description: "Petits chaussons croustillants farcis de bœuf épicé.",
    prix: 2000,
    image: menuImage("samoussas-de-boeuf"),
    badges: ["Épicé"],
    disponibilite: "disponible",
    recommandation: false,
  },

  // Sauces
  {
    id: "sauce-1",
    nom: "Sauce graine",
    slug: "sauce-graine",
    categorie: "sauces",
    description: "Sauce traditionnelle à base de noix de palme, mijotée avec viande ou poisson au choix.",
    prix: 3500,
    image: menuImage("sauce-graine"),
    badges: ["Populaire"],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "sauce-2",
    nom: "Sauce arachide",
    slug: "sauce-arachide",
    categorie: "sauces",
    description: "Sauce onctueuse à la pâte d'arachide, parfumée aux épices ivoiriennes.",
    prix: 3500,
    image: menuImage("sauce-arachide"),
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "sauce-3",
    nom: "Sauce claire",
    slug: "sauce-claire",
    categorie: "sauces",
    description: "Sauce légère aux feuilles vertes, mijotée à l'ivoirienne.",
    prix: 3000,
    image: menuImage("sauce-claire"),
    badges: ["Épicé"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "sauce-4",
    nom: "Sauce gombo",
    slug: "sauce-gombo",
    categorie: "sauces",
    description: "Sauce gombo relevée, mijotée avec viande fumée ou poisson.",
    prix: 3200,
    image: menuImage("sauce-gombo"),
    badges: ["Épicé"],
    disponibilite: "disponible",
    recommandation: false,
  },

  // Accompagnements
  {
    id: "accompagnement-1",
    nom: "Attiéké",
    slug: "attieke",
    categorie: "accompagnements",
    description: "Semoule de manioc fermentée, légère et parfumée.",
    prix: 1000,
    image: menuImage("attieke"),
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "accompagnement-2",
    nom: "Foutou banane",
    slug: "foutou-banane",
    categorie: "accompagnements",
    description: "Pâte de banane plantain pilée, à déguster avec une sauce.",
    prix: 1200,
    image: menuImage("foutou-banane"),
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "accompagnement-3",
    nom: "Riz blanc",
    slug: "riz-blanc",
    categorie: "accompagnements",
    description: "Riz parfumé cuit à la vapeur.",
    prix: 800,
    image: menuImage("riz-blanc"),
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "accompagnement-4",
    nom: "Igname pilée",
    slug: "igname-pilee",
    categorie: "accompagnements",
    description: "Igname pilée à la texture fondante.",
    prix: 1200,
    image: menuImage("igname-pilee"),
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: false,
  },

  // Grillades
  {
    id: "grillade-1",
    nom: "Poulet braisé",
    slug: "poulet-braise",
    categorie: "grillades",
    description: "Poulet mariné aux épices et grillé au charbon de bois.",
    prix: 4000,
    image: menuImage("poulet-braise"),
    badges: ["Populaire"],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "grillade-2",
    nom: "Capitaine braisé",
    slug: "capitaine-braise",
    categorie: "grillades",
    description: "Poisson capitaine grillé, mariné aux épices maison.",
    prix: 5500,
    image: menuImage("capitaine-braise"),
    badges: ["Populaire"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "grillade-3",
    nom: "Brochettes de bœuf",
    slug: "brochettes-de-boeuf",
    categorie: "grillades",
    description: "Brochettes de bœuf marinées, grillées à la braise.",
    prix: 3800,
    image: menuImage("brochettes-de-boeuf"),
    badges: ["Épicé"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "grillade-4",
    nom: "Alloco poulet fumé",
    slug: "alloco-poulet-fume",
    categorie: "grillades",
    description: "Alloco accompagné de morceaux de poulet fumé grillé.",
    prix: 4200,
    image: menuImage("alloco-poulet-fume"),
    badges: ["Sur commande"],
    disponibilite: "sur_commande",
    recommandation: false,
  },

  // Incontournables (identiques aux meilleures ventes de la page d'accueil)
  {
    id: "incontournable-1",
    nom: "Garba",
    slug: "garba",
    categorie: "incontournables",
    description: "Thon frit et attiéké parfumé, servi avec notre sauce tomate maison et légumes frais.",
    prix: 2500,
    image: "/images/plat-garba.jpg",
    badges: ["Populaire"],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "incontournable-2",
    nom: "Kédjénou de poulet",
    slug: "kedjenou-poulet",
    categorie: "incontournables",
    description: "Poulet mijoté lentement à l'étouffée avec légumes et épices, selon la tradition ivoirienne.",
    prix: 4500,
    image: "/images/plat-kedjenou.jpg",
    badges: ["Populaire"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "incontournable-3",
    nom: "Poisson braisé",
    slug: "poisson-braise",
    categorie: "incontournables",
    description: "Poisson braisé à la braise, accompagné d'attiéké et d'une sauce piquante maison.",
    prix: 5000,
    image: "/images/plat-poisson-braise.jpg",
    badges: ["Épicé", "Populaire"],
    disponibilite: "disponible",
    recommandation: false,
  },

  // Desserts
  {
    id: "dessert-1",
    nom: "Beignets sucrés",
    slug: "beignets-sucres",
    categorie: "desserts",
    description: "Petits beignets moelleux sucrés, parfumés à la vanille.",
    prix: 1500,
    image: menuImage("beignets-sucres"),
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "dessert-2",
    nom: "Salade de fruits tropicaux",
    slug: "salade-fruits-tropicaux",
    categorie: "desserts",
    description: "Ananas, mangue, papaye et banane frais.",
    prix: 1800,
    image: menuImage("salade-fruits-tropicaux"),
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "dessert-3",
    nom: "Gâteau à la banane",
    slug: "gateau-banane",
    categorie: "desserts",
    description: "Gâteau moelleux à la banane plantain.",
    prix: 2000,
    image: menuImage("gateau-banane"),
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: false,
  },

  // Cocktails
  {
    id: "cocktail-1",
    nom: "Ti'Punch ivoirien",
    slug: "ti-punch-ivoirien",
    categorie: "cocktails",
    description: "Rhum, citron vert et sucre de canne, servi frais.",
    prix: 3500,
    image: menuImage("ti-punch-ivoirien"),
    badges: ["Populaire"],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "cocktail-2",
    nom: "Passion Punch",
    slug: "passion-punch",
    categorie: "cocktails",
    description: "Rhum, jus de fruit de la passion et sirop de canne.",
    prix: 3800,
    image: menuImage("passion-punch"),
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "cocktail-3",
    nom: "Bissap Cocktail",
    slug: "bissap-cocktail",
    categorie: "cocktails",
    description: "Rhum arrangé à l'hibiscus et gingembre.",
    prix: 3800,
    image: menuImage("bissap-cocktail"),
    badges: ["Épicé"],
    disponibilite: "disponible",
    recommandation: false,
  },

  // Mocktails
  {
    id: "mocktail-1",
    nom: "Bissap glacé",
    slug: "bissap-glace",
    categorie: "mocktails",
    description: "Infusion d'hibiscus fraîche, légèrement sucrée.",
    prix: 1800,
    image: menuImage("bissap-glace"),
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "mocktail-2",
    nom: "Gingembre Fizz",
    slug: "gingembre-fizz",
    categorie: "mocktails",
    description: "Jus de gingembre pétillant et citron vert.",
    prix: 2000,
    image: menuImage("gingembre-fizz"),
    badges: ["Épicé"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "mocktail-3",
    nom: "Ananas-Menthe",
    slug: "ananas-menthe",
    categorie: "mocktails",
    description: "Jus d'ananas frais et feuilles de menthe.",
    prix: 2000,
    image: menuImage("ananas-menthe"),
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: false,
  },

  // Boissons chaudes
  {
    id: "boisson-chaude-1",
    nom: "Café ivoirien",
    slug: "cafe-ivoirien",
    categorie: "boissons-chaudes",
    description: "Café noir infusé, servi chaud.",
    prix: 1200,
    image: menuImage("cafe-ivoirien"),
    badges: [],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "boisson-chaude-2",
    nom: "Thé au gingembre",
    slug: "the-gingembre",
    categorie: "boissons-chaudes",
    description: "Infusion chaude de gingembre frais.",
    prix: 1200,
    image: menuImage("the-gingembre"),
    badges: ["Épicé"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "boisson-chaude-3",
    nom: "Chocolat chaud",
    slug: "chocolat-chaud",
    categorie: "boissons-chaudes",
    description: "Chocolat chaud onctueux.",
    prix: 1500,
    image: menuImage("chocolat-chaud"),
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: false,
  },

  // Boissons alcoolisées
  {
    id: "boisson-alcoolisee-1",
    nom: "Bandji (vin de palme)",
    slug: "bandji",
    categorie: "boissons-alcoolisees",
    description: "Vin de palme traditionnel, servi frais.",
    prix: 2000,
    image: menuImage("bandji"),
    badges: ["Sur commande"],
    disponibilite: "sur_commande",
    recommandation: true,
  },
  {
    id: "boisson-alcoolisee-2",
    nom: "Bière locale",
    slug: "biere-locale",
    categorie: "boissons-alcoolisees",
    description: "Bière blonde locale servie fraîche.",
    prix: 1500,
    image: menuImage("biere-locale"),
    badges: ["Populaire"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "boisson-alcoolisee-3",
    nom: "Vin rouge (verre)",
    slug: "vin-rouge",
    categorie: "boissons-alcoolisees",
    description: "Sélection de vin rouge, servi au verre.",
    prix: 2500,
    image: menuImage("vin-rouge"),
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },

  // Softs
  {
    id: "soft-1",
    nom: "Jus de bissap",
    slug: "jus-bissap",
    categorie: "softs",
    description: "Jus d'hibiscus maison, sucré ou nature.",
    prix: 1200,
    image: menuImage("jus-bissap"),
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "soft-2",
    nom: "Jus de gingembre",
    slug: "jus-gingembre",
    categorie: "softs",
    description: "Jus de gingembre frais et pimenté.",
    prix: 1200,
    image: menuImage("jus-gingembre"),
    badges: ["Épicé"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "soft-3",
    nom: "Eau minérale",
    slug: "eau-minerale",
    categorie: "softs",
    description: "Eau minérale plate ou gazeuse.",
    prix: 800,
    image: menuImage("eau-minerale"),
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
];

export function getMenuItemsByCategory(categorie: MenuCategorySlug): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.categorie === categorie);
}
