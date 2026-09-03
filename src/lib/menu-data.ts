/** Carte du restaurant Le Trophée. */

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
  /** Regroupement visuel facultatif à l'intérieur d'une catégorie. */
  groupe?: string;
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

const platImage = (slug: string) => `/images/plats/${slug}.jpg`;
const boissonImage = (slug: string) => `/images/boissons/${slug}.jpg`;

export const MENU_ITEMS: MenuItem[] = [
  // Entrées
  {
    id: "entree-1",
    nom: "Nems de Treichville",
    slug: "nems-de-treichville",
    categorie: "entrees",
    description:
      "Chauds et croustillants, nos nems sont à la croisée de Hanoï et de Treichville pour bien démarrer le repas.",
    prix: 3000,
    image: "/images/plats/neems2.jpeg",
    badges: [],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "entree-2",
    nom: "Salade du Trophée",
    slug: "salade-du-trophee",
    categorie: "entrees",
    description:
      "Des légumes de saison frais et colorés, accompagnés d'œufs, pour commencer votre repas en toute légèreté.",
    prix: 3500,
    image: "/images/plats/Salade-catalane.jpg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "entree-3",
    nom: "Pastels de San-Pédro",
    slug: "pastels-de-san-pedro",
    categorie: "entrees",
    description:
      "Le délicieux thon ivoirien dans l'un des encas les plus emblématiques du Sénégal.",
    prix: 3000,
    image: "/images/plats/pastels-express.webp",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },

  // Sauces
  {
    id: "sauce-1",
    nom: "Sauce graine",
    slug: "sauce-graine",
    categorie: "sauces",
    description:
      "Un classique de la cuisine ivoirienne composé de graines de palme, de viande de bœuf et de poisson fumé. Idéal avec du foutou banane ou du riz.",
    prix: 6000,
    image: "/images/plats/La-sauce-graine-ivoirienne.jpg",
    badges: ["Populaire"],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "sauce-2",
    nom: "Kédjénou de poulet",
    slug: "kedjenou-de-poulet",
    categorie: "sauces",
    description:
      "Un incontournable de la cuisine ivoirienne à base de poulet cuit à l'étouffée avec des légumes frais et des épices. Savoureux et parfumé, il se déguste idéalement avec de l'attiéké ou du riz.",
    prix: 6500,
    image: "/images/plats/kedjenou de poulet.avif",
    badges: ["Épicé"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "sauce-3",
    nom: "Sauce claire",
    slug: "sauce-claire",
    categorie: "sauces",
    description:
      "Pilier de la cuisine ivoirienne, elle se caractérise par sa consistance fluide, obtenue à partir d'un bouillon de légumes mixés.",
    prix: 6000,
    image: "/images/plats/sauce_claire.jpeg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "sauce-4",
    nom: "Sauce gnangnan",
    slug: "sauce-gnangnan",
    categorie: "sauces",
    description:
      "Elle tire son nom du gnangnan, ou aubergine-pois, une petite aubergine sauvage réputée pour son goût amer caractéristique et ses vertus médicinales.",
    prix: 6000,
    image: "/images/plats/gnangnan.png",
    badges: ["Épicé"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "sauce-5",
    nom: "Sauce kopè",
    slug: "sauce-kope",
    categorie: "sauces",
    description:
      "Spécialité culinaire emblématique ivoirienne, cette sauce à la texture filante est préparée à base de gombo frais et d'huile de palme. Elle accompagne traditionnellement le placali ou le foutou.",
    prix: 6000,
    image: "/images/plats/kope.jpg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "sauce-6",
    nom: "Sauce pistache",
    slug: "sauce-pistache",
    categorie: "sauces",
    description:
      "Une sauce onctueuse à base de graines de pistache africaines, cuisinée avec du poulet ou du poisson. Riche et généreuse, elle se déguste parfaitement avec du foutou igname ou du riz.",
    prix: 6500,
    image: "/images/plats/pistache sauce.jpg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "sauce-7",
    nom: "Sauce djoumblé",
    slug: "sauce-djoumble",
    categorie: "sauces",
    description:
      "Particulièrement appréciée pour sa texture onctueuse et son goût fumé, elle est préparée à base de gombo sec réduit en poudre, ce qui lui confère une consistance veloutée unique, différente de la sauce au gombo frais.",
    prix: 6000,
    image: "/images/plats/sauce djoumble.jpg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "sauce-8",
    nom: "Sauce gouagouassou",
    slug: "sauce-gouagouassou",
    categorie: "sauces",
    description:
      "Le gombo et l'aubergine créent une association unique et savoureuse. Elle s'accompagne traditionnellement de foutou igname ou de riz.",
    prix: 6000,
    image: "/images/plats/Sauce gouagouassou.png",
    badges: ["Épicé"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "sauce-9",
    nom: "Pépé soupe",
    slug: "pepe-soupe",
    categorie: "sauces",
    description:
      "Un bouillon épicé et relevé à base de viande ou de poisson, typique de la cuisine ivoirienne. À savourer avec du riz ou de l'attiéké.",
    prix: 6000,
    image: "/images/plats/pepe soupe 1.jpg",
    badges: ["Épicé"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "sauce-10",
    nom: "Sauce feuille",
    slug: "sauce-feuille",
    categorie: "sauces",
    description:
      "Un savoureux mélange de feuilles de boro-boro et de pistache, relevé par une onctueuse huile de palme. Crevettes, crabes et viandes fondantes de bœuf et de mouton complètent cette recette authentique, à savourer avec du riz ou du foutou.",
    prix: 6000,
    image: "/images/plats/sauce feuille.jpeg",
    badges: [],
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
    prix: 1500,
    image: "/images/plats/attieke.jpg",
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "accompagnement-2",
    nom: "Igname frite",
    slug: "igname-frite",
    categorie: "accompagnements",
    description: "Morceaux d'igname dorés et croustillants.",
    prix: 1500,
    image: "/images/plats/igname frit.jpeg",
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
    prix: 1500,
    image: "/images/plats/riz.jpg",
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "accompagnement-4",
    nom: "Placali",
    slug: "placali",
    categorie: "accompagnements",
    description:
      "Pâte souple de manioc fermenté, idéale avec les sauces ivoiriennes.",
    prix: 1500,
    image: "/images/plats/placali.jpg",
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "accompagnement-5",
    nom: "Foutou banane",
    slug: "foutou-banane",
    categorie: "accompagnements",
    description: "Pâte de banane plantain pilée, à déguster avec une sauce.",
    prix: 1500,
    image: "/images/plats/foutou bananes.jpg",
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "accompagnement-6",
    nom: "Foutou igname",
    slug: "foutou-igname",
    categorie: "accompagnements",
    description:
      "Igname pilée jusqu'à l'obtention d'une pâte souple et fondante.",
    prix: 1500,
    image: "/images/plats/foutoui igname.jpg.webp",
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "accompagnement-7",
    nom: "Igname bouillie",
    slug: "igname-bouillie",
    categorie: "accompagnements",
    description: "Igname bouillie, tendre et naturellement savoureuse.",
    prix: 1500,
    image: "/images/plats/igname bouilli.jpg",
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "accompagnement-8",
    nom: "Frites",
    slug: "frites",
    categorie: "accompagnements",
    description: "Pommes de terre frites, dorées et croustillantes.",
    prix: 1500,
    image: "/images/plats/Frites-chtis.jpg",
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "accompagnement-9",
    nom: "Alloco",
    slug: "alloco",
    categorie: "accompagnements",
    description:
      "Bananes plantains mûres frites, dorées et légèrement caramélisées.",
    prix: 1500,
    image: "/images/plats/alloco-x.jpg",
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: false,
  },

  // Grillades
  {
    id: "grillade-1",
    nom: "Pêche du jour",
    slug: "peche-du-jour",
    categorie: "grillades",
    description:
      "Préparation : 45 min. Nous faisons le marché quotidiennement pour vous proposer des poissons frais de différentes tailles et variétés. Demandez conseil ! Prix selon la pêche : de 8 500 à 15 000 F CFA.",
    prix: 8500,
    image: "/images/plats/pechedujour1.jpg",
    badges: ["Sur commande"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "grillade-2",
    nom: "Poulet braisé",
    slug: "poulet-braise",
    categorie: "grillades",
    description:
      "Spécialité ivoirienne à partager, ou pas, selon votre appétit. Disponible en demi à 5 000 F CFA ou entier à 8 500 F CFA.",
    prix: 5000,
    image: "/images/plats/poulet braise.jpeg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "grillade-3",
    nom: "Côtelettes de porc",
    slug: "cotelettes-de-porc",
    categorie: "grillades",
    description:
      "Braisées lentement pour préserver tout le goût de la viande et des épices qui la subliment.",
    prix: 8500,
    image: "/images/plats/cotellette.webp",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "grillade-4",
    nom: "Brochettes de gambas",
    slug: "brochettes-de-gambas",
    categorie: "grillades",
    description:
      "Une cuisson maîtrisée et des condiments dont nous avons le secret font de nos brochettes un délice hors pair.",
    prix: 9000,
    image: "/images/plats/gambas brochettes.jpg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "grillade-5",
    nom: "Brochettes de filet de bœuf",
    slug: "brochettes-de-filet-de-boeuf",
    categorie: "grillades",
    description:
      "Tendres à souhait et assaisonnées à l'ivoirienne pour ravir vos papilles. À accompagner d'igname frite ou de frites.",
    prix: 8500,
    image: "/images/plats/brochette_filet_boeuf.jpeg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "grillade-6",
    nom: "Gambas pili-pili",
    slug: "gambas-pili-pili",
    categorie: "grillades",
    description:
      "Grillées puis sautées dans une sauce pili-pili légèrement épicée. Elles se marient très bien avec du riz blanc.",
    prix: 9000,
    image: "/images/plats/pili_pili_gambas.jpg",
    badges: ["Épicé"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "grillade-7",
    nom: "Brochettes de porc",
    slug: "brochettes-de-porc",
    categorie: "grillades",
    description:
      "Cuites à la perfection sur la braise pour conserver toute la saveur du porc. À déguster avec de l'alloco et/ou de l'attiéké.",
    prix: 7000,
    image: "/images/plats/brochette_porc.jpg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "grillade-8",
    nom: "Choukouya mix",
    slug: "choukouya-mix",
    categorie: "grillades",
    description:
      "Quand on hésite trop entre l'agneau et le poulet, on prend les deux.",
    prix: 10000,
    image: "/images/plats/choukou.jpeg",
    badges: ["Populaire"],
    disponibilite: "disponible",
    recommandation: true,
  },

  // Incontournables (identiques aux meilleures ventes de la page d'accueil)
  {
    id: "incontournable-1",
    nom: "Garba",
    slug: "garba",
    categorie: "incontournables",
    description:
      "Des ports de Côte d'Ivoire à votre assiette au Point E, il n'y a que quelques minutes.",
    prix: 2500,
    image: "/images/plats/garba.jpeg",
    badges: ["Populaire"],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "incontournable-2",
    nom: "Pain brochettes",
    slug: "pain-brochettes",
    categorie: "incontournables",
    description:
      "Le sandwich ivoirien par excellence. Ici, on sait d'où vient la viande tout en conservant l'authenticité de la rue. Frites incluses.",
    prix: 4000,
    image: "/images/plats/painbrochette.png",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "incontournable-3",
    nom: "Alloco-œuf",
    slug: "alloco-oeuf",
    categorie: "incontournables",
    description:
      "La formule simple et efficace, mais tout aussi gourmande, avec une petite sauce tomate pour relever le tout.",
    prix: 4000,
    image: "/images/plats/alloco-oeuf.jpg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },

  // Desserts
  {
    id: "dessert-1",
    nom: "Dessert du jour",
    slug: "dessert-du-jour",
    categorie: "desserts",
    description:
      "Une douceur au cacao ivoirien dont vous ne laisserez pas une miette.",
    prix: 2000,
    image: "/images/plats/dessertjour.png",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "dessert-2",
    nom: "Assiette ou salade de fruits",
    slug: "assiette-salade-de-fruits",
    categorie: "desserts",
    description:
      "La composition de fruits frais de saison idéale pour finir le repas en couleurs et en légèreté.",
    prix: 2500,
    image: "/images/plats/saladefruits.jpeg",
    badges: ["Végétarien"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "dessert-3",
    nom: "Café ou thé gourmand",
    slug: "cafe-the-gourmand",
    categorie: "desserts",
    description:
      "Notre sélection de thés et de cafés locaux s'allie parfaitement à des desserts aux saveurs classiques ou locales pour terminer sur une bonne note.",
    prix: 5000,
    image: "/images/plats/cafe_gourmand.jpg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "dessert-4",
    nom: "Dêguê / Thiakry",
    slug: "degue-thiakry",
    categorie: "desserts",
    description:
      "Couscous de mil accompagné de lait caillé sucré et onctueux, pour une délicate touche de douceur.",
    prix: 2000,
    image: "/images/plats/thiakry.jpg",
    badges: ["Populaire"],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "dessert-5",
    nom: "Boule de glace",
    slug: "boule-de-glace",
    categorie: "desserts",
    description:
      "Onctueuse et délicieusement glacée. Notre équipe vous présentera les saveurs disponibles.",
    prix: 2500,
    image: "/images/plats/creme-glace-vanille.jpg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },

  // Cocktails
  {
    id: "cocktail-1",
    nom: "Yakro Sour",
    slug: "yakro-sour",
    categorie: "cocktails",
    description: "Whisky, citron, miel et petit kola.",
    prix: 6000,
    image: "/images/plats/boissons/yakrosour.jpeg",
    badges: ["Populaire"],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "cocktail-2",
    nom: "Abidjan Mule",
    slug: "abidjan-mule",
    categorie: "cocktails",
    description: "Koutoukou, ginger tonic et fruit de la passion.",
    prix: 6000,
    image: "/images/plats/boissons/abidjan_mule.jpeg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "cocktail-3",
    nom: "Issia'Ya",
    slug: "issiaya",
    categorie: "cocktails",
    description: "Tequila, citron et sirop de bougainvillier.",
    prix: 6000,
    image: "/images/plats/boissons/issiaya.jpeg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "cocktail-4",
    nom: "Coco-Divo",
    slug: "coco-divo",
    categorie: "cocktails",
    description: "Punch coco, ananas et baobab.",
    prix: 6000,
    image: "/images/plats/boissons/coco_divo.jpeg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },

  // Mocktails
  {
    id: "mocktail-1",
    nom: "Grand-Bassam",
    slug: "grand-bassam",
    categorie: "mocktails",
    description: "Limonade, sirop de curaçao, menthe et citron.",
    prix: 5000,
    image: "/images/plats/boissons/grandbass.jpeg",
    badges: ["Populaire"],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "mocktail-2",
    nom: "Binger-Vié",
    slug: "binger-vie",
    categorie: "mocktails",
    description: "Pamplemousse, eau gazeuse, gingembre et tamarin.",
    prix: 5000,
    image: "/images/plats/boissons/Bingervie.jpeg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "mocktail-3",
    nom: "La'Kota",
    slug: "la-kota",
    categorie: "mocktails",
    description: "Mangue, kokota et sirop de piment.",
    prix: 5000,
    image: "/images/plats/boissons/lakota.jpeg",
    badges: ["Épicé"],
    disponibilite: "disponible",
    recommandation: false,
  },
  {
    id: "mocktail-4",
    nom: "Aboizo",
    slug: "aboizo",
    categorie: "mocktails",
    description: "Bissap tonic et fruits rouges.",
    prix: 5000,
    image: "/images/plats/boissons/aboizo.jpeg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },

  // Boissons chaudes
  {
    id: "boisson-chaude-1",
    nom: "Café",
    slug: "cafe",
    categorie: "boissons-chaudes",
    description:
      "Saveurs au choix : vanille, cannelle, coco, Touba, lait ou anis étoilé.",
    prix: 1500,
    image: "/images/plats/boissons/expresso.jpg",
    badges: [],
    disponibilite: "disponible",
    recommandation: true,
  },
  {
    id: "boisson-chaude-2",
    nom: "Thé",
    slug: "the",
    categorie: "boissons-chaudes",
    description: "Saveurs au choix : menthe, citron, bissap ou citronnelle.",
    prix: 1500,
    image: "/images/plats/boissons/softs/the.jpg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
  },

  // Boissons alcoolisées
  {
    id: "boisson-alcoolisee-1",
    nom: "Heineken",
    slug: "heineken",
    categorie: "boissons-alcoolisees",
    description: "Bière servie fraîche.",
    prix: 2500,
    image: "/images/plats/boissons/heineken_original.jpeg",
    badges: [],
    disponibilite: "disponible",
    recommandation: true,
    groupe: "Bières",
  },
  {
    id: "boisson-alcoolisee-2",
    nom: "Desperados",
    slug: "desperados",
    categorie: "boissons-alcoolisees",
    description: "Bière blonde locale servie fraîche.",
    prix: 2500,
    image: "/images/plats/boissons/desperdos.jpeg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
    groupe: "Bières",
  },
  {
    id: "boisson-alcoolisee-3",
    nom: "Gazelle",
    slug: "gazelle",
    categorie: "boissons-alcoolisees",
    description: "Bière servie fraîche.",
    prix: 2000,
    image: boissonImage("biere-locale"),
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
    groupe: "Bières",
  },
  {
    id: "boisson-alcoolisee-4",
    nom: "33 Export",
    slug: "33-export",
    categorie: "boissons-alcoolisees",
    description: "Bière servie fraîche.",
    prix: 1500,
    image: boissonImage("biere-locale"),
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
    groupe: "Bières",
  },
  {
    id: "boisson-alcoolisee-5",
    nom: "Flag",
    slug: "flag",
    categorie: "boissons-alcoolisees",
    description: "Bière servie fraîche.",
    prix: 2000,
    image: boissonImage("biere-locale"),
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
    groupe: "Bières",
  },
  {
    id: "boisson-alcoolisee-6",
    nom: "Royal Dutch",
    slug: "royal-dutch",
    categorie: "boissons-alcoolisees",
    description: "Bière servie fraîche.",
    prix: 1000,
    image: boissonImage("biere-locale"),
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
    groupe: "Bières",
  },
  {
    id: "boisson-alcoolisee-7",
    nom: "Cody's",
    slug: "codys",
    categorie: "boissons-alcoolisees",
    description: "Boisson maltée servie fraîche.",
    prix: 1000,
    image: boissonImage("biere-locale"),
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
    groupe: "Bières",
  },
  {
    id: "boisson-alcoolisee-8",
    nom: "Sagres Citron",
    slug: "sagres-citron",
    categorie: "boissons-alcoolisees",
    description: "Bière aromatisée au citron, servie fraîche.",
    prix: 1000,
    image: boissonImage("biere-locale"),
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
    groupe: "Bières",
  },

  ...[
    "Bordeaux",
    "Chardonnay",
    "Rosé d'Anjou",
    "Merlot",
    "Chablis",
    "Côtes de Provence",
  ].map(
    (nom, index): MenuItem => ({
      id: `vin-${index + 1}`,
      nom,
      slug: nom
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-"),
      categorie: "boissons-alcoolisees",
      description: "3 500 F CFA le ballon ou 15 000 F CFA la bouteille.",
      prix: 3500,
      image: "/images/boissons/categories/vins.jpg",
      badges: [],
      disponibilite: "disponible",
      recommandation: false,
      groupe: "Vins",
    }),
  ),

  ...["Martini", "Ricard", "Absolut", "Jelzin", "Gordon's", "Bacardi"].map(
    (nom, index): MenuItem => ({
      id: `liqueur-${index + 1}`,
      nom,
      slug: `liqueur-${index + 1}`,
      categorie: "boissons-alcoolisees",
      description: "Servi au verre.",
      prix: 4000,
      image: "/images/boissons/categories/liqueurs.jpg",
      badges: [],
      disponibilite: "disponible",
      recommandation: false,
      groupe: "Liqueurs",
    }),
  ),

  {
    id: "shot-1",
    nom: "Tequila Paf",
    slug: "tequila-paf",
    categorie: "boissons-alcoolisees",
    description: "Tequila, citron et sel.",
    prix: 1500,
    image: "/images/boissons/categories/shots.jpg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
    groupe: "Shots",
  },
  {
    id: "shot-2",
    nom: "Assinie Mafia",
    slug: "assinie-mafia",
    categorie: "boissons-alcoolisees",
    description: "Rhum, liqueur de passion et grenadine.",
    prix: 1500,
    image: "/images/boissons/categories/shots.jpg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
    groupe: "Shots",
  },
  {
    id: "shot-3",
    nom: "Yop'City",
    slug: "yop-city",
    categorie: "boissons-alcoolisees",
    description: "Liqueur de menthe, vodka et menthe.",
    prix: 1500,
    image: "/images/boissons/categories/shots.jpg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
    groupe: "Shots",
  },

  // Softs
  {
    id: "soft-1",
    nom: "Jus de mangue",
    slug: "jus-mangue",
    categorie: "softs",
    description: "Jus de fruits servi frais.",
    prix: 1500,
    image: "/images/plats/boissons/softs/mangue_juice.jpeg",
    badges: [],
    disponibilite: "disponible",
    recommandation: true,
    groupe: "Jus de fruits",
  },
  ...["Orange", "Ananas", "Bissap", "Gingembre", "Baobab"].map(
    (saveur, index): MenuItem => ({
      id: `jus-${index + 2}`,
      nom: `Jus de ${saveur.toLowerCase()}`,
      slug: `jus-${saveur.toLowerCase()}`,
      categorie: "softs",
      description: "Jus de fruits servi frais.",
      prix: 1500,
      image:
        saveur === "Bissap"
          ? "/images/plats/boissons/softs/jus_bissap.png"
          : saveur === "Gingembre"
            ? "/images/plats/boissons/softs/ginger-juice.jpg"
            : saveur === "Baobab"
              ? "/images/plats/boissons/softs/baobab.jpeg"
              : saveur === "Ananas"
                ? "/images/plats/boissons/softs/jus_ananas.jpg"
                : "/images/plats/boissons/softs/Jus_d_orange.jpeg",
      badges: [],
      disponibilite: "disponible",
      recommandation: false,
      groupe: "Jus de fruits",
    }),
  ),
  ...["Coca-Cola", "Fanta Orange", "Sprite"].map(
    (nom, index): MenuItem => ({
      id: `soda-${index + 1}`,
      nom,
      slug: `soda-${index + 1}`,
      categorie: "softs",
      description: "Soda servi frais.",
      prix: 1000,
      image:
        nom === "Coca-Cola"
          ? "/images/plats/boissons/softs/coca_cola.png"
          : nom === "Fanta Orange"
            ? "/images/plats/boissons/softs/fanta_orange.jpg"
            : "/images/plats/boissons/softs/sprite_33cl.jpg",
      badges: [],
      disponibilite: "disponible",
      recommandation: false,
      groupe: "Sodas",
    }),
  ),

  {
    id: "eau-1",
    nom: "Eau plate 1,5 L",
    slug: "eau-plate-1-5l",
    categorie: "softs",
    description: "Eau minérale plate.",
    prix: 1500,
    image: "/images/plats/boissons/softs/eau.jpg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
    groupe: "Eaux",
  },
  {
    id: "eau-2",
    nom: "Eau plate 50 cl",
    slug: "eau-plate-50cl",
    categorie: "softs",
    description: "Eau minérale plate.",
    prix: 1000,
    image: "/images/plats/boissons/softs/eau.jpg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
    groupe: "Eaux",
  },
  {
    id: "eau-3",
    nom: "Eau gazeuse",
    slug: "eau-gazeuse",
    categorie: "softs",
    description: "Eau minérale gazeuse.",
    prix: 2500,
    image: "/images/plats/boissons/softs/eau gazeuse.jpg",
    badges: [],
    disponibilite: "disponible",
    recommandation: false,
    groupe: "Eaux",
  },
];

export function getMenuItemsByCategory(
  categorie: MenuCategorySlug,
): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.categorie === categorie);
}
