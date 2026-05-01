"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError("Mot de passe incorrect");
      return;
    }

    router.push("/admin/orders");
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl border border-zinc-200 bg-white p-6"
      >
        <h1 className="text-2xl font-bold text-zinc-900">Admin</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Connectez-vous pour accéder aux commandes.
        </p>

        <input
          type="password"
          placeholder="Mot de passe admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-6 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none"
        />

        {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          className="mt-6 w-full rounded-2xl bg-green-700 px-6 py-3 font-medium text-white hover:bg-green-800"
        >
          Connexion
        </button>
      </form>
    </main>
  );
}