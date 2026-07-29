"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { uploadProductImage } from "@/lib/product-image";

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  const imageEntry = formData.get("image");

  if (!(imageEntry instanceof File)) {
    throw new Error("Image du produit invalide.");
  }

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

  const image = await uploadProductImage(imageEntry);

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