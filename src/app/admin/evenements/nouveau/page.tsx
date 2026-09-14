import Link from "next/link";
import { EventForm } from "./EventForm";
import { Container } from "@/components/ui/Container";
import { requireAdminSession } from "@/lib/auth";

export default async function NewEventPage() {
  await requireAdminSession();

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/admin"
            className="text-sm font-semibold text-terracotta hover:underline"
          >
            ← Retour au tableau de bord
          </Link>

          {/* <p className="eyebrow mt-8"> Administration</p> */}
          <h1 className="mt-2 font-display text-4xl font-semibold text-brun">
            Créer un événement
          </h1>

          <EventForm />
        </div>
      </Container>
    </section>
  );
}