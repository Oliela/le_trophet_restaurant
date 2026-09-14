import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";
import { Container } from "@/components/ui/Container";
import { getAdminSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Connexion administrateur",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <section className="min-h-[70vh] py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-md rounded-[2rem] border border-brun/10 bg-ivoire-card p-7 shadow-card sm:p-10">
          <p className="eyebrow">Administration</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-brun">
            Connexion
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-grisbrun">
            Connectez-vous pour gérer les événements et consulter les réponses.
          </p>

          <LoginForm />
        </div>
      </Container>
    </section>
  );
}