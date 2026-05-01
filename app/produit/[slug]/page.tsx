import Image from "next/image";
import { notFound } from "next/navigation";
import { mockProducts } from "@/data/mock-products";
import AddToCartButton from "@/components/product/add-to-cart-button";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = mockProducts.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-white">
          <Image
  src={product.image}
  alt={product.name}
  fill
  sizes="(max-width: 1024px) 100vw, 50vw"
  className="object-cover"
/>
        </div>

        <div className="flex flex-col justify-center">
          {product.badge ? (
            <span className="mb-4 inline-flex w-fit rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
              {product.badge}
            </span>
          ) : null}

          <h1 className="text-4xl font-bold text-zinc-900">{product.name}</h1>

          <p className="mt-4 text-lg text-zinc-600">
            Produit local soigneusement sélectionné pour sa fraîcheur, sa qualité et son goût authentique.
          </p>

          <div className="mt-6 text-3xl font-bold text-zinc-900">
            {product.price.toFixed(2)} €
            <span className="ml-2 text-base font-medium text-zinc-500">
              {product.unit}
            </span>
          </div>

          <div className="mt-8 flex items-center gap-4">

            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}