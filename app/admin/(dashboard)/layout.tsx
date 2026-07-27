import Link from "next/link";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="flex min-h-screen">
        <aside className="w-64 border-r border-zinc-200 bg-white p-6">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
              Du Pré au Casier
            </p>

            <h2 className="mt-1 text-xl font-bold text-zinc-900">
              Administration
            </h2>
          </div>

          <nav className="space-y-2">
            <Link
              href="/admin/orders"
              className="block rounded-xl px-4 py-3 font-medium text-zinc-700 hover:bg-zinc-100"
            >
              Commandes
            </Link>

            <Link
              href="/admin/products"
              className="block rounded-xl px-4 py-3 font-medium text-zinc-700 hover:bg-zinc-100"
            >
              Produits
            </Link>
          </nav>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}