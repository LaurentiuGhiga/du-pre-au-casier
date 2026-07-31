"use client";

import { User } from "lucide-react";

export default function AccountButton() {
  return (
    <button
      type="button"
      aria-label="Compte utilisateur"
      className="hidden rounded-full border border-zinc-200 p-3 text-zinc-700 hover:bg-zinc-100 md:inline-flex"
    >
      <User className="h-5 w-5" />
    </button>
  );
}