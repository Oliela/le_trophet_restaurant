import Image from "next/image";
import type { Event } from "@/generated/prisma/client";
import { Button } from "@/components/ui/Button";
import { ClockIcon, UsersIcon } from "@/components/icons/Icons";
import { getEventImageUrl } from "@/lib/event-image";
import {
  formatEventPricing,
  formatEventSchedule,
} from "@/lib/event-schedule";

export function PublicEventCard({ event }: { event: Event }) {
  const image = getEventImageUrl(event.imageUrl);

  return (
    <article className="card-surface group flex h-full flex-col overflow-hidden rounded-[2rem]">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 33vw, 90vw"
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-ocre px-3 py-1 text-xs font-bold uppercase tracking-wide text-brun">
          {formatEventPricing(event.pricingDetails)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-2xl font-semibold text-brun">
          {event.title}
        </h3>

        <p className="mt-3 flex items-start gap-2 text-sm font-semibold text-terracotta">
          <ClockIcon className="mt-0.5 h-4 w-4 shrink-0" />
          {formatEventSchedule(event)}
        </p>

        {event.capacity !== null ? (
          <p className="mt-3 flex items-center gap-2 text-sm text-grisbrun">
            <UsersIcon className="h-4 w-4 text-ocre" />
            {event.capacity} places
          </p>
        ) : null}

        <p className="mt-4 line-clamp-4 flex-1 text-sm leading-relaxed text-grisbrun">
          {event.description}
        </p>

        <Button
          href={`/evenements/${event.slug}`}
          variant="outline"
          className="mt-6 self-start"
        >
          {event.pollEnabled
            ? "Répondre au sondage"
            : "Voir l’événement"}
        </Button>
      </div>
    </article>
  );
}
