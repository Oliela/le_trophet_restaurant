import { SITE } from "@/lib/site.config";

export type ReservationEspace = "interieur" | "exterieur";

export type ReservationOccasion =
  | "table"
  | "anniversaire"
  | "groupe"
  | "autre";

export type ReservationPayload = {
  nom: string;
  telephone: string;
  email?: string;
  date: string;
  heure: string;
  personnes: number;
  espace: ReservationEspace;
  occasion: ReservationOccasion;
  autrePrecision?: string;
  message?: string;
  politiqueAcceptee: boolean;
};

export type ReservationResult =
  | {
      success: true;
      whatsappUrl: string;
    }
  | {
      success: false;
      error: string;
    };

const OCCASION_LABELS: Record<ReservationOccasion, string> = {
  table: "Réservation de table",
  anniversaire: "Anniversaire",
  groupe: "Réservation de groupe",
  autre: "Autre demande",
};

function formatReservationDate(value: string) {
  const date = new Date(`${value}T12:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("fr-SN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Dakar",
  }).format(date);
}

function formatReservationTime(value: string) {
  const [hours, minutes] = value.split(":");

  return minutes === "00"
    ? `${hours}h`
    : `${hours}h${minutes}`;
}

export async function submitReservation(
  payload: ReservationPayload,
): Promise<ReservationResult> {
  if (!payload.politiqueAcceptee) {
    return {
      success: false,
      error:
        "Merci d’accepter la politique de confidentialité.",
    };
  }

  if (
    payload.occasion === "autre" &&
    !payload.autrePrecision?.trim()
  ) {
    return {
      success: false,
      error: "Merci de préciser votre demande.",
    };
  }

  const lines = [
    "🍽️ *Nouvelle demande de réservation — Le Trofet*",
    "",
    `*Nom :* ${payload.nom}`,
    `*Téléphone :* ${payload.telephone}`,
    payload.email ? `*E-mail :* ${payload.email}` : null,
    `*Type :* ${OCCASION_LABELS[payload.occasion]}`,
    payload.occasion === "autre" && payload.autrePrecision
      ? `*Précision :* ${payload.autrePrecision}`
      : null,
    `*Date :* ${formatReservationDate(payload.date)}`,
    `*Heure :* ${formatReservationTime(payload.heure)}`,
    `*Nombre de personnes :* ${payload.personnes}`,
    `*Espace souhaité :* ${
      payload.espace === "interieur"
        ? "Intérieur"
        : "Extérieur"
    }`,
    payload.message
      ? `*Message :* ${payload.message}`
      : null,
    "",
    "_Cette demande reste à confirmer par le restaurant._",
  ].filter((line): line is string => line !== null);

  const whatsappUrl = new URL(SITE.whatsapp);
  whatsappUrl.searchParams.set("text", lines.join("\n"));

  return {
    success: true,
    whatsappUrl: whatsappUrl.toString(),
  };
}