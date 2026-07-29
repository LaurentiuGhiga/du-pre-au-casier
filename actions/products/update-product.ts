"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  deleteProductImage,
  uploadProductImage,
} from "@/lib/product-image";

export async function updateProduct(
  productId: string,
  formData: FormData,
) {
  const currentProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      image: true,
    },
  });

  if (!currentProduct) {
    throw new Error("Produit introuvable.");
  }

  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const description = String(
    formData.get("description") ?? "",
  ).trim();

  const imageEntry = formData.get("image");

  const imageFile =
    imageEntry instanceof File && imageEntry.size > 0
      ? imageEntry
      : null;

  const priceInEuros = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const active = formData.get("active") === "on";

  if (
    !name ||
    !slug ||
    !description ||
    !Number.isFinite(priceInEuros) ||
    priceInEuros < 0 ||
    !Number.isInteger(stock) ||
    stock < 0
  ) {
    throw new Error("Données du produit invalides.");
  }

  const image = await uploadProductImage(
    imageFile,
    currentProduct.image,
  );

  await prisma.product.update({
    where: {
      id: productId,
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

  const imageWasReplaced =
    imageFile !== null && image !== currentProduct.image;

  if (imageWasReplaced) {
    try {
      await deleteProductImage(currentProduct.image);
    } catch (error) {
      console.error(
        "Impossible de supprimer l’ancienne image dans Blob:",
        error,
      );
    }
  }

  redirect("/admin/products");
}