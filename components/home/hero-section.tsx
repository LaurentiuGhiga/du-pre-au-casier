import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Produse locale, proaspete, direct de la producători
          </h1>

          <p className="mt-6 text-lg text-zinc-600">
            Comandă online și ridică rapid din casier.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/catalog"
              className="rounded-xl bg-green-700 px-6 py-3 text-white"
            >
              Vezi produse
            </Link>

            <Link
              href="/despre"
              className="rounded-xl border border-zinc-300 px-6 py-3"
            >
              Cum funcționează
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}