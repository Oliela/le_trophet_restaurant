import type { Event } from "@/generated/prisma/client";

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

type EventSchedule = Pick<
  Event,
  | "scheduleType"
  | "startsAt"
  | "endsAt"
  | "recurrenceEndsAt"
>;

export function getUpcomingOccurrences(
  event: EventSchedule,
  limit = 8,
  now = new Date(),
) {
  if (event.scheduleType !== "WEEKLY") {
    const eventEndsAt = event.endsAt ?? event.startsAt;

    return eventEndsAt >= now ? [new Date(event.startsAt)] : [];
  }

  let occurrence = new Date(event.startsAt);

  if (occurrence < now) {
    const elapsed = now.getTime() - occurrence.getTime();
    const weeksToAdd = Math.ceil(elapsed / WEEK_IN_MS);

    occurrence = new Date(
      occurrence.getTime() + weeksToAdd * WEEK_IN_MS,
    );
  }

  const occurrences: Date[] = [];

  while (occurrences.length < limit) {
    if (
      event.recurrenceEndsAt &&
      occurrence > event.recurrenceEndsAt
    ) {
      break;
    }

    occurrences.push(new Date(occurrence));
    occurrence = new Date(occurrence.getTime() + WEEK_IN_MS);
  }

  return occurrences;
}

export function formatOccurrenceChoice(date: Date) {
  return new Intl.DateTimeFormat("fr-SN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Africa/Dakar",
  }).format(date);
}