import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ClockIcon, UsersIcon } from "@/components/icons/Icons";
import type { EventItem } from "@/lib/events-data";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="card-surface flex flex-col overflow-hidden rounded-[2rem]">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={event.image}
          alt={event.titre}
          fill
          sizes="(min-width: 1024px) 33vw, 90vw"
          className="object-cover"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ocre px-3 py-1 text-xs font-bold uppercase tracking-wide text-brun">
          {event.tarif}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-2xl font-semibold text-brun">{event.titre}</h3>
        <p className="mt-2 text-sm font-semibold text-terracotta">{event.dateLabel}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-grisbrun">
          <span className="flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4 text-ocre" />
            {event.heure}
          </span>
          {event.places ? (
            <span className="flex items-center gap-1.5">
              <UsersIcon className="h-4 w-4 text-ocre" />
              {event.places}
            </span>
          ) : null}
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-grisbrun">{event.description}</p>
        <Button href={`/contact?evenement=${event.slug}`} variant="outline" className="mt-6 self-start">
          Réserver
        </Button>
      </div>
    </article>
  );
}
