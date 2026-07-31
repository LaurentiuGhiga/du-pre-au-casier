import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteProductButton from "@/components/admin/delete-product-button";
import { deleteProduct } from "@/actions/products/delete-product";
import PageHeader from "@/components/ui/page-header";
import ButtonLink from "@/components/ui/button-link";
import DataTable from "@/components/ui/data-table";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <PageHeader
        eyebrow="Admin"
        title="Produits"
        description="Gestion des produits disponibles dans la boutique."
        actions={
          <ButtonLink href="/admin/products/new">
            Nouveau produit
          </ButtonLink>
        }
      />

      {products.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="text-zinc-600">Aucun produit pour le moment.</p>
        </div>
      ) : (
        <DataTable>
            <thead className="border-b border-zinc-200 bg-zinc-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">
                  Image
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">
                  Nom
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">
                  Prix
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">
                  Stock
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">
                  Statut
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-zinc-100 last:border-b-0"
                >
                  <td className="px-6 py-4">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-16 w-16 rounded-xl border border-zinc-200 object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 text-xs text-zinc-400">
                        Aucune
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 font-medium text-zinc-900">
                    {product.name}
                  </td>

                  <td className="px-6 py-4 text-zinc-700">
                    {(product.price / 100).toFixed(2)} €
                  </td>

                  <td className="px-6 py-4 text-zinc-700">
                    {product.stock}
                  </td>

                  <td className="px-6 py-4">
                    {product.active ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                        Actif
                      </span>
                    ) : (
                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700">
                        Inactif
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                      >
                        Modifier
                      </Link>

                      <DeleteProductButton
                        productName={product.name}
                        action={deleteProduct.bind(null, product.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
        </DataTable>
      )}
    </main>
  );
}