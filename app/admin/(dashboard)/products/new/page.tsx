import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/product-form";
import { uploadProductImage } from "@/lib/product-image";

async function createProduct(formData: FormData) {
  "use server";

  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const imageFile = formData.get("image");

if (!(imageFile instanceof File)) {
    throw new Error("Image du produit invalide.");
}

const image = await uploadProductImage(imageFile);

  const priceInEuros = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const active = formData.get("active") === "on";

  if (
    !name ||
    !slug ||
    !description ||
    !image ||
    !Number.isFinite(priceInEuros) ||
    priceInEuros < 0 ||
    !Number.isInteger(stock) ||
    stock < 0
  ) {
    throw new Error("Données du produit invalides.");
  }

  await prisma.product.create({
    data: {
      name,
      slug,
      description,
      image,
      price: Math.round(priceInEuros * 100),
      stock,
      active,
    },
  });

  redirect("/admin/products");
}

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