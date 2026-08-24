import { Button } from "@/components/ui/Button";
import { MapPinIcon } from "@/components/icons/Icons";
import { SITE } from "@/lib/data";

export function LocationMap() {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    SITE.address
  )}`;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-brun/10 shadow-card">
      <div
        role="img"
        aria-label={`Carte de localisation temporaire du restaurant Le Trophée, ${SITE.address}`}
        className="relative flex h-72 w-full items-center justify-center sm:h-96"
        style={{
          backgroundColor: "#F0E0C7",
          backgroundImage:
            "linear-gradient(rgba(168,67,36,0.06), rgba(168,67,36,0.06)), repeating-linear-gradient(0deg, rgba(39,26,20,0.08) 0 1px, transparent 1px 32px), repeating-linear-gradient(90deg, rgba(39,26,20,0.08) 0 1px, transparent 1px 32px)",
        }}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <MapPinIcon className="h-9 w-9 text-terracotta" />
          <span className="rounded-full bg-brun/80 px-3 py-1 text-xs font-semibold text-ivoire">
            Carte à intégrer (Google Maps)
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-ivoire-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-grisbrun">{SITE.address}</p>
        <Button href={directionsUrl} variant="outline" className="shrink-0">
          Itinéraire
        </Button>
      </div>
    </div>
  );
}
