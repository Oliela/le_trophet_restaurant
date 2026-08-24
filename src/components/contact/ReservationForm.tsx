"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import {
  submitReservation,
  type ReservationEspace,
  type ReservationOccasion,
} from "@/lib/reservation";

type FormState = {
  nom: string;
  telephone: string;
  email: string;
  date: string;
  heure: string;
  personnes: string;
  espace: ReservationEspace;
  occasion: ReservationOccasion;
  message: string;
  politiqueAcceptee: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const OCCASIONS: { value: ReservationOccasion; label: string }[] = [
  { value: "repas", label: "Repas" },
  { value: "anniversaire", label: "Anniversaire" },
  { value: "groupe", label: "Groupe" },
  { value: "autre", label: "Autre" },
];

function createInitialState(initial?: Partial<FormState>): FormState {
  return {
    nom: "",
    telephone: "",
    email: "",
    date: "",
    heure: "",
    personnes: "2",
    espace: "interieur",
    occasion: "repas",
    message: "",
    politiqueAcceptee: false,
    ...initial,
  };
}

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.nom.trim()) {
    errors.nom = "Merci d'indiquer votre nom et prénom.";
  }

  if (!values.telephone.trim()) {
    errors.telephone = "Merci d'indiquer un numéro de téléphone.";
  } else if (!/^[0-9+\s()-]{8,}$/.test(values.telephone.trim())) {
    errors.telephone = "Ce numéro de téléphone ne semble pas valide.";
  }

  if (values.email.trim() && !/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = "Cette adresse électronique ne semble pas valide.";
  }

  if (!values.date) {
    errors.date = "Merci de choisir une date.";
  }

  if (!values.heure) {
    errors.heure = "Merci de choisir une heure.";
  }

  const personnes = Number(values.personnes);
  if (!values.personnes || Number.isNaN(personnes) || personnes < 1) {
    errors.personnes = "Merci d'indiquer au moins 1 personne.";
  }

  if (!values.politiqueAcceptee) {
    errors.politiqueAcceptee = "Merci d'accepter la politique de confidentialité.";
  }

  return errors;
}

export function ReservationForm({
  initialMessage,
  initialOccasion,
}: {
  initialMessage?: string;
  initialOccasion?: ReservationOccasion;
}) {
  const formId = useId();
  const [values, setValues] = useState<FormState>(() =>
    createInitialState({
      message: initialMessage ?? "",
      occasion: initialOccasion ?? "repas",
    })
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("loading");
    setServerError(null);

    const result = await submitReservation({
      nom: values.nom.trim(),
      telephone: values.telephone.trim(),
      email: values.email.trim() || undefined,
      date: values.date,
      heure: values.heure,
      personnes: Number(values.personnes),
      espace: values.espace,
      occasion: values.occasion,
      message: values.message.trim() || undefined,
      politiqueAcceptee: values.politiqueAcceptee,
    });

    if (result.success) {
      setStatus("success");
      setValues(createInitialState());
    } else {
      setStatus("error");
      setServerError(result.error);
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-olive/30 bg-olive/10 p-8 text-center"
      >
        <h3 className="font-display text-2xl font-semibold text-brun">
          Merci pour votre demande !
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-grisbrun">
          Votre demande a bien été envoyée. Notre équipe vous contactera
          prochainement pour confirmer la disponibilité de votre table.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-outline mt-6"
        >
          Envoyer une nouvelle demande
        </button>
      </div>
    );
  }

  const fieldError = (key: keyof FormState) =>
    errors[key] ? (
      <p id={`${formId}-${key}-error`} className="mt-1.5 text-xs font-medium text-terracotta">
        {errors[key]}
      </p>
    ) : null;

  const inputClass = (key: keyof FormState) =>
    `mt-1.5 w-full rounded-xl border bg-ivoire px-4 py-2.5 text-sm text-brun outline-none focus:border-terracotta ${
      errors[key] ? "border-terracotta" : "border-brun/15"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-brun">
          Nom et prénom
          <input
            type="text"
            value={values.nom}
            onChange={(e) => update("nom", e.target.value)}
            aria-invalid={Boolean(errors.nom)}
            aria-describedby={errors.nom ? `${formId}-nom-error` : undefined}
            className={inputClass("nom")}
          />
          {fieldError("nom")}
        </label>

        <label className="block text-sm font-medium text-brun">
          Téléphone
          <input
            type="tel"
            value={values.telephone}
            onChange={(e) => update("telephone", e.target.value)}
            aria-invalid={Boolean(errors.telephone)}
            aria-describedby={errors.telephone ? `${formId}-telephone-error` : undefined}
            className={inputClass("telephone")}
          />
          {fieldError("telephone")}
        </label>
      </div>

      <label className="block text-sm font-medium text-brun">
        Adresse électronique <span className="font-normal text-grisbrun">(facultatif)</span>
        <input
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          className={inputClass("email")}
        />
        {fieldError("email")}
      </label>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <label className="block text-sm font-medium text-brun">
          Date
          <input
            type="date"
            value={values.date}
            onChange={(e) => update("date", e.target.value)}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? `${formId}-date-error` : undefined}
            className={inputClass("date")}
          />
          {fieldError("date")}
        </label>

        <label className="block text-sm font-medium text-brun">
          Heure
          <input
            type="time"
            value={values.heure}
            onChange={(e) => update("heure", e.target.value)}
            aria-invalid={Boolean(errors.heure)}
            aria-describedby={errors.heure ? `${formId}-heure-error` : undefined}
            className={inputClass("heure")}
          />
          {fieldError("heure")}
        </label>

        <label className="block text-sm font-medium text-brun">
          Nombre de personnes
          <input
            type="number"
            min={1}
            value={values.personnes}
            onChange={(e) => update("personnes", e.target.value)}
            aria-invalid={Boolean(errors.personnes)}
            aria-describedby={errors.personnes ? `${formId}-personnes-error` : undefined}
            className={inputClass("personnes")}
          />
          {fieldError("personnes")}
        </label>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-brun">Espace souhaité</legend>
        <div className="mt-2 flex gap-3">
          {(["interieur", "exterieur"] as ReservationEspace[]).map((option) => (
            <label
              key={option}
              className={`flex-1 cursor-pointer rounded-xl border px-4 py-2.5 text-center text-sm font-semibold transition-colors ${
                values.espace === option
                  ? "border-terracotta bg-terracotta/10 text-terracotta"
                  : "border-brun/15 text-grisbrun"
              }`}
            >
              <input
                type="radio"
                name="espace"
                value={option}
                checked={values.espace === option}
                onChange={() => update("espace", option)}
                className="sr-only"
              />
              {option === "interieur" ? "Intérieur" : "Extérieur"}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block text-sm font-medium text-brun">
        Occasion
        <select
          value={values.occasion}
          onChange={(e) => update("occasion", e.target.value as ReservationOccasion)}
          className={inputClass("occasion")}
        >
          {OCCASIONS.map((occasion) => (
            <option key={occasion.value} value={occasion.value}>
              {occasion.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-medium text-brun">
        Message ou demande particulière{" "}
        <span className="font-normal text-grisbrun">(facultatif)</span>
        <textarea
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          rows={4}
          className={inputClass("message")}
        />
      </label>

      <label className="flex items-start gap-3 text-sm text-grisbrun">
        <input
          type="checkbox"
          checked={values.politiqueAcceptee}
          onChange={(e) => update("politiqueAcceptee", e.target.checked)}
          aria-invalid={Boolean(errors.politiqueAcceptee)}
          aria-describedby={errors.politiqueAcceptee ? `${formId}-politiqueAcceptee-error` : undefined}
          className="mt-1 h-4 w-4 shrink-0 rounded border-brun/30 text-terracotta focus:ring-terracotta"
        />
        <span>
          J’accepte que mes données soient utilisées pour traiter ma demande de
          réservation, conformément à la{" "}
          <Link href="/confidentialite" className="underline hover:text-terracotta">
            politique de confidentialité
          </Link>
          .
        </span>
      </label>
      {fieldError("politiqueAcceptee")}

      {status === "error" && serverError ? (
        <p role="alert" className="text-sm font-medium text-terracotta">
          {serverError}
        </p>
      ) : null}

      <p className="text-xs leading-relaxed text-grisbrun">
        La réservation sera définitive après confirmation de notre équipe.
      </p>

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full sm:w-auto">
        {status === "loading" ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}
