"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdminSession } from "@/lib/auth";
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

export type CreateEventState = {
  error?: string;
};

function parseDakarDateTime(date: string, time: string) {
  // Dakar utilise UTC toute l’année.
  return new Date(`${date}T${time}:00.000Z`);
}

function createSlug(title: string) {
  const base = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${base || "evenement"}-${randomUUID().slice(0, 8)}`;
}

export async function createEventAction(
  _previousState: CreateEventState,
  formData: FormData,
): Promise<CreateEventState> {
  const session = await requireAdminSession();

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

    // Autorise un événement se terminant après minuit.
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
          "La première date doit correspondre au jour de répétition choisi.",
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
            "La fin de la répétition doit être postérieure à la première date.",
        };
      }
    }
  }

  const pollEnabled = formData.get("pollEnabled") === "on";
  const published = formData.get("published") === "on";

  try {
    await prisma.event.create({
      data: {
        title: values.title,
        slug: createSlug(values.title),
        description: values.description,
        pricingDetails: values.pricingDetails || null,
        scheduleType: values.scheduleType,
        startsAt,
        endsAt,
        recurrenceDay,
        recurrenceEndsAt,
        capacity: values.capacity ?? null,
        imageUrl: values.imageUrl || null,
        pollEnabled,
        pollQuestion: pollEnabled
          ? values.pollQuestion ||
            "Serez-vous présent à cet événement ?"
          : null,
        published,
        publishedAt: published ? new Date() : null,
        createdById: session.adminId,
      },
    });
  } catch {
    return {
      error:
        "L’événement n’a pas pu être enregistré. Veuillez réessayer.",
    };
  }

  revalidatePath("/admin");
  revalidatePath("/evenements");
  redirect("/admin");
}
