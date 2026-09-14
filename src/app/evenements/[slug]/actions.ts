"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

const responseSchema = z.object({
  answer: z.enum(["YES", "NO"]),
  participantName: z.string().trim().max(100).optional(),
  whatsapp: z.string().trim().min(8).max(30),
});

export type PollState = {
  error?: string;
  success?: string;
};

function normalizeWhatsapp(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  // Numéro sénégalais saisi sans indicatif.
  if (digits.length === 9) {
    digits = `221${digits}`;
  }

  if (digits.length < 8 || digits.length > 15) {
    return null;
  }

  return `+${digits}`;
}

function occurrenceIsValid(
  event: {
    scheduleType: "ONE_DAY" | "DATE_RANGE" | "WEEKLY";
    startsAt: Date;
    endsAt: Date | null;
    recurrenceDay: number | null;
    recurrenceEndsAt: Date | null;
  },
  occurrence: Date,
) {
  if (Number.isNaN(occurrence.getTime())) {
    return false;
  }

  if (event.scheduleType !== "WEEKLY") {
    return occurrence.getTime() === event.startsAt.getTime();
  }

  const difference =
    occurrence.getTime() - event.startsAt.getTime();

  if (
    difference < 0 ||
    difference % WEEK_IN_MS !== 0 ||
    occurrence.getUTCDay() !== event.recurrenceDay
  ) {
    return false;
  }

  if (
    event.recurrenceEndsAt &&
    occurrence > event.recurrenceEndsAt
  ) {
    return false;
  }

  return occurrence >= new Date();
}

export async function submitPollResponse(
  eventId: string,
  occurrenceIso: string,
  _previousState: PollState,
  formData: FormData,
): Promise<PollState> {
  const result = responseSchema.safeParse({
    answer: formData.get("answer"),
    participantName:
      formData.get("participantName") || undefined,
    whatsapp: formData.get("whatsapp"),
  });

  if (!result.success) {
    return {
      error: "Veuillez vérifier les informations saisies.",
    };
  }

  if (
    result.data.answer === "YES" &&
    (!result.data.participantName ||
      result.data.participantName.length < 2)
  ) {
    return {
      error: "Votre nom est obligatoire pour une réponse Oui.",
    };
  }

  const whatsapp = normalizeWhatsapp(result.data.whatsapp);

  if (!whatsapp) {
    return {
      error: "Le numéro WhatsApp n’est pas valide.",
    };
  }

  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
      published: true,
      pollEnabled: true,
    },
    select: {
      id: true,
      slug: true,
      capacity: true,
      scheduleType: true,
      startsAt: true,
      endsAt: true,
      recurrenceDay: true,
      recurrenceEndsAt: true,
    },
  });

  if (!event) {
    return {
      error: "Ce sondage n’est pas disponible.",
    };
  }

  const occurrenceStartsAt = new Date(occurrenceIso);

  if (!occurrenceIsValid(event, occurrenceStartsAt)) {
    return {
      error: "La date choisie n’est pas valide.",
    };
  }

  if (
    result.data.answer === "YES" &&
    event.capacity !== null
  ) {
    const participantCount = await prisma.pollResponse.count({
      where: {
        eventId: event.id,
        occurrenceStartsAt,
        answer: "YES",
      },
    });

    if (participantCount >= event.capacity) {
      return {
        error: "Toutes les places disponibles ont été prises.",
      };
    }
  }

  try {
    await prisma.pollResponse.create({
      data: {
        eventId: event.id,
        occurrenceStartsAt,
        answer: result.data.answer,
        participantName:
          result.data.answer === "YES"
            ? result.data.participantName
            : null,
        whatsapp,
      },
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return {
        error:
          "Ce numéro WhatsApp a déjà répondu pour cette date.",
      };
    }

    return {
      error:
        "Votre réponse n’a pas pu être enregistrée. Réessayez.",
    };
  }

  revalidatePath(`/evenements/${event.slug}`);
  revalidatePath(`/admin/evenements/${event.id}`);
  revalidatePath("/admin");

  return {
    success: "Merci, votre réponse a bien été enregistrée.",
  };
}
