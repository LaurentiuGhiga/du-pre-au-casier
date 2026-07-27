import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/product-form";
import { uploadProductImage } from "@/lib/product-image";

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

  async function updateProduct(formData: FormData) {
    "use server";

    const name = String(formData.get("name") ?? "").trim();
    const slug = String(formData.get("slug") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const existingImage = String(
      formData.get("existingImage") ?? "",
  ).trim();
  
  const imageEntry = formData.get("image");
  
  const imageFile =
      imageEntry instanceof File && imageEntry.size > 0
          ? imageEntry
          : null;
  
  const image = await uploadProductImage(
      imageFile,
      existingImage,
  );

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

    await prisma.product.update({
      where: {
        id,
      },
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
        action={updateProduct}
        submitLabel="Enregistrer les modifications"
        product={product}
      />
    </main>
  );
}