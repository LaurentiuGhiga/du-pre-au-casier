"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { saveOrder } from "@/lib/orders";

export default function CheckoutPage() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    delivery: "locker",
    payment: "card",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est obligatoire.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est obligatoire.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est obligatoire.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est obligatoire.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "L'adresse est obligatoire.";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Le code postal est obligatoire.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "La ville est obligatoire.";
    }

    if (items.length === 0) {
      newErrors.cart = "Votre panier est vide.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateForm()) return;

    const order = {
  id: crypto.randomUUID(),
  createdAt: new Date().toISOString(),
  customer: {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    postalCode: formData.postalCode,
    city: formData.city,
    delivery: formData.delivery,
    payment: formData.payment,
  },
  items,
  totalItems,
  totalPrice: total,
};

saveOrder(order);
clearCart();
router.push("/commande/succes");
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
          Checkout
        </p>
        <h1 className="mt-2 text-4xl font-bold text-zinc-900">
          Finaliser la commande
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          Renseignez vos informations pour finaliser votre commande.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-2xl border border-zinc-200 bg-white p-6"
          >
            {errors.cart ? (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {errors.cart}
              </p>
            ) : null}

            <div>
              <h2 className="text-lg font-semibold text-zinc-900">
                Informations client
              </h2>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none"
                  />
                  {errors.firstName ? (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  ) : null}
                </div>

                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none"
                  />
                  {errors.lastName ? (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  ) : null}
                </div>

                <div className="md:col-span-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none"
                  />
                  {errors.email ? (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="md:col-span-2">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Téléphone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none"
                  />
                  {errors.phone ? (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-zinc-900">
                Adresse
              </h2>

              <div className="mt-4 grid gap-4">
                <div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Adresse"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none"
                  />
                  {errors.address ? (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.address}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Code postal"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none"
                    />
                    {errors.postalCode ? (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.postalCode}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="city"
                      placeholder="Ville"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none"
                    />
                    {errors.city ? (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.city}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-zinc-900">
                Livraison
              </h2>

              <div className="mt-4 grid gap-4">
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 p-4">
                  <input
                    type="radio"
                    name="delivery"
                    value="locker"
                    checked={formData.delivery === "locker"}
                    onChange={handleChange}
                  />
                  <div>
                    <p className="font-medium text-zinc-900">
                      Retrait en casier
                    </p>
                    <p className="text-sm text-zinc-600">
                      Retrait rapide au point de collecte
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 p-4">
                  <input
                    type="radio"
                    name="delivery"
                    value="delivery"
                    checked={formData.delivery === "delivery"}
                    onChange={handleChange}
                  />
                  <div>
                    <p className="font-medium text-zinc-900">
                      Livraison locale
                    </p>
                    <p className="text-sm text-zinc-600">
                      Livraison à domicile selon votre zone
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-zinc-900">
                Paiement
              </h2>

              <div className="mt-4 grid gap-4">
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 p-4">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.payment === "card"}
                    onChange={handleChange}
                  />
                  <div>
                    <p className="font-medium text-zinc-900">
                      Carte bancaire
                    </p>
                    <p className="text-sm text-zinc-600">
                      Paiement sécurisé en ligne
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 p-4">
                  <input
                    type="radio"
                    name="payment"
                    value="pickup"
                    checked={formData.payment === "pickup"}
                    onChange={handleChange}
                  />
                  <div>
                    <p className="font-medium text-zinc-900">
                      Paiement au retrait
                    </p>
                    <p className="text-sm text-zinc-600">
                      À régler lors de la récupération
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-green-700 px-6 py-3 font-medium text-white transition hover:bg-green-800"
            >
              Confirmer la commande
            </button>
          </form>
        </div>

        <div>
          <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-zinc-900">
              Résumé de commande
            </h2>

            <div className="mt-6 space-y-4">
              {items.length === 0 ? (
                <p className="text-sm text-zinc-600">
                  Votre panier est vide.
                </p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 border-b border-zinc-100 pb-4"
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
                ))
              )}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm text-zinc-600">
                <span>Articles</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between text-sm text-zinc-600">
                <span>Livraison</span>
                <span>Calculée plus tard</span>
              </div>

              <div className="flex justify-between border-t border-zinc-200 pt-4 text-base font-bold text-zinc-900">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}