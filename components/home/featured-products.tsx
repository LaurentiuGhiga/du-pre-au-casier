import { mockProducts } from "@/data/mock-products";
import ProductCard from "@/components/home/product-card";

export default function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Sélection
          </p>
          <h2 className="text-2xl font-bold text-zinc-900">
            Produits populaires
          </h2>
        </div>

        <a
          href="/catalog"
          className="text-sm font-medium text-zinc-700 transition hover:text-zinc-900"
        >
          Voir tout
        </a>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}