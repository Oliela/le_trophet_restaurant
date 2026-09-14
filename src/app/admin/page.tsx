import Link from "next/link";
import { logoutAction } from "./actions";
import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-SN", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Africa/Dakar",
  }).format(date);
}

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();

  const [events, yesCount, noCount] = await Promise.all([
    prisma.event.findMany({
      orderBy: {
        startsAt: "desc",
      },
      include: {
        _count: {
          select: {
            responses: true,
          },
        },
      },
    }),
    prisma.pollResponse.count({
      where: {
        answer: "YES",
      },
    }),
    prisma.pollResponse.count({
      where: {
        answer: "NO",
      },
    }),
  ]);

  return (
    <section className="min-h-[70vh] py-12 sm:py-16">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">Administration</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-brun">
              Tableau de bord
            </h1>
            <p className="mt-2 text-grisbrun">
              Bonjour {session.name}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/evenements/nouveau"
              className="btn-primary"
            >
              Créer un événement
            </Link>

            <form action={logoutAction}>
              <button type="submit" className="btn-outline">
                Se déconnecter
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-brun p-6 text-ivoire">
            <p className="text-sm text-ivoire/70">Événements</p>
            <p className="mt-2 text-3xl font-bold">{events.length}</p>
          </div>

          <div className="rounded-2xl bg-terracotta p-6 text-white">
            <p className="text-sm text-white/80">Réponses Oui</p>
            <p className="mt-2 text-3xl font-bold">{yesCount}</p>
          </div>

          <div className="rounded-2xl bg-ocre p-6 text-brun">
            <p className="text-sm text-brun/70">Réponses Non</p>
            <p className="mt-2 text-3xl font-bold">{noCount}</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-3xl font-semibold text-brun">
            Événements
          </h2>

          {events.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-dashed border-brun/20 p-8 text-center text-grisbrun">
              Aucun événement n’a encore été créé.
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              {events.map((event) => (
                <article
                  key={event.id}
                  className="rounded-2xl border border-brun/10 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-brun">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-sm text-grisbrun">
                        {formatDate(event.startsAt)}
                      </p>
                      <p className="mt-2 text-sm text-grisbrun">
                        {event.published ? "Publié" : "Brouillon"}
                        {" · "}
                        {event.pollEnabled
                          ? `${event._count.responses} réponse(s)`
                          : "Sondage désactivé"}
                      </p>
                    </div>

                    <Link
                      href={`/admin/evenements/${event.id}`}
                      className="btn-outline self-start"
                    >
                      Gérer
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}