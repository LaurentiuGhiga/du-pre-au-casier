"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { useState } from "react";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const [loading, setLoading] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!hasHydrated) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold text-zinc-900">Panier</h1>
        <p className="text-zinc-600">Chargement...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-zinc-900">Panier</h1>

        {items.length > 0 ? (
          <button
            onClick={clearCart}
            className="rounded-xl border border-zinc-200 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
          >
            Vider le panier
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <p className="text-zinc-600">Votre panier est vide.</p>
      ) : (
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4"
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-xl">
                  <Image
  src={item.image}
  alt={item.name}
  fill
  sizes="96px"
  className="object-cover"
/>
                </div>

                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-zinc-900">{item.name}</h2>
                    <p className="text-sm text-zinc-500">
                      Prix unitaire: {item.price.toFixed(2)} €
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200"
                      >
                        -
                      </button>

                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (!isNaN(value)) updateQuantity(item.id, value);
                        }}
                        className="w-20 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-center outline-none"
                      />

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="font-bold text-zinc-900">
                        {(item.price * item.quantity).toFixed(2)} €
                      </p>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm font-medium text-red-500 hover:underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-zinc-900">Résumé</h2>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-zinc-600">
                <span>Articles</span>
                <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>

              <div className="flex justify-between text-zinc-600">
                <span>Total</span>
                <span className="font-bold text-zinc-900">{total.toFixed(2)} €</span>
              </div>
            </div>

            <button
  onClick={async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        alert("Erreur lors de la création du paiement.");
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  }}
  className="mt-6 block w-full rounded-2xl bg-green-700 px-6 py-3 text-center font-medium text-white hover:bg-green-800 disabled:opacity-60"
  disabled={items.length === 0 || loading}
>
  {loading ? "Redirection..." : "Commander"}
</button>
          </div>
        </div>
      )}
    </main>
  );
}