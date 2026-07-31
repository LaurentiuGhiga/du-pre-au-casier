"use client";

import Link from "next/link";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import HeaderLogo from "./logo";
import HeaderNavigation from "./navigation";
import HeaderSearch from "./search";
import HeaderActions from "./actions";


export default function SiteHeader() {

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
                <HeaderLogo />

                <HeaderNavigation />

                {siteConfig.features.search && <HeaderSearch />}

                <HeaderActions />
            </div>
        </header>
    );
}