export type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  unit: string;
  badge?: string;
};

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Pommes bio",
    slug: "pommes-bio",
    price: 3.9,
    image: "/products/apples.jpg",
    unit: "/ kg",
    badge: "Local",
  },
  {
    id: 2,
    name: "Lait fermier",
    slug: "lait-fermier",
    price: 2.4,
    image: "/products/milk.jpg",
    unit: "/ L",
    badge: "Frais",
  },
  {
    id: 3,
    name: "Miel artisanal",
    slug: "miel-artisanal",
    price: 8.9,
    image: "/products/honey.jpg",
    unit: "/ pot",
    badge: "Artisanal",
  },
  {
    id: 4,
    name: "Oeufs plein air",
    slug: "oeufs-plein-air",
    price: 4.2,
    image: "/products/eggs.jpg",
    unit: "/ 6 pcs",
    badge: "Ferme locale",
  },
];