import Button from "@/components/ui/button";
import ButtonLink from "@/components/ui/button-link";

type ProductFormProps = {
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  product?: {
    name: string;
    slug: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    active: boolean;
  };
};

export default function ProductForm({
  action,
  submitLabel,
  product,
}: ProductFormProps) {
  return (
    <form
      action={action}
      className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block font-medium text-zinc-900"
        >
          Nom
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={product?.name}
          className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-green-700"
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="mb-2 block font-medium text-zinc-900"
        >
          Slug
        </label>

        <input
          id="slug"
          name="slug"
          type="text"
          required
          defaultValue={product?.slug}
          placeholder="miel-de-printemps"
          className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-green-700"
        />

        <p className="mt-2 text-sm text-zinc-500">
          Utilisé dans l’adresse du produit. Exemple : miel-de-printemps
        </p>
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block font-medium text-zinc-900"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          required
          rows={6}
          defaultValue={product?.description}
          className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-green-700"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="price"
            className="mb-2 block font-medium text-zinc-900"
          >
            Prix en euros
          </label>

          <input
            id="price"
            name="price"
            type="number"
            required
            min="0"
            step="0.01"
            defaultValue={product ? product.price / 100 : undefined}
            placeholder="8.50"
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-green-700"
          />
        </div>

        <div>
          <label
            htmlFor="stock"
            className="mb-2 block font-medium text-zinc-900"
          >
            Stock
          </label>

          <input
            id="stock"
            name="stock"
            type="number"
            required
            min="0"
            step="1"
            defaultValue={product?.stock ?? 0}
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-green-700"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="image"
          className="mb-2 block font-medium text-zinc-900"
        >
          Image du produit
        </label>

<input
  id="image"
  name="image"
  type="file"
  accept="image/jpeg,image/png,image/webp,image/avif"
  required={!product}
  className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-zinc-700 file:mr-4 file:rounded-lg file:border-0 file:bg-green-50 file:px-4 file:py-2 file:font-medium file:text-green-800 hover:file:bg-green-100"
/>

{product?.image && (
          <>
            <input
              type="hidden"
              name="existingImage"
              value={product.image}
            />

            <div className="mt-4">
              <p className="mb-2 text-sm font-medium text-zinc-700">
                Image actuelle
              </p>

              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-40 rounded-xl border border-zinc-200 object-cover"
              />
            </div>
          </>
        )}

        <p className="mt-2 text-sm text-zinc-500">
          Formats acceptés : JPG, PNG, WebP ou AVIF. Taille maximale : 4 Mo.
        </p>

        {product && (
          <p className="mt-1 text-sm text-zinc-500">
            Laissez ce champ vide pour conserver l’image actuelle.
          </p>
        )}
      </div>

      <label className="flex items-center gap-3">
        <input
          name="active"
          type="checkbox"
          defaultChecked={product?.active ?? true}
          className="h-5 w-5"
        />

        <span className="font-medium text-zinc-900">
          Produit actif dans la boutique
        </span>
      </label>

      <div className="flex justify-end gap-3 border-t border-zinc-200 pt-6">
        <ButtonLink
          href="/admin/products"
          variant="secondary"
          size="lg"
        >
          Annuler
        </ButtonLink>

        <Button type="submit" size="lg">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}