"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type OrderStatusSelectProps = {
  orderId: string;
  currentStatus: string;
};

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: OrderStatusSelectProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function updateStatus(newStatus: string) {
    setStatus(newStatus);
    setLoading(true);

    await fetch(`/api/admin/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    setLoading(false);
    router.refresh();
  }

  return (
    <select
      value={status}
      disabled={loading}
      onChange={(e) => updateStatus(e.target.value)}
      className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none"
    >
      <option value="paid">Payée</option>
      <option value="preparing">En préparation</option>
      <option value="ready">Prête</option>
      <option value="delivered">Livrée</option>
    </select>
  );
}