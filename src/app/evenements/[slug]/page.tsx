import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PollForm } from "./PollForm";
import { Container } from "@/components/ui/Container";
import {
    formatOccurrenceChoice,
    getUpcomingOccurrences,
} from "@/lib/event-occurrences";
import {
    formatEventPricing,
    formatEventSchedule,
} from "@/lib/event-schedule";
import { getEventImageUrl } from "@/lib/event-image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EventDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const event = await prisma.event.findFirst({
        where: {
            slug,
            published: true,
        },
    });

    if (!event) {
        notFound();
    }

    const occurrenceDates = getUpcomingOccurrences(event);

    if (occurrenceDates.length === 0) {
        notFound();
    }

    const yesResponses = await prisma.pollResponse.findMany({
        where: {
            eventId: event.id,
            answer: "YES",
            occurrenceStartsAt: {
                in: occurrenceDates,
            },
        },
        select: {
            occurrenceStartsAt: true,
        },
    });

    const participantCounts = new Map<string, number>();

    for (const response of yesResponses) {
        const key = response.occurrenceStartsAt.toISOString();
        participantCounts.set(
            key,
            (participantCounts.get(key) ?? 0) + 1,
        );
    }

    const occurrences = occurrenceDates.map((date) => {
        const value = date.toISOString();
        const participantCount = participantCounts.get(value) ?? 0;

        return {
            value,
            label: formatOccurrenceChoice(date),
            remaining:
                event.capacity === null
                    ? null
                    : Math.max(event.capacity - participantCount, 0),
        };
    });

    const image = getEventImageUrl(event.imageUrl);

    return (
        <section className="py-12 sm:py-16">
            <Container>
                <div className="mx-auto max-w-4xl">
                    <Link
                        href="/evenements"
                        className="text-sm font-semibold text-terracotta hover:underline"
                    >
                        ← Tous les événements
                    </Link>

                    <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[2rem]">
                        <Image
                            src={image}
                            alt={event.title}
                            fill
                            priority
                            sizes="(min-width: 1024px) 900px, 95vw"
                            className="object-cover"
                        />
                    </div>

                    <div className="mt-8">
                        <p className="eyebrow">Événement</p>
                        <h1 className="mt-2 font-display text-4xl font-semibold text-brun sm:text-5xl">
                            {event.title}
                        </h1>

                        <p className="mt-4 font-semibold text-terracotta">
                            {formatEventSchedule(event)}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <span className="rounded-full bg-ocre px-4 py-2 text-sm font-bold text-brun">
                                {formatEventPricing(event.pricingDetails)}
                            </span>
                            {event.capacity !== null ? (
                                <span className="rounded-full bg-brun px-4 py-2 text-sm font-bold text-ivoire">
                                    {event.capacity} places
                                </span>
                            ) : null}
                        </div>

                        <p className="mt-8 whitespace-pre-line text-lg leading-relaxed text-grisbrun">
                            {event.description}
                        </p>
                    </div>

                    {event.pollEnabled && occurrences.length > 0 ? (
                        <PollForm
                            eventId={event.id}
                            question={
                                event.pollQuestion ||
                                "Serez-vous présent à cet événement ?"
                            }
                            occurrences={occurrences}
                        />
                    ) : null}
                </div>
            </Container>
        </section>
    );
}
