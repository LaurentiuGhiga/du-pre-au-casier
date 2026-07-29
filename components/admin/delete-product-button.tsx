"use client";

import { useState, useTransition } from "react";

type DeleteProductButtonProps = {
  productName: string;
  action: () => Promise<void>;
};

export default function DeleteProductButton({
  productName,
  action,
}: DeleteProductButtonProps) {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer le produit « ${productName} » ?`,
    );

    if (!confirmed) {
      return;
    }

    setError("");

    startTransition(async () => {
      try {
        await action();
    } catch (error) {
        console.error("Erreur suppression produit :", error);

        setError(
          error instanceof Error
            ? error.message
            : "Impossible de supprimer ce produit.",
        );
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Suppression..." : "Supprimer"}
      </button>

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}