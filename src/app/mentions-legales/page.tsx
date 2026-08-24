import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mentions légales — Le Trophée",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Informations légales"
        title="Mentions légales"
        text="Informations d’identification de l’éditeur du site — contenu temporaire à finaliser avec vos données officielles."
      />
      <section className="py-20">
        <Container className="prose max-w-3xl text-sm leading-relaxed text-grisbrun">
          <p>
            <strong className="text-brun">Éditeur du site :</strong> {SITE.name}, restaurant
            situé au {SITE.address}.
          </p>
          <p>
            <strong className="text-brun">Contact :</strong> {SITE.phone} — {SITE.email}
          </p>
          <p>
            <strong className="text-brun">Hébergement :</strong> nom et coordonnées de
            l’hébergeur à compléter.
          </p>
          <p>
            Ce contenu est fourni à titre temporaire et doit être complété avec les
            informations juridiques exactes du restaurant avant la mise en ligne du site.
          </p>
        </Container>
      </section>
    </>
  );
}
