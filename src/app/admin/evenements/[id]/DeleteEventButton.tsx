"use client";

export function DeleteEventButton({
  action,
}: {
  action: () => Promise<void>;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          "Supprimer définitivement cet événement et toutes ses réponses ?",
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="btn border border-red-300 text-red-700 hover:bg-red-50"
      >
        Supprimer l’événement
      </button>
    </form>
  );
}