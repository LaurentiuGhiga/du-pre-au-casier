import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/product-form";
import { updateProduct } from "@/actions/products/update-product";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← Retour aux produits
        </Link>

        <h1 className="mt-4 text-4xl font-bold text-zinc-900">
          Modifier le produit
        </h1>

        <p className="mt-3 text-zinc-600">
          Modifiez les informations du produit.
        </p>
      </div>

      <ProductForm
        action={updateProduct.bind(null, product.id)}
        submitLabel="Enregistrer les modifications"
        product={product}
      />
    </main>
  );
}