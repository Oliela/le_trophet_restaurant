"use client";

import { useActionState, useState } from "react";
import {
    updateEventAction,
    type UpdateEventState,
} from "./actions";
import { EventImageUpload } from "@/components/admin/EventImageUpload";

type EditableEvent = {
    id: string;
    title: string;
    description: string;
    pricingDetails: string;
    scheduleType: "ONE_DAY" | "DATE_RANGE" | "WEEKLY";
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    recurrenceDay: number | null;
    recurrenceEndDate: string;
    capacity: number | "";
    imageUrl: string;
    pollEnabled: boolean;
    pollQuestion: string;
    published: boolean;
};

const inputClass =
    "w-full rounded-xl border border-brun/20 bg-white px-4 py-3 text-brun outline-none transition focus:border-terracotta";

export function EditEventForm({
    event,
}: {
    event: EditableEvent;
}) {
    const [imageBlockedReason, setImageBlockedReason] = useState("");
    const [scheduleType, setScheduleType] = useState(
        event.scheduleType,
    );
    const [pollEnabled, setPollEnabled] = useState(
        event.pollEnabled,
    );

    const boundAction = updateEventAction.bind(null, event.id);

    const [state, formAction, pending] = useActionState<
        UpdateEventState,
        FormData
    >(boundAction, {});

    return (
        <form onSubmit={(event) => { if (imageBlockedReason) event.preventDefault(); }} action={formAction} className="mt-8 space-y-8">
            {state.error ? (
                <p
                    role="alert"
                    className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    {state.error}
                </p>
            ) : null}

            <fieldset className="space-y-5">
                <legend className="font-display text-2xl font-semibold">
                    Informations générales
                </legend>

                <div>
                    <label htmlFor="title" className="mb-2 block font-semibold">
                        Nom de l’événement
                    </label>
                    <input
                        id="title"
                        name="title"
                        required
                        minLength={3}
                        maxLength={120}
                        defaultValue={event.title}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="mb-2 block font-semibold"
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
                        defaultValue={event.description}
                        className={inputClass}
                    />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="pricingDetails"
                            className="mb-2 block font-semibold"
                        >
                            Modalités — facultatif
                        </label>
                        <input
                            id="pricingDetails"
                            name="pricingDetails"
                            defaultValue={event.pricingDetails}
                            placeholder="Laisser vide pour Entrée libre"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="capacity"
                            className="mb-2 block font-semibold"
                        >
                            Nombre de places — facultatif
                        </label>
                        <input
                            id="capacity"
                            name="capacity"
                            type="number"
                            min={1}
                            defaultValue={event.capacity}
                            className={inputClass}
                        />
                    </div>
                </div>

                <div>
                    <p className="mb-2 block font-semibold">
                        Image de l’événement — facultative
                    </p>
                    <EventImageUpload initialUrl={event.imageUrl} onBlockedChange={setImageBlockedReason} />
                </div>
            </fieldset>

            <fieldset className="space-y-5 border-t border-brun/10 pt-8">
                <legend className="font-display text-2xl font-semibold">
                    Date et horaire
                </legend>

                <div>
                    <label
                        htmlFor="scheduleType"
                        className="mb-2 block font-semibold"
                    >
                        Type de calendrier
                    </label>
                    <select
                        id="scheduleType"
                        name="scheduleType"
                        value={scheduleType}
                        onChange={(changeEvent) =>
                            setScheduleType(
                                changeEvent.target.value as EditableEvent["scheduleType"],
                            )
                        }
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
                            className="mb-2 block font-semibold"
                        >
                            Jour de répétition
                        </label>
                        <select
                            id="recurrenceDay"
                            name="recurrenceDay"
                            required
                            defaultValue={event.recurrenceDay ?? ""}
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
                            className="mb-2 block font-semibold"
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
                            defaultValue={event.startDate}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="startTime"
                            className="mb-2 block font-semibold"
                        >
                            Heure de début
                        </label>
                        <input
                            id="startTime"
                            name="startTime"
                            type="time"
                            required
                            defaultValue={event.startTime}
                            className={inputClass}
                        />
                    </div>
                </div>

                {scheduleType === "DATE_RANGE" ? (
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="endDate"
                                className="mb-2 block font-semibold"
                            >
                                Date de fin
                            </label>
                            <input
                                id="endDate"
                                name="endDate"
                                type="date"
                                required
                                defaultValue={event.endDate}
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="endTime"
                                className="mb-2 block font-semibold"
                            >
                                Heure de fin
                            </label>
                            <input
                                id="endTime"
                                name="endTime"
                                type="time"
                                required
                                defaultValue={event.endTime}
                                className={inputClass}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <label
                            htmlFor="endTime"
                            className="mb-2 block font-semibold"
                        >
                            Heure de fin — facultative
                        </label>
                        <input
                            id="endTime"
                            name="endTime"
                            type="time"
                            defaultValue={event.endTime}
                            className={inputClass}
                        />
                    </div>
                )}

                {scheduleType === "WEEKLY" ? (
                    <div>
                        <label
                            htmlFor="recurrenceEndDate"
                            className="mb-2 block font-semibold"
                        >
                            Fin de la répétition — facultative
                        </label>
                        <input
                            id="recurrenceEndDate"
                            name="recurrenceEndDate"
                            type="date"
                            defaultValue={event.recurrenceEndDate}
                            className={inputClass}
                        />
                    </div>
                ) : null}
            </fieldset>

            <fieldset className="space-y-5 border-t border-brun/10 pt-8">
                <legend className="font-display text-2xl font-semibold">
                    Sondage et publication
                </legend>

                <label className="flex items-center gap-3">
                    <input
                        name="pollEnabled"
                        type="checkbox"
                        checked={pollEnabled}
                        onChange={(changeEvent) =>
                            setPollEnabled(changeEvent.target.checked)
                        }
                        className="h-5 w-5 accent-terracotta"
                    />
                    Activer le sondage
                </label>

                {pollEnabled ? (
                    <div>
                        <label
                            htmlFor="pollQuestion"
                            className="mb-2 block font-semibold"
                        >
                            Question du sondage
                        </label>
                        <input
                            id="pollQuestion"
                            name="pollQuestion"
                            defaultValue={event.pollQuestion}
                            className={inputClass}
                        />
                    </div>
                ) : null}

                <label className="flex items-center gap-3">
                    <input
                        name="published"
                        type="checkbox"
                        defaultChecked={event.published}
                        className="h-5 w-5 accent-terracotta"
                    />
                    Publier sur le site
                </label>
            </fieldset>

            {imageBlockedReason ? <p role="status" className="text-sm text-red-700">{imageBlockedReason}</p> : null}
            <button
                type="submit"
                disabled={pending || Boolean(imageBlockedReason)}
                className="btn-primary"
            >
                {pending
                    ? "Enregistrement…"
                    : "Enregistrer les modifications"}
            </button>
        </form>
    );
}
