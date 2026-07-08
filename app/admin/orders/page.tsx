import { prisma } from "@/lib/prisma";
import OrderStatusSelect from "@/components/admin/order-status-select";
import AdminLogoutButton from "@/components/admin/admin-logout-button";
export const dynamic = "force-dynamic";

type OrderWithItems = {
  id: string;
  stripeId: string;
  email: string;
  amount: number;
  status: string;
  createdAt: Date;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    orderId: string;
  }[];
};

export default async function AdminOrdersPage() {
  const orders: OrderWithItems[] = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: true,
    },
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
          Admin
        </p>
        <div className="mt-2 flex items-center justify-between gap-4">
  <h1 className="text-4xl font-bold text-zinc-900">Commandes</h1>
  <AdminLogoutButton />
</div>
        <p className="mt-3 text-zinc-600">
          Liste des commandes payées via Stripe.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="text-zinc-600">Aucune commande pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 border-b border-zinc-100 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900">
                    Commande #{order.id.slice(0, 8)}
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Stripe: {order.stripeId}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    {new Date(order.createdAt).toLocaleString("fr-FR")}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-sm text-zinc-600">{order.email}</p>

                  <p className="mt-1 text-xl font-bold text-zinc-900">
                    {(order.amount / 100).toFixed(2)} €
                  </p>

                  <div className="mt-3">
                    <OrderStatusSelect
                      orderId={order.id}
                      currentStatus={order.status}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                  Produits
                </h3>

                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3"
                    >
                      <div>
                        <p className="font-medium text-zinc-900">
                          {item.name}
                        </p>
                        <p className="text-sm text-zinc-500">
                          Quantité: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold text-zinc-900">
                        {((item.price * item.quantity) / 100).toFixed(2)} €
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}