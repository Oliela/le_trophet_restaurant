import { WhatsAppIcon } from "@/components/icons/Icons";
import { SITE } from "@/lib/data";

export function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter avec Le Trophée sur WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-olive text-ivoire shadow-card transition-transform hover:scale-105 lg:hidden"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
