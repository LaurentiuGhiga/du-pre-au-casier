import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/mock-products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/produit/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
  src={product.image}
  alt={product.name}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
  className="object-cover transition duration-300 group-hover:scale-105"
/>
          {product.badge ? (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-800">
              {product.badge}
            </span>
          ) : null}
        </div>

        <div className="space-y-3 p-4">
          <h3 className="text-lg font-semibold text-zinc-900">{product.name}</h3>

          <div className="flex items-end justify-between gap-3">
            <p className="text-xl font-bold text-zinc-900">
              {product.price.toFixed(2)} €
              <span className="ml-1 text-sm font-medium text-zinc-500">
                {product.unit}
              </span>
            </p>

            <span className="rounded-xl bg-green-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-800">
              Voir
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}