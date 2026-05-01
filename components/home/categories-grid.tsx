import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Fructe & Legume",
    image: "/categories/fruits.jpg",
    href: "/catalog",
  },
  {
    name: "Lactate",
    image: "/categories/dairy.jpg",
    href: "/catalog",
  },
  {
    name: "Miere & Dulcețuri",
    image: "/categories/honey.jpg",
    href: "/catalog",
  },
  {
    name: "Carne artizanală",
    image: "/categories/meat.jpg",
    href: "/catalog",
  },
];

export default function CategoriesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="mb-8 text-2xl font-bold">Categorii</h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="group relative overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
  <Image
    src={cat.image}
    alt={cat.name}
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
    className="object-cover transition group-hover:scale-110"
  />
</div>

            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

            <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
              {cat.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}