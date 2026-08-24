import Image from "next/image";
import Link from "next/link";
import { BogolanDivider } from "@/components/ui/BogolanDivider";
import { Container } from "@/components/ui/Container";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons/Icons";
import { NAV_LINKS, SITE, SOCIALS, SPECIALITES_FOOTER } from "@/lib/data";

const SOCIAL_ICONS = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
  WhatsApp: WhatsAppIcon,
};

export function Footer() {
  return (
    <footer className="bg-brun text-ivoire/85">
      <BogolanDivider variant="bande" />
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Le Trophée"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="font-display text-xl font-semibold text-ivoire">
              {SITE.name}
            </span>
          </Link>
          <p className="mt-4 max-w-xs font-display text-lg italic text-ocre-light">
            « {SITE.tagline} »
          </p>
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
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ivoire/20 text-ivoire/80 transition-colors hover:border-ocre hover:text-ocre-light"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-ivoire">Navigation</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-ocre-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-ivoire">Nos spécialités</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {SPECIALITES_FOOTER.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-ivoire">Nous trouver</h3>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-ocre-light" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex gap-3">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-ocre-light" />
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-ocre-light">
                {SITE.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-ocre-light" />
              <span className="space-y-1">
                {SITE.hours.map((h) => (
                  <span key={h.jours} className="block">
                    {h.jours} : {h.heures}
                  </span>
                ))}
              </span>
            </li>
          </ul>

          <div
            role="img"
            aria-label="Carte de localisation temporaire du restaurant Le Trophée à Dakar"
            className="relative mt-5 h-28 w-full overflow-hidden rounded-xl border border-ivoire/15"
            style={{
              backgroundImage:
                "linear-gradient(rgba(211,155,58,0.12), rgba(211,155,58,0.12)), repeating-linear-gradient(0deg, rgba(255,249,240,0.06) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(255,249,240,0.06) 0 1px, transparent 1px 24px)",
            }}
          >
            <MapPinIcon className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-terracotta" />
            <span className="absolute bottom-1.5 right-2 text-[10px] uppercase tracking-wide text-ivoire/40">
              Carte à intégrer
            </span>
          </div>
        </div>
      </Container>

      <div className="border-t border-ivoire/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-ivoire/55 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-ocre-light">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-ocre-light">
              Politique de confidentialité
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
