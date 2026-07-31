import Link from "next/link";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export default function HeaderNavigation() {
  return (
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
  );
}