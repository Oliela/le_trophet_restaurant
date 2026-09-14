"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  submitPollResponse,
  type PollState,
} from "./actions";

type OccurrenceOption = {
  value: string;
  label: string;
  remaining: number | null;
};

const initialState: PollState = {};

const inputClass =
  "w-full rounded-xl border border-brun/20 bg-white px-4 py-3 text-brun outline-none transition focus:border-terracotta";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary"
    >
      {pending ? "Enregistrement…" : "Envoyer ma réponse"}
    </button>
  );
}

export function PollForm({
  eventId,
  question,
  occurrences,
}: {
  eventId: string;
  question: string;
  occurrences: OccurrenceOption[];
}) {
  const [answer, setAnswer] = useState<"YES" | "NO">("YES");
  const [occurrenceIso, setOccurrenceIso] = useState(
    occurrences[0].value,
  );

  const selectedOccurrence =
    occurrences.find(
      (occurrence) => occurrence.value === occurrenceIso,
    ) ?? occurrences[0];

  const boundAction = submitPollResponse.bind(
    null,
    eventId,
    occurrenceIso,
  );

  const [state, formAction] = useFormState(
    boundAction,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="mt-6 space-y-5 rounded-[2rem] border border-brun/10 bg-ivoire-card p-6 shadow-soft sm:p-8"
    >
      <h2 className="font-display text-3xl font-semibold text-brun">
        {question}
      </h2>

      {occurrences.length > 1 ? (
        <div>
          <label
            htmlFor="occurrence"
            className="mb-2 block text-sm font-semibold"
          >
            Date concernée
          </label>
          <select
            id="occurrence"
            value={occurrenceIso}
            onChange={(event) =>
              setOccurrenceIso(event.target.value)
            }
            className={inputClass}
          >
            {occurrences.map((occurrence) => (
              <option
                key={occurrence.value}
                value={occurrence.value}
              >
                {occurrence.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p className="rounded-xl bg-ocre/20 px-4 py-3 text-sm font-semibold text-brun">
          {selectedOccurrence.label}
        </p>
      )}

      {selectedOccurrence.remaining !== null ? (
        <p className="text-sm text-grisbrun">
          {selectedOccurrence.remaining > 0
            ? `${selectedOccurrence.remaining} place(s) encore disponible(s)`
            : "Toutes les places sont actuellement prises"}
        </p>
      ) : null}

      <fieldset>
        <legend className="mb-3 text-sm font-semibold">
          Votre réponse
        </legend>

        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-2">
            <input
              name="answer"
              type="radio"
              value="YES"
              checked={answer === "YES"}
              onChange={() => setAnswer("YES")}
              className="h-5 w-5 accent-terracotta"
            />
            Oui, je serai présent(e)
          </label>

          <label className="flex items-center gap-2">
            <input
              name="answer"
              type="radio"
              value="NO"
              checked={answer === "NO"}
              onChange={() => setAnswer("NO")}
              className="h-5 w-5 accent-terracotta"
            />
            Non
          </label>
        </div>
      </fieldset>

      {answer === "YES" ? (
        <div>
          <label
            htmlFor="participantName"
            className="mb-2 block text-sm font-semibold"
          >
            Votre nom
          </label>
          <input
            id="participantName"
            name="participantName"
            required
            maxLength={100}
            autoComplete="name"
            className={inputClass}
          />
        </div>
      ) : null}

      <div>
        <label
          htmlFor="whatsapp"
          className="mb-2 block text-sm font-semibold"
        >
          Numéro WhatsApp
        </label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          required
          maxLength={30}
          autoComplete="tel"
          placeholder="+221 77 000 00 00"
          className={inputClass}
        />
        <p className="mt-2 text-xs text-grisbrun">
          Ce numéro sert à empêcher les votes multiples et sera
          uniquement visible par les administrateurs.
        </p>
      </div>

      {state.error ? (
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p
          role="status"
          className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          {state.success}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
