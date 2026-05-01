"use client";

import { useEffect, useState } from "react";
import { getSavedOrders, type SavedOrder } from "@/lib/orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState<SavedOrder[]>([]);

  useEffect(() => {
    setOrders(getSavedOrders());
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
          Historique
        </p>
        <h1 className="mt-2 text-4xl font-bold text-zinc-900">
          Mes commandes
        </h1>
        <p className="mt-3 text-zinc-600">
          Voici les commandes enregistrées localement dans ce navigateur.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="text-zinc-600">Aucune commande enregistrée.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <div className="flex flex-col gap-3 border-b border-zinc-100 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">
                    Commande #{order.id.slice(0, 8)}
                  </h2>
                  <p className="text-sm text-zinc-500">
                    {new Date(order.createdAt).toLocaleString("fr-FR")}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-zinc-500">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <p className="font-bold text-zinc-900">
                    {order.totalPrice.toFixed(2)} €
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-4">
                {order.items.map((item) => (
                  <div
                    key={`${order.id}-${item.id}`}
                    className="flex items-center justify-between gap-4 rounded-xl bg-zinc-50 px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-zinc-900">{item.name}</p>
                      <p className="text-sm text-zinc-500">
                        Quantité: {item.quantity}
                      </p>
                    </div>

                    <p className="font-medium text-zinc-900">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-2 text-sm text-zinc-600 md:grid-cols-2">
                <p>Email: {order.customer.email}</p>
                <p>Téléphone: {order.customer.phone}</p>
                <p>Adresse: {order.customer.address}</p>
                <p>
                  {order.customer.postalCode} {order.customer.city}
                </p>
                <p>Livraison: {order.customer.delivery}</p>
                <p>Paiement: {order.customer.payment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}