import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SITE } from "@/lib/data";
import { buildMetadata, buildRestaurantJsonLd } from "@/lib/seo";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const homeTitle = `${SITE.name} — Restaurant ivoirien à Dakar`;
const homeMetadata = buildMetadata({
  title: "Restaurant ivoirien à Dakar",
  description: SITE.description,
  path: "/",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  ...homeMetadata,
  // Cas particulier de l'accueil : le nom du restaurant passe en tête
  // (au lieu du format "Page — Le Trophée" utilisé sur les autres pages).
  title: homeTitle,
  openGraph: { ...homeMetadata.openGraph, title: homeTitle },
  twitter: { ...homeMetadata.twitter, title: homeTitle },
  keywords: [
    "restaurant ivoirien Dakar",
    "cuisine ivoirienne Sénégal",
    "garba Dakar",
    "attiéké Dakar",
    "restaurant africain Dakar",
  ],
};

const restaurantJsonLd = buildRestaurantJsonLd();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <a
          href="#contenu-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-terracotta focus:px-5 focus:py-3 focus:text-ivoire"
        >
          Aller au contenu principal
        </a>
        <Header />
        <main id="contenu-principal">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
