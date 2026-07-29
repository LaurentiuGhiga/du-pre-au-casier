"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { deleteProductImage } from "@/lib/product-image";

export async function deleteProduct(productId: string) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      image: true,
    },
  });

  if (!product) {
    throw new Error("Produit introuvable.");
  }

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  if (product.image) {
    try {
      await deleteProductImage(product.image);
    } catch (error) {
      console.error(
        "Impossible de supprimer l’image du produit dans Blob:",
        error,
      );
    }
  }

  revalidatePath("/admin/products");
}