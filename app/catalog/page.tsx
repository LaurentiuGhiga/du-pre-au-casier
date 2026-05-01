import { mockProducts } from "@/data/mock-products";
import ProductCard from "@/components/home/product-card";

export default function CatalogPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
          Catalogue
        </p>
        <h1 className="mt-2 text-4xl font-bold text-zinc-900">
          Tous nos produits
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          Découvrez notre sélection de produits locaux, frais et artisanaux.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full bg-green-700 px-4 py-2 text-sm font-medium text-white">
            Tous
          </button>
          <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700">
            Fruits & Légumes
          </button>
          <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700">
            Produits laitiers
          </button>
          <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700">
            Miel
          </button>
          <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700">
            Œufs
          </button>
        </div>

        <div>
          <select className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 outline-none">
            <option>Trier par</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
            <option>Les plus populaires</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}