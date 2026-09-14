import type { Event } from "@/generated/prisma/client";

const WEEKDAYS = [
  "dimanches",
  "lundis",
  "mardis",
  "mercredis",
  "jeudis",
  "vendredis",
  "samedis",
];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-SN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Dakar",
  }).format(date);
}

function formatTime(date: Date) {
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return minutes === "00" ? `${hours}h` : `${hours}h${minutes}`;
}

export function formatEventPricing(pricingDetails: string | null) {
  const details = pricingDetails?.trim();

  if (!details) {
    return "Entrée libre";
  }

  if (
    /(?:\/|par)\s*personne/i.test(details) ||
    /entrée libre|gratuit|sur devis|obligatoire|minimum/i.test(details)
  ) {
    return details;
  }

  return `${details} / personne`;
}

export function formatEventSchedule(
  event: Pick<
    Event,
    | "scheduleType"
    | "startsAt"
    | "endsAt"
    | "recurrenceDay"
    | "recurrenceEndsAt"
  >,
) {
  if (event.scheduleType === "ONE_DAY") {
    if (event.endsAt) {
      return `${formatDate(event.startsAt)}, de ${formatTime(
        event.startsAt,
      )} à ${formatTime(event.endsAt)}`;
    }

    return `${formatDate(event.startsAt)}, à ${formatTime(
      event.startsAt,
    )}`;
  }

  if (event.scheduleType === "DATE_RANGE" && event.endsAt) {
    return `Du ${formatDate(event.startsAt)} à ${formatTime(
      event.startsAt,
    )} au ${formatDate(event.endsAt)} à ${formatTime(event.endsAt)}`;
  }

  if (
    event.scheduleType === "WEEKLY" &&
    event.recurrenceDay !== null
  ) {
    const recurrenceEnd = event.recurrenceEndsAt
      ? `, jusqu’au ${formatDate(event.recurrenceEndsAt)}`
      : "";

    if (event.endsAt) {
      return `Tous les ${
        WEEKDAYS[event.recurrenceDay]
      }, de ${formatTime(event.startsAt)} à ${formatTime(
        event.endsAt,
      )}${recurrenceEnd}`;
    }

    return `Tous les ${
      WEEKDAYS[event.recurrenceDay]
    }, à ${formatTime(event.startsAt)}${recurrenceEnd}`;
  }

  return formatDate(event.startsAt);
}
