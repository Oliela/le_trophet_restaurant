import { Button } from "@/components/ui/Button";
import { SITE, getDirectionsUrl, getMapEmbedUrl } from "@/lib/data";

export function LocationMap() {
  const directionsUrl = getDirectionsUrl();

  return (
    <div className="overflow-hidden rounded-[2rem] border border-brun/10 shadow-card">
      <div className="h-72 w-full bg-ivoire-card sm:h-96">
        <iframe
          src={getMapEmbedUrl()}
          title={`Carte de localisation du restaurant Le Trophée, ${SITE.address}`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
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
