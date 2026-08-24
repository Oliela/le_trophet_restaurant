import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SITE } from "@/lib/data";

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

export const metadata: Metadata = {
  title: `${SITE.name} — Restaurant ivoirien à Dakar`,
  description:
    "Le Trophée, restaurant ivoirien à Dakar : cuisine authentique, ambiance chaleureuse, plats à partir de 2 500 F CFA. Sur place, à emporter, livraison, karaoké et jeux de société.",
  keywords: [
    "restaurant ivoirien Dakar",
    "cuisine ivoirienne Sénégal",
    "garba Dakar",
    "attiéké Dakar",
    "restaurant africain Dakar",
  ],
  openGraph: {
    title: `${SITE.name} — Restaurant ivoirien à Dakar`,
    description:
      "Cuisine ivoirienne authentique, ambiance chaleureuse et conviviale. Plats à partir de 2 500 F CFA.",
    locale: "fr_SN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body>
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
