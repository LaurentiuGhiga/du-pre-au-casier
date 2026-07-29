import { del, put } from "@vercel/blob";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
];

export async function uploadProductImage(
    file: File | null,
    existingImage?: string,
) {
    if (!file || file.size === 0) {
        if (existingImage) {
            return existingImage;
        }

        throw new Error("Veuillez sélectionner une image.");
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        throw new Error(
            "Format d’image non accepté. Utilisez JPG, PNG, WebP ou AVIF.",
        );
    }

    if (file.size > MAX_IMAGE_SIZE) {
        throw new Error("L’image ne doit pas dépasser 4 Mo.");
    }

    const blob = await put(`products/${file.name}`, file, {
        access: "public",
        addRandomSuffix: true,
    });

    return blob.url;
}

export async function deleteProductImage(imageUrl: string) {
    if (!imageUrl) {
        return;
    }

    await del(imageUrl);
}