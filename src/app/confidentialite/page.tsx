import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { SITE } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description: `Politique de confidentialité et protection des données du restaurant ${SITE.name}.`,
  path: "/confidentialite",
});

export default function ConfidentialitePage() {
  return (
    <>
      <PageIntro
        eyebrow="Vos données"
        title="Politique de confidentialité"
        text="Contenu temporaire — à adapter avec votre politique réelle de traitement des données personnelles."
      />
      <section className="py-20">
        <Container className="prose max-w-3xl text-sm leading-relaxed text-grisbrun">
          <p>
            {SITE.name} peut collecter certaines données personnelles (nom, téléphone,
            e-mail) lors d’une demande de réservation via le formulaire de contact, dans le
            seul but de traiter votre demande.
          </p>
          <p>
            Ces données ne sont ni vendues ni transmises à des tiers à des fins
            commerciales. Vous pouvez demander leur suppression à tout moment en écrivant à{" "}
            {SITE.email}.
          </p>
          <p>Ce texte est un contenu temporaire à remplacer par votre politique officielle.</p>
        </Container>
      </section>
    </>
  );
}
