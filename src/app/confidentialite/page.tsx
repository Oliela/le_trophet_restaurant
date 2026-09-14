import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { SITE } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description: `Politique de confidentialité et protection des données du restaurant ${SITE.name}.`,
  path: "/confidentialite",
});

const sectionClass = "space-y-3";
const titleClass = "font-display text-2xl font-semibold text-brun";
const linkClass = "font-medium text-terracotta underline underline-offset-4 hover:text-brun";

export default function ConfidentialitePage() {
  return (
    <>
      <PageIntro
        eyebrow="Vos données"
        title="Politique de confidentialité"
        text={`Découvrez comment ${SITE.name} utilise et protège les informations transmises sur ce site.`}
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl space-y-10 text-base leading-8 text-grisbrun">
          <p className="rounded-2xl bg-sable/40 px-6 py-5 text-sm">
            Dernière mise à jour : 14 septembre 2026
          </p>

          <div className={sectionClass}>
            <h2 className={titleClass}>1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement est {SITE.legalName}, situé au {SITE.address}.
              Pour toute question concernant vos données personnelles, écrivez à{" "}
              <a className={linkClass} href={`mailto:${SITE.email}`}>{SITE.email}</a>{" "}
              ou contactez-nous au {SITE.phone}.
            </p>
          </div>

          <div className={sectionClass}>
            <h2 className={titleClass}>2. Données collectées</h2>
            <p>Selon les services que vous utilisez, nous pouvons traiter :</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>pour une réservation : nom, téléphone, e-mail facultatif, date, heure, nombre de personnes, espace souhaité, occasion et message libre ;</li>
              <li>pour un sondage d’événement : réponse, nom lorsque la réponse est positive, numéro WhatsApp et date de participation choisie ;</li>
              <li>les informations techniques indispensables au fonctionnement et à la sécurité du site, comme les journaux d’erreurs et l’adresse IP traités par l’hébergeur.</li>
            </ul>
            <p>N’inscrivez pas d’informations sensibles dans les champs de texte libre.</p>
          </div>

          <div className={sectionClass}>
            <h2 className={titleClass}>3. Finalités et fondement</h2>
            <p>Ces informations servent uniquement à :</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>préparer, confirmer et gérer votre demande de réservation ;</li>
              <li>organiser les événements et comptabiliser une seule réponse par participant ;</li>
              <li>répondre à vos demandes et prévenir les abus ;</li>
              <li>assurer le fonctionnement et la sécurité du site.</li>
            </ul>
            <p>Le traitement repose sur votre demande, votre consentement lorsqu’il est demandé, et l’intérêt légitime du restaurant à sécuriser ses services.</p>
          </div>

          <div className={sectionClass}>
            <h2 className={titleClass}>4. Réservations par WhatsApp</h2>
            <p>Le formulaire prépare un message et ouvre WhatsApp. Aucune réservation n’est confirmée automatiquement : vous choisissez d’envoyer le message depuis WhatsApp, puis l’équipe du restaurant vous répond. L’utilisation de WhatsApp est également soumise aux conditions et à la politique de confidentialité de ce service.</p>
          </div>

          <div className={sectionClass}>
            <h2 className={titleClass}>5. Destinataires et prestataires</h2>
            <p>Les données sont accessibles uniquement aux personnes autorisées de {SITE.name} et, dans la mesure nécessaire, à ses prestataires techniques : Vercel pour l’hébergement, Neon pour la base de données et Meta/WhatsApp lorsque vous envoyez une réservation. Ces prestataires peuvent traiter des données hors du Sénégal selon leurs propres garanties contractuelles.</p>
            <p>Nous ne vendons ni ne louons vos données personnelles.</p>
          </div>

          <div className={sectionClass}>
            <h2 className={titleClass}>6. Durée de conservation</h2>
            <p>Les informations sont conservées pendant la durée nécessaire au traitement de votre demande ou à l’organisation de l’événement, puis supprimées ou archivées pendant la durée exigée pour répondre aux obligations légales et régler d’éventuels litiges. Les journaux techniques sont conservés selon les durées appliquées par nos prestataires.</p>
          </div>

          <div className={sectionClass}>
            <h2 className={titleClass}>7. Cookies</h2>
            <p>Le site n’utilise pas de cookies publicitaires. Un cookie strictement nécessaire maintient la connexion des administrateurs. Les services externes intégrés, notamment Google Maps, peuvent appliquer leurs propres règles de confidentialité lorsque vous les utilisez.</p>
          </div>

          <div className={sectionClass}>
            <h2 className={titleClass}>8. Vos droits</h2>
            <p>Conformément à la réglementation sénégalaise sur les données personnelles, vous pouvez demander l’accès à vos données, leur rectification ou leur suppression, et vous opposer à certains traitements. Adressez votre demande à{" "}<a className={linkClass} href={`mailto:${SITE.email}`}>{SITE.email}</a>{" "}en précisant les informations permettant de vous identifier. Vous pouvez également vous renseigner auprès de la Commission de Protection des Données Personnelles du Sénégal.</p>
          </div>

          <div className={sectionClass}>
            <h2 className={titleClass}>9. Mise à jour de cette politique</h2>
            <p>Cette politique peut évoluer pour refléter les changements du site ou de la réglementation. La date affichée en haut indique sa dernière mise à jour. Consultez également les{" "}<Link className={linkClass} href="/mentions-legales">mentions légales</Link>.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
