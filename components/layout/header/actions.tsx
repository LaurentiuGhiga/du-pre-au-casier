"use client";

import { Menu } from "lucide-react";
import { siteConfig } from "@/config/site";
import AccountButton from "./account-button";
import CartButton from "./cart-button";

export default function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
      {siteConfig.features.account && <AccountButton />}

      {siteConfig.features.cart && <CartButton />}

      <button
        type="button"
        aria-label="Ouvrir le menu"
        className="rounded-full border border-zinc-200 p-3 text-zinc-700 hover:bg-zinc-100 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
    </div>
  );
}