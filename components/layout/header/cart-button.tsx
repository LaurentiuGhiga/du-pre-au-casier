"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function CartButton() {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <Link
      href="/cart"
      aria-label="Panier"
      className="relative rounded-full border border-zinc-200 p-3 text-zinc-700 hover:bg-zinc-100"
    >
      <ShoppingCart className="h-5 w-5" />

      {hasHydrated && totalQuantity > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-700 px-1 text-[10px] font-bold text-white">
          {totalQuantity}
        </span>
      ) : null}
    </Link>
  );
}