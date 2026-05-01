"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";

type AddToCartButtonProps = {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-4">
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (value >= 1) setQuantity(value);
        }}
        className="w-24 rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none"
      />

      <button
        onClick={() =>
          addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            image: product.image,
          })
        }
        className="rounded-2xl bg-green-700 px-6 py-3 font-medium text-white hover:bg-green-800"
      >
        Ajouter au panier
      </button>
    </div>
  );
}