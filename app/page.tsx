import HeroSection from "@/components/home/hero-section";
import CategoriesGrid from "@/components/home/categories-grid";
import FeaturedProducts from "@/components/home/featured-products";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategoriesGrid />
      <FeaturedProducts />
    </div>
  );
}