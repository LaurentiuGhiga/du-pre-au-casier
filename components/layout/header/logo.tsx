import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function HeaderLogo() {
  return (
    <Link href="/" className="shrink-0">
      <div className="flex flex-col leading-none">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-green-700">
          {siteConfig.shortName.first}
        </span>

        <span className="text-xl font-bold text-zinc-900">
          {siteConfig.shortName.second}
        </span>
      </div>
    </Link>
  );
}