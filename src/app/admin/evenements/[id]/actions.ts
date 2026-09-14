"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { isVercelBlobUrl } from "@/lib/event-image";

export async function toggleEventPublication(eventId: string) {
  await requireAdminSession();

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: {
      published: true,
    },
  });

  if (!event) {
    throw new Error("Événement introuvable.");
  }

  const published = !event.published;

  await prisma.event.update({
    where: { id: eventId },
    data: {
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  revalidatePath("/admin");
  revalidatePath(`/admin/evenements/${eventId}`);
  revalidatePath("/evenements");
}

export async function deleteEventAction(eventId: string) {
  await requireAdminSession();

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: {
      id: true,
      imageUrl: true,
    },
  });

  if (!event) {
    throw new Error("Événement introuvable.");
  }

  await prisma.event.delete({
    where: { id: eventId },
  });

  if (isVercelBlobUrl(event.imageUrl)) {
    try {
      await del(event.imageUrl!);
    } catch (error) {
      console.error(
        "Impossible de supprimer l’image Vercel Blob :",
        error,
      );
    }
  }

  revalidatePath("/admin");
  revalidatePath("/evenements");
  redirect("/admin");
}
