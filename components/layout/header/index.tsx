"use client";

import Link from "next/link";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/store/cart-store";
import HeaderLogo from "./logo";

export default function SiteHeader() {
    const items = useCartStore((state) => state.items);
    const hasHydrated = useCartStore((state) => state.hasHydrated);

    const totalQuantity = items.reduce(
        (sum, item) => sum + item.quantity,
        0,
    );

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
                <HeaderLogo />

                <nav className="hidden items-center gap-6 lg:flex">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
                        >
                            {item.label}
                        </Link>
                    ))}

                    {siteConfig.features.adminLink && (
                        <Link
                            href="/admin/orders"
                            className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
                        >
                            Admin
                        </Link>
                    )}
                </nav>

                {siteConfig.features.search && (
                    <div className="hidden max-w-md flex-1 items-center lg:flex">
                        <div className="flex w-full items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-3">
                            <Search className="h-4 w-4 text-zinc-500" />

                            <input
                                type="text"
                                placeholder="Rechercher un produit..."
                                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
                            />
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    {siteConfig.features.account && (
                        <button
                            type="button"
                            aria-label="Compte utilisateur"
                            className="hidden rounded-full border border-zinc-200 p-3 text-zinc-700 hover:bg-zinc-100 md:inline-flex"
                        >
                            <User className="h-5 w-5" />
                        </button>
                    )}

                    {siteConfig.features.cart && (
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
                    )}

                    <button
                        type="button"
                        aria-label="Ouvrir le menu"
                        className="rounded-full border border-zinc-200 p-3 text-zinc-700 hover:bg-zinc-100 lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}