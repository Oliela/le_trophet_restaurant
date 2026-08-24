import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { ClockIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons/Icons";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact & réservation — Le Trophée",
  description:
    "Réservez votre table au restaurant Le Trophée à Dakar : adresse, téléphone, horaires et WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact & réservation"
        title="Une table vous attend"
        text="Appelez-nous, écrivez-nous sur WhatsApp ou remplissez le formulaire ci-dessous pour réserver votre table."
      />
      <section className="py-20">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-brun">
              Nos coordonnées
            </h2>
            <ul className="mt-6 space-y-5 text-sm text-grisbrun">
              <li className="flex gap-3">
                <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
                {SITE.address}
              </li>
              <li className="flex gap-3">
                <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-terracotta">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
                <span className="space-y-1">
                  {SITE.hours.map((h) => (
                    <span key={h.jours} className="block">
                      {h.jours} : {h.heures}
                    </span>
                  ))}
                </span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={`tel:${SITE.phone.replace(/\s/g, "")}`} variant="primary">
                <PhoneIcon className="h-4 w-4" /> Appeler
              </Button>
              <Button href={SITE.whatsapp} variant="outline">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </Button>
            </div>
          </div>

          <div className="card-surface rounded-3xl p-8">
            <h2 className="font-display text-2xl font-semibold text-brun">
              Demande de réservation
            </h2>
            <p className="mt-2 text-sm text-grisbrun">
              Formulaire temporaire — à connecter à votre outil de réservation.
            </p>
            <form className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-brun">
                  Nom complet
                  <input
                    type="text"
                    name="nom"
                    required
                    className="mt-1.5 w-full rounded-xl border border-brun/15 bg-ivoire px-4 py-2.5 text-sm text-brun outline-none focus:border-terracotta"
                  />
                </label>
                <label className="block text-sm font-medium text-brun">
                  Téléphone
                  <input
                    type="tel"
                    name="telephone"
                    required
                    className="mt-1.5 w-full rounded-xl border border-brun/15 bg-ivoire px-4 py-2.5 text-sm text-brun outline-none focus:border-terracotta"
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-brun">
                  Date souhaitée
                  <input
                    type="date"
                    name="date"
                    className="mt-1.5 w-full rounded-xl border border-brun/15 bg-ivoire px-4 py-2.5 text-sm text-brun outline-none focus:border-terracotta"
                  />
                </label>
                <label className="block text-sm font-medium text-brun">
                  Nombre de personnes
                  <input
                    type="number"
                    name="personnes"
                    min={1}
                    className="mt-1.5 w-full rounded-xl border border-brun/15 bg-ivoire px-4 py-2.5 text-sm text-brun outline-none focus:border-terracotta"
                  />
                </label>
              </div>
              <label className="block text-sm font-medium text-brun">
                Message
                <textarea
                  name="message"
                  rows={4}
                  className="mt-1.5 w-full rounded-xl border border-brun/15 bg-ivoire px-4 py-2.5 text-sm text-brun outline-none focus:border-terracotta"
                />
              </label>
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Envoyer la demande
              </button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
