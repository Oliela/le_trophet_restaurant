import type { Metadata } from "next";
import { LocationMap } from "@/components/contact/LocationMap";
import { ReservationForm } from "@/components/contact/ReservationForm";
import { WelcomeDoll } from "@/components/contact/WelcomeDoll";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons/Icons";
import { SITE, SOCIALS } from "@/lib/data";
import { UPCOMING_EVENTS } from "@/lib/events-data";
import type { ReservationOccasion } from "@/lib/reservation";

export const metadata: Metadata = {
  title: "Contact & Réservation — Le Trophée",
  description:
    "Réservez votre table au restaurant ivoirien Le Trophée à Dakar : adresse, téléphone, WhatsApp, horaires et formulaire de réservation.",
};

const SOCIAL_ICONS = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
  WhatsApp: WhatsAppIcon,
};

function buildPrefill(searchParams: { evenement?: string; occasion?: string }): {
  initialMessage?: string;
  initialOccasion?: ReservationOccasion;
} {
  if (searchParams.evenement) {
    const event = UPCOMING_EVENTS.find((item) => item.slug === searchParams.evenement);
    if (event) {
      return {
        initialMessage: `Je souhaite réserver pour : ${event.titre} (${event.dateLabel}).`,
        initialOccasion: event.slug === "anniversaire-evenement-prive" ? "anniversaire" : "autre",
      };
    }
  }
  if (searchParams.occasion === "evenement-prive") {
    return {
      initialMessage:
        "Je souhaite organiser un événement privé (anniversaire, repas de groupe ou rencontre professionnelle).",
      initialOccasion: "anniversaire",
    };
  }
  return {};
}

export default function ContactPage({
  searchParams,
}: {
  searchParams: { evenement?: string; occasion?: string };
}) {
  const prefill = buildPrefill(searchParams);

  return (
    <>
      <PageIntro
        eyebrow="Nous écrire"
        title="Contact & Réservation"
        text="Envie de partager un repas ivoirien dans une ambiance chaleureuse ? Réservez votre table en quelques instants ou contactez directement notre équipe."
      />

      <section className="py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div className="space-y-8">
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
                  <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-terracotta">
                    WhatsApp : {SITE.phoneDisplay}
                  </a>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-terracotta">
                    @
                  </span>
                  <a href={`mailto:${SITE.email}`} className="hover:text-terracotta">
                    {SITE.email}
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

              <div className="mt-6 flex items-center gap-3">
                {SOCIALS.map((social) => {
                  const Icon = SOCIAL_ICONS[social.label as keyof typeof SOCIAL_ICONS];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Le Trophée sur ${social.label}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-brun/15 text-grisbrun transition-colors hover:border-terracotta hover:text-terracotta"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={`tel:${SITE.phone.replace(/\s/g, "")}`} variant="primary">
                  Appeler le restaurant
                </Button>
                <Button href={SITE.whatsapp} variant="outline">
                  Écrire sur WhatsApp
                </Button>
              </div>
            </div>

            <WelcomeDoll />
          </div>

          <div className="card-surface rounded-3xl p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-brun">
              Demande de réservation
            </h2>
            <p className="mt-2 text-sm text-grisbrun">
              Remplissez ce formulaire, notre équipe vous recontactera pour
              confirmer votre table.
            </p>
            <div className="mt-6">
              <ReservationForm
                initialMessage={prefill.initialMessage}
                initialOccasion={prefill.initialOccasion}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-brun">Nous trouver</h2>
          <div className="mt-6">
            <LocationMap />
          </div>
        </Container>
      </section>
    </>
  );
}
