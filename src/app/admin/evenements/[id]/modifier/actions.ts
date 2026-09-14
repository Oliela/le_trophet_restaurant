"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { del } from "@vercel/blob";
import { requireAdminSession } from "@/lib/auth";
import { isVercelBlobUrl } from "@/lib/event-image";
import { prisma } from "@/lib/prisma";

const eventSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(10).max(5000),
  pricingDetails: z.string().trim().max(150).optional(),
  scheduleType: z.enum(["ONE_DAY", "DATE_RANGE", "WEEKLY"]),
  startDate: z.string().date(),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endDate: z.string().optional(),
  endTime: z.string().optional(),
  recurrenceDay: z.string().optional(),
  recurrenceEndDate: z.string().optional(),
  capacity: z.preprocess(
    (value) =>
      value === "" || value === null ? undefined : value,
    z.coerce.number().int().positive().max(100000).optional(),
  ),
  imageUrl: z.string().trim().max(500).optional(),
  pollQuestion: z.string().trim().max(250).optional(),
});

export type UpdateEventState = {
  error?: string;
};

function parseDakarDateTime(date: string, time: string) {
  return new Date(`${date}T${time}:00.000Z`);
}

function datesAreEqual(first: Date | null, second: Date | null) {
  if (first === null && second === null) {
    return true;
  }

  if (first === null || second === null) {
    return false;
  }

  return first.getTime() === second.getTime();
}

export async function updateEventAction(
  eventId: string,
  _previousState: UpdateEventState,
  formData: FormData,
): Promise<UpdateEventState> {
  await requireAdminSession();

  const result = eventSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    pricingDetails: formData.get("pricingDetails"),
    scheduleType: formData.get("scheduleType"),
    startDate: formData.get("startDate"),
    startTime: formData.get("startTime"),
    endDate: formData.get("endDate") || undefined,
    endTime: formData.get("endTime") || undefined,
    recurrenceDay: formData.get("recurrenceDay") || undefined,
    recurrenceEndDate:
      formData.get("recurrenceEndDate") || undefined,
    capacity: formData.get("capacity"),
    imageUrl: formData.get("imageUrl") || undefined,
    pollQuestion: formData.get("pollQuestion") || undefined,
  });

  if (!result.success) {
    return {
      error: "Certains champs sont absents ou incorrects.",
    };
  }

  const existingEvent = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      _count: {
        select: { responses: true },
      },
    },
  });

  if (!existingEvent) {
    return {
      error: "Événement introuvable.",
    };
  }

  const values = result.data;
  const startsAt = parseDakarDateTime(
    values.startDate,
    values.startTime,
  );

  let endsAt: Date | null = null;
  let recurrenceDay: number | null = null;
  let recurrenceEndsAt: Date | null = null;

  if (values.scheduleType === "ONE_DAY" && values.endTime) {
    endsAt = parseDakarDateTime(values.startDate, values.endTime);

    if (endsAt <= startsAt) {
      endsAt.setUTCDate(endsAt.getUTCDate() + 1);
    }
  }

  if (values.scheduleType === "DATE_RANGE") {
    if (!values.endDate || !values.endTime) {
      return {
        error: "La date et l’heure de fin sont obligatoires.",
      };
    }

    endsAt = parseDakarDateTime(values.endDate, values.endTime);

    if (endsAt <= startsAt) {
      return {
        error: "La fin doit être postérieure au début.",
      };
    }
  }

  if (values.scheduleType === "WEEKLY") {
    recurrenceDay = Number(values.recurrenceDay);

    if (
      !Number.isInteger(recurrenceDay) ||
      recurrenceDay < 0 ||
      recurrenceDay > 6
    ) {
      return {
        error: "Choisissez un jour de répétition.",
      };
    }

    if (startsAt.getUTCDay() !== recurrenceDay) {
      return {
        error:
          "La première date doit correspondre au jour choisi.",
      };
    }

    if (values.endTime) {
      endsAt = parseDakarDateTime(values.startDate, values.endTime);

      if (endsAt <= startsAt) {
        endsAt.setUTCDate(endsAt.getUTCDate() + 1);
      }
    }

    if (values.recurrenceEndDate) {
      recurrenceEndsAt = new Date(
        `${values.recurrenceEndDate}T23:59:59.999Z`,
      );

      if (recurrenceEndsAt < startsAt) {
        return {
          error:
            "La fin de répétition doit être postérieure au début.",
        };
      }
    }
  }

  const scheduleChanged =
    existingEvent.scheduleType !== values.scheduleType ||
    !datesAreEqual(existingEvent.startsAt, startsAt) ||
    !datesAreEqual(existingEvent.endsAt, endsAt) ||
    existingEvent.recurrenceDay !== recurrenceDay ||
    !datesAreEqual(
      existingEvent.recurrenceEndsAt,
      recurrenceEndsAt,
    );

  if (scheduleChanged && existingEvent._count.responses > 0) {
    return {
      error:
        "Le calendrier ne peut plus être modifié car ce sondage possède déjà des réponses.",
    };
  }

  const yesResponses = await prisma.pollResponse.findMany({
    where: {
      eventId,
      answer: "YES",
    },
    select: {
      occurrenceStartsAt: true,
    },
  });

  const countsByOccurrence = new Map<string, number>();

  for (const response of yesResponses) {
    const key = response.occurrenceStartsAt.toISOString();
    countsByOccurrence.set(
      key,
      (countsByOccurrence.get(key) ?? 0) + 1,
    );
  }

  const largestParticipantCount = Math.max(
    0,
    ...countsByOccurrence.values(),
  );

  if (
    values.capacity !== undefined &&
    values.capacity < largestParticipantCount
  ) {
    return {
      error: `Le nombre de places ne peut pas être inférieur à ${largestParticipantCount}.`,
    };
  }

  const pollEnabled = formData.get("pollEnabled") === "on";
  const published = formData.get("published") === "on";
  const newImageUrl = values.imageUrl || null;

  try {
    await prisma.event.update({
      where: { id: eventId },
      data: {
        title: values.title,
        description: values.description,
        pricingDetails: values.pricingDetails || null,
        scheduleType: values.scheduleType,
        startsAt,
        endsAt,
        recurrenceDay,
        recurrenceEndsAt,
        capacity: values.capacity ?? null,
        imageUrl: newImageUrl,
        pollEnabled,
        pollQuestion: pollEnabled
          ? values.pollQuestion ||
            "Serez-vous présent à cet événement ?"
          : null,
        published,
        publishedAt: published
          ? existingEvent.publishedAt ?? new Date()
          : null,
      },
    });
  } catch {
    return {
      error:
        "Les modifications n’ont pas pu être enregistrées.",
    };
  }

  if (
    existingEvent.imageUrl !== newImageUrl &&
    isVercelBlobUrl(existingEvent.imageUrl)
  ) {
    try {
      await del(existingEvent.imageUrl!);
    } catch (error) {
      console.error(
        "Impossible de supprimer l’ancienne image :",
        error,
      );
    }
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/evenements/${eventId}`);
  revalidatePath(`/evenements/${existingEvent.slug}`);
  revalidatePath("/evenements");

  redirect(`/admin/evenements/${eventId}`);
}
