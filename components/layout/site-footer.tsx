import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-zinc-900">
              Du Pré au Casier
            </h3>
            <p className="mt-4 text-sm text-zinc-600">
              Produse locale, proaspete, direct de la producători.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900">Navigation</h4>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li><Link href="/catalog">Produits</Link></li>
              <li><Link href="/producteurs">Producteurs</Link></li>
              <li><Link href="/a-propos">À propos</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Infos */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900">Infos</h4>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li>Livraison locale</li>
              <li>Retrait en casier</li>
              <li>Paiement sécurisé</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li>Email: contact@dupreaucasier.fr</li>
              <li>Tél: 06 00 00 00 00</li>
              <li>Rennes, France</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Du Pré au Casier — Tous droits réservés
        </div>
      </div>
    </footer>
  );
}