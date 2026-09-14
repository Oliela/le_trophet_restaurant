"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  createEventAction,
  type CreateEventState,
} from "./actions";
import { EventImageUpload } from "@/components/admin/EventImageUpload";

const initialState: CreateEventState = {};

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
      {pending ? "Enregistrement…" : "Créer l’événement"}
    </button>
  );
}

export function EventForm() {
  const [state, formAction] = useFormState(
    createEventAction,
    initialState,
  );
  const [scheduleType, setScheduleType] = useState("ONE_DAY");
  const [pollEnabled, setPollEnabled] = useState(false);

  return (
    <form action={formAction} className="mt-8 space-y-8">
      {state.error ? (
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.error}
        </p>
      ) : null}

      <fieldset className="space-y-5">
        <legend className="font-display text-2xl font-semibold text-brun">
          Informations générales
        </legend>

        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-semibold"
          >
            Nom de l’événement
          </label>
          <input
            id="title"
            name="title"
            required
            minLength={3}
            maxLength={120}
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            minLength={10}
            maxLength={5000}
            rows={6}
            className={inputClass}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="pricingDetails"
              className="mb-2 block text-sm font-semibold"
            >
              Modalités — facultatif
            </label>
            <input
              id="pricingDetails"
              name="pricingDetails"
              placeholder="Laisser vide pour Entrée libre"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="capacity"
              className="mb-2 block text-sm font-semibold"
            >
              Nombre de places — facultatif
            </label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              min={1}
              step={1}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 block text-sm font-semibold">
            Image de l’événement — facultative
          </p>
          <EventImageUpload />
        </div>
      </fieldset>

      <fieldset className="space-y-5 border-t border-brun/10 pt-8">
        <legend className="font-display text-2xl font-semibold text-brun">
          Date et horaire
        </legend>

        <div>
          <label
            htmlFor="scheduleType"
            className="mb-2 block text-sm font-semibold"
          >
            Type de calendrier
          </label>
          <select
            id="scheduleType"
            name="scheduleType"
            value={scheduleType}
            onChange={(event) => setScheduleType(event.target.value)}
            className={inputClass}
          >
            <option value="ONE_DAY">Une seule journée</option>
            <option value="DATE_RANGE">Une période</option>
            <option value="WEEKLY">Toutes les semaines</option>
          </select>
        </div>

        {scheduleType === "WEEKLY" ? (
          <div>
            <label
              htmlFor="recurrenceDay"
              className="mb-2 block text-sm font-semibold"
            >
              Jour de répétition
            </label>
            <select
              id="recurrenceDay"
              name="recurrenceDay"
              required
              className={inputClass}
            >
              <option value="">Choisir un jour</option>
              <option value="1">Tous les lundis</option>
              <option value="2">Tous les mardis</option>
              <option value="3">Tous les mercredis</option>
              <option value="4">Tous les jeudis</option>
              <option value="5">Tous les vendredis</option>
              <option value="6">Tous les samedis</option>
              <option value="0">Tous les dimanches</option>
            </select>
          </div>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="startDate"
              className="mb-2 block text-sm font-semibold"
            >
              {scheduleType === "WEEKLY"
                ? "Première date"
                : "Date de début"}
            </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="startTime"
              className="mb-2 block text-sm font-semibold"
            >
              Heure de début
            </label>
            <input
              id="startTime"
              name="startTime"
              type="time"
              required
              className={inputClass}
            />
          </div>
        </div>

        {scheduleType === "DATE_RANGE" ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="endDate"
                className="mb-2 block text-sm font-semibold"
              >
                Date de fin
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="endTime"
                className="mb-2 block text-sm font-semibold"
              >
                Heure de fin
              </label>
              <input
                id="endTime"
                name="endTime"
                type="time"
                required
                className={inputClass}
              />
            </div>
          </div>
        ) : (
          <div>
            <label
              htmlFor="endTime"
              className="mb-2 block text-sm font-semibold"
            >
              Heure de fin — facultative
            </label>
            <input
              id="endTime"
              name="endTime"
              type="time"
              className={inputClass}
            />
          </div>
        )}

        {scheduleType === "WEEKLY" ? (
          <div>
            <label
              htmlFor="recurrenceEndDate"
              className="mb-2 block text-sm font-semibold"
            >
              Fin de la répétition — facultative
            </label>
            <input
              id="recurrenceEndDate"
              name="recurrenceEndDate"
              type="date"
              className={inputClass}
            />
          </div>
        ) : null}
      </fieldset>

      <fieldset className="space-y-5 border-t border-brun/10 pt-8">
        <legend className="font-display text-2xl font-semibold text-brun">
          Sondage et publication
        </legend>

        <label className="flex items-center gap-3">
          <input
            name="pollEnabled"
            type="checkbox"
            checked={pollEnabled}
            onChange={(event) =>
              setPollEnabled(event.target.checked)
            }
            className="h-5 w-5 accent-terracotta"
          />
          <span>Activer un sondage pour cet événement</span>
        </label>

        {pollEnabled ? (
          <div>
            <label
              htmlFor="pollQuestion"
              className="mb-2 block text-sm font-semibold"
            >
              Question du sondage
            </label>
            <input
              id="pollQuestion"
              name="pollQuestion"
              placeholder="Serez-vous présent à cet événement ?"
              className={inputClass}
            />
          </div>
        ) : null}

        <label className="flex items-center gap-3">
          <input
            name="published"
            type="checkbox"
            className="h-5 w-5 accent-terracotta"
          />
          <span>Publier immédiatement sur le site</span>
        </label>
      </fieldset>

      <SubmitButton />
    </form>
  );
}
