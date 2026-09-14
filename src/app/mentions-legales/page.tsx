import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { SITE } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: `Informations légales du restaurant ${SITE.name} à Dakar.`,
  path: "/mentions-legales",
});

const sectionClass = "space-y-3";
const titleClass = "font-display text-2xl font-semibold text-brun";
const linkClass = "font-medium text-terracotta underline underline-offset-4 hover:text-brun";

export default function MentionsLegalesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Informations légales"
        title="Mentions légales"
        text={`Informations relatives à l’éditeur et à l’hébergement du site ${SITE.name}.`}
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl space-y-10 text-base leading-8 text-grisbrun">
          <div className="rounded-2xl border border-ocre/30 bg-sable/40 px-6 py-5 text-sm">
            <strong className="text-brun">À compléter avant publication définitive :</strong>{" "}
            forme juridique, capital social le cas échéant, numéro NINEA, numéro RCCM et nom du directeur ou de la directrice de publication.
          </div>

          <div className={sectionClass}>
            <h2 className={titleClass}>1. Éditeur du site</h2>
            <dl className="grid gap-2 sm:grid-cols-[12rem_1fr]">
              <dt className="font-semibold text-brun">Nom commercial</dt><dd>{SITE.name}</dd>
              <dt className="font-semibold text-brun">Dénomination légale</dt><dd>{SITE.legalName}</dd>
              <dt className="font-semibold text-brun">Forme juridique</dt><dd>À compléter</dd>
              <dt className="font-semibold text-brun">NINEA / RCCM</dt><dd>À compléter</dd>
              <dt className="font-semibold text-brun">Adresse</dt><dd>{SITE.address}</dd>
              <dt className="font-semibold text-brun">Téléphone</dt><dd>{SITE.phone}</dd>
              <dt className="font-semibold text-brun">E-mail</dt><dd><a className={linkClass} href={`mailto:${SITE.email}`}>{SITE.email}</a></dd>
              <dt className="font-semibold text-brun">Direction de publication</dt><dd>À compléter</dd>
            </dl>
          </div>

          <div className={sectionClass}>
            <h2 className={titleClass}>2. Hébergement</h2>
            <p>Ce site est hébergé par :</p>
            <address className="not-italic">
              Vercel Inc.<br />
              440 N Barranca Avenue #4133<br />
              Covina, CA 91723, États-Unis<br />
              <a className={linkClass} href="https://vercel.com" target="_blank" rel="noreferrer">vercel.com</a>
            </address>
          </div>

          <div className={sectionClass}>
            <h2 className={titleClass}>3. Propriété intellectuelle</h2>
            <p>Les textes, photographies, illustrations, éléments graphiques, logos et autres contenus présents sur ce site sont protégés par les règles applicables à la propriété intellectuelle. Sauf autorisation écrite préalable, leur reproduction, modification, diffusion ou exploitation, totale ou partielle, est interdite.</p>
          </div>

          <div className={sectionClass}>
            <h2 className={titleClass}>4. Responsabilité</h2>
            <p>{SITE.name} veille à fournir des informations aussi exactes que possible. Les menus, prix, horaires, événements et disponibilités peuvent toutefois être modifiés. Une demande envoyée depuis le site ne constitue pas une réservation définitive avant sa confirmation par le restaurant.</p>
            <p>Le site peut contenir des liens vers des services tiers. {SITE.name} ne contrôle pas leur contenu, leur disponibilité ni leurs pratiques de confidentialité.</p>
          </div>

          <div className={sectionClass}>
            <h2 className={titleClass}>5. Données personnelles</h2>
            <p>Les règles relatives à la collecte et à l’utilisation des données personnelles sont détaillées dans notre{" "}<Link className={linkClass} href="/confidentialite">politique de confidentialité</Link>.</p>
          </div>

          <div className={sectionClass}>
            <h2 className={titleClass}>6. Contact</h2>
            <p>Pour signaler une erreur, demander une autorisation de reproduction ou poser une question sur le site, contactez-nous à{" "}<a className={linkClass} href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
