import Link from "next/link";
import { notFound } from "next/navigation";
import { EditEventForm } from "./EditEventForm";
import { Container } from "@/components/ui/Container";
import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function datePart(date: Date | null) {
  return date ? date.toISOString().slice(0, 10) : "";
}

function timePart(date: Date | null) {
  return date ? date.toISOString().slice(11, 16) : "";
}

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    notFound();
  }

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Link
            href={`/admin/evenements/${event.id}`}
            className="text-sm font-semibold text-terracotta hover:underline"
          >
            ← Retour à l’événement
          </Link>

          <p className="eyebrow mt-8">Administration</p>
          <h1 className="mt-2 font-display text-4xl font-semibold">
            Modifier l’événement
          </h1>

          <EditEventForm
            event={{
              id: event.id,
              title: event.title,
              description: event.description,
              pricingDetails: event.pricingDetails ?? "",
              scheduleType: event.scheduleType,
              startDate: datePart(event.startsAt),
              startTime: timePart(event.startsAt),
              endDate: datePart(event.endsAt),
              endTime: timePart(event.endsAt),
              recurrenceDay: event.recurrenceDay,
              recurrenceEndDate: datePart(
                event.recurrenceEndsAt,
              ),
              capacity: event.capacity ?? "",
              imageUrl: event.imageUrl ?? "",
              pollEnabled: event.pollEnabled,
              pollQuestion: event.pollQuestion ?? "",
              published: event.published,
            }}
          />
        </div>
      </Container>
    </section>
  );
}