"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary mt-2 w-full"
    >
      {pending ? "Connexion…" : "Se connecter"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-brun"
        >
          Adresse email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-xl border border-brun/20 bg-white px-4 py-3 text-brun outline-none transition focus:border-terracotta"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold text-brun"
        >
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-xl border border-brun/20 bg-white px-4 py-3 text-brun outline-none transition focus:border-terracotta"
        />
      </div>

      {state.error ? (
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.error}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}