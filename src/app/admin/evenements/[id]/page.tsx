import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteEventAction, toggleEventPublication } from "./actions";
import { Container } from "@/components/ui/Container";
import {
    formatEventPricing,
    formatEventSchedule,
} from "@/lib/event-schedule";
import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DeleteEventButton } from "./DeleteEventButton";


export const dynamic = "force-dynamic";

function formatOccurrence(date: Date) {
    return new Intl.DateTimeFormat("fr-SN", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "Africa/Dakar",
    }).format(date);
}

export default async function ManageEventPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    await requireAdminSession();
    const { id } = await params;

    const event = await prisma.event.findUnique({
        where: {
            id,
        },
        include: {
            responses: {
                orderBy: [
                    {
                        occurrenceStartsAt: "asc",
                    },
                    {
                        createdAt: "asc",
                    },
                ],
            },
        },
    });

    if (!event) {
        notFound();
    }

    const yesCount = event.responses.filter(
        (response) => response.answer === "YES",
    ).length;

    const noCount = event.responses.filter(
        (response) => response.answer === "NO",
    ).length;

    const publicationAction = toggleEventPublication.bind(
        null,
        event.id,
    );

    const deletionAction = deleteEventAction.bind(null, event.id);
    return (
        <section className="py-12 sm:py-16">
            <Container>
                <div className="mx-auto max-w-5xl">
                    <Link
                        href="/admin"
                        className="text-sm font-semibold text-terracotta hover:underline"
                    >
                        ← Retour au tableau de bord
                    </Link>

                    <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <p className="eyebrow">Gestion de l’événement</p>
                            <h1 className="mt-2 font-display text-4xl font-semibold text-brun">
                                {event.title}
                            </h1>
                            <p className="mt-3 text-grisbrun">
                                {formatEventSchedule(event)}
                            </p>
                            <p className="mt-2 font-semibold text-terracotta">
                                {formatEventPricing(event.pricingDetails)}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href={`/admin/evenements/${event.id}/modifier`}
                                className="btn-outline"
                            >
                                Modifier
                            </Link>

                            <form action={publicationAction}>
                                <button
                                    type="submit"
                                    className={
                                        event.published ? "btn-outline" : "btn-primary"
                                    }
                                >
                                    {event.published
                                        ? "Retirer de la publication"
                                        : "Publier l’événement"}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="mt-8 rounded-2xl border border-brun/10 bg-white p-6">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <p className="text-sm text-grisbrun">Statut</p>
                                <p className="mt-1 font-semibold text-brun">
                                    {event.published ? "Publié" : "Brouillon"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-grisbrun">
                                    Nombre de places
                                </p>
                                <p className="mt-1 font-semibold text-brun">
                                    {event.capacity ?? "Non précisé"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-grisbrun">Sondage</p>
                                <p className="mt-1 font-semibold text-brun">
                                    {event.pollEnabled ? "Activé" : "Désactivé"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-grisbrun">
                                    Question
                                </p>
                                <p className="mt-1 font-semibold text-brun">
                                    {event.pollQuestion || "Aucune question"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-brun/10 pt-6">
                            <p className="whitespace-pre-line leading-relaxed text-grisbrun">
                                {event.description}
                            </p>
                        </div>
                        <div className="mt-8 border-t border-red-200 pt-8">
                            <h2 className="font-display text-2xl font-semibold text-red-800">
                                Zone dangereuse
                            </h2>
                            <p className="mt-2 text-sm text-grisbrun">
                                Cette action supprimera définitivement l’événement et toutes
                                les réponses associées.
                            </p>
                            <div className="mt-4">
                                <DeleteEventButton action={deletionAction} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h2 className="font-display text-3xl font-semibold text-brun">
                            Résultats du sondage
                        </h2>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl bg-terracotta p-5 text-white">
                                <p className="text-sm text-white/80">Oui</p>
                                <p className="mt-1 text-3xl font-bold">{yesCount}</p>
                            </div>

                            <div className="rounded-2xl bg-ocre p-5 text-brun">
                                <p className="text-sm text-brun/70">Non</p>
                                <p className="mt-1 text-3xl font-bold">{noCount}</p>
                            </div>
                        </div>

                        {event.responses.length === 0 ? (
                            <div className="mt-5 rounded-2xl border border-dashed border-brun/20 p-8 text-center text-grisbrun">
                                Aucune réponse pour le moment.
                            </div>
                        ) : (
                            <div className="mt-5 overflow-x-auto rounded-2xl border border-brun/10 bg-white">
                                <table className="w-full min-w-[700px] text-left">
                                    <thead className="bg-brun text-sm text-ivoire">
                                        <tr>
                                            <th className="px-5 py-4">Réponse</th>
                                            <th className="px-5 py-4">Nom</th>
                                            <th className="px-5 py-4">WhatsApp</th>
                                            <th className="px-5 py-4">Date concernée</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {event.responses.map((response) => {
                                            const whatsappDigits =
                                                response.whatsapp.replace(/\D/g, "");

                                            return (
                                                <tr
                                                    key={response.id}
                                                    className="border-t border-brun/10"
                                                >
                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={
                                                                response.answer === "YES"
                                                                    ? "rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800"
                                                                    : "rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800"
                                                            }
                                                        >
                                                            {response.answer === "YES"
                                                                ? "Oui"
                                                                : "Non"}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4 text-brun">
                                                        {response.participantName || "—"}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <a
                                                            href={`https://wa.me/${whatsappDigits}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="font-semibold text-terracotta hover:underline"
                                                        >
                                                            {response.whatsapp}
                                                        </a>
                                                    </td>

                                                    <td className="px-5 py-4 text-grisbrun">
                                                        {formatOccurrence(
                                                            response.occurrenceStartsAt,
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
}
