# Le Trophée — site vitrine

Site vitrine du restaurant ivoirien **Le Trophée**, à Dakar. Next.js (App Router) + TypeScript + Tailwind CSS.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
  app/                Pages (App Router) : accueil, carte, galerie, evenements, contact, mentions légales…
  components/
    layout/            Header, Footer, bouton WhatsApp
    sections/          Sections de la page d'accueil (Hero, BestSellers, About, Events…)
    ui/                Primitives réutilisables (Button, Container, SectionHeading, BogolanStrip…)
    icons/             Icônes SVG maison (aucune dépendance externe)
  lib/data.ts          Contenu du site (coordonnées, menu, événements…) — données temporaires à modifier
public/images/          Visuels du site
scripts/generate_placeholders.py  Script ayant généré les visuels temporaires
```

## Contenu et visuels temporaires à remplacer

Toutes les données de contact (adresse, téléphone, horaires, réseaux sociaux) sont centralisées dans
`src/lib/data.ts` — à mettre à jour avec les vraies informations du restaurant.

Les images du dossier `public/images/` sont des **visuels temporaires générés automatiquement**
(couleurs et formes de la charte graphique, sans photographie réelle). Elles portent les noms de
fichiers définitifs attendus par le design (`bogolan-texture.jpg`, `poupee-africaine-1.png`, etc.) :
il suffit de remplacer chaque fichier par la photographie réelle correspondante, en conservant le
même nom, pour que le site utilise les vraies photos sans modifier le code.

À remplacer en priorité :
- `hero-plat-ivoirien.jpg` — photo du plat vedette en bannière
- `plat-garba.jpg`, `plat-kedjenou.jpg`, `plat-poisson-braise.jpg` — plats incontournables
- `bogolan-texture.jpg` — vrai tissu bogolan du restaurant
- `poupee-africaine-1.png`, `-2.png`, `-3.png` — poupées africaines (idéalement détourées, fond transparent)
- `espace-interieur.jpg`, `espace-exterieur.jpg` — salle et terrasse
- `about-poupee.jpg` — poupée en situation dans le décor (section « Notre histoire »)
- `evenement-karaoke.jpg`, `evenement-jeux.jpg`, `evenement-prive.jpg`
- `logo.png` — logo définitif du restaurant

La carte de localisation dans le footer est un espace réservé : à remplacer par une intégration
Google Maps / OpenStreetMap.
