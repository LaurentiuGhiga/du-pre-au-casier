import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
          ✅
        </div>

        <h1 className="mt-6 text-3xl font-bold text-zinc-900">
          Commande confirmée
        </h1>

        <p className="mt-4 text-zinc-600">
          Merci pour votre commande. Votre demande a bien été enregistrée.
        </p>

        <p className="mt-2 text-zinc-600">
          Vous recevrez bientôt une confirmation et les détails du retrait ou de la livraison.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-2xl bg-green-700 px-6 py-3 font-medium text-white transition hover:bg-green-800"
          >
            Retour à l’accueil
          </Link>

          <Link
            href="/catalog"
            className="rounded-2xl border border-zinc-200 px-6 py-3 font-medium text-zinc-800 transition hover:bg-zinc-100"
          >
            Continuer les achats
          </Link>
        </div>
      </div>
    </main>
  );
}