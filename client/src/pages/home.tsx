import { motion } from "framer-motion";
import HeroSection from "@/components/home/hero-section";
import ProductCategories from "@/components/home/product-categories";
import ProductShowcase from "@/components/home/product-showcase";
import ProductHighlights from "@/components/home/product-highlights";
import BestSellers from "@/components/home/best-sellers";
import KeyIngredients from "@/components/home/key-ingredients";
import BrandBadges from "@/components/home/brand-badges";
import BeforeAfter from "@/components/home/before-after";
import Testimonials from "@/components/home/testimonials";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <ProductCategories />
      <ProductShowcase />
      <ProductHighlights />
      <BestSellers />
      <KeyIngredients />
      <BrandBadges />
      <BeforeAfter />
      <Testimonials />
    </motion.div>
  );
}
