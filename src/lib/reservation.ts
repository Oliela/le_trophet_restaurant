/**
 * Structure prête à être connectée à une API de réservation réelle
 * (ex: remplacer le délai simulé par un appel `fetch("/api/reservations", { method: "POST", body: ... })`).
 */

export type ReservationEspace = "interieur" | "exterieur";
export type ReservationOccasion = "repas" | "anniversaire" | "groupe" | "autre";

export type ReservationPayload = {
  nom: string;
  telephone: string;
  email?: string;
  date: string;
  heure: string;
  personnes: number;
  espace: ReservationEspace;
  occasion: ReservationOccasion;
  message?: string;
  politiqueAcceptee: boolean;
};

export type ReservationResult = { success: true } | { success: false; error: string };

export async function submitReservation(
  payload: ReservationPayload
): Promise<ReservationResult> {
  await new Promise((resolve) => setTimeout(resolve, 1100));

  if (!payload.politiqueAcceptee) {
    return { success: false, error: "Merci d'accepter la politique de confidentialité." };
  }

  return { success: true };
}
