import Link from "next/link";
import ProductForm from "@/components/admin/product-form";
import { createProduct } from "@/actions/products/create-product";

export default function NewProductPage() {
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
          Nouveau produit
        </h1>

        <p className="mt-3 text-zinc-600">
          Ajoutez un nouveau produit à la boutique.
        </p>
      </div>

      <ProductForm action={createProduct} submitLabel="Enregistrer" />
    </main>
  );
}