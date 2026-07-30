import Link from "next/link";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">
              {siteConfig.name}
            </h3>

            <p className="mt-4 text-sm text-zinc-600">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900">
              Navigation
            </h4>

            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-zinc-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900">
              Infos
            </h4>

            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              {siteConfig.footer.information.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900">
              Contact
            </h4>

            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              {siteConfig.contact.email && (
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="transition hover:text-zinc-900"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
              )}

              {siteConfig.contact.phone && (
                <li>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                    className="transition hover:text-zinc-900"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
              )}

              {siteConfig.contact.location && (
                <li>{siteConfig.contact.location}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500">
          © {currentYear} {siteConfig.name} — Tous droits réservés
        </div>
      </div>
    </footer>
  );
}