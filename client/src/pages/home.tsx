import { motion } from "framer-motion";
import HeroSection from "@/components/home/hero-section";
import ProductCategories from "@/components/home/product-categories";
import BestSellers from "@/components/home/best-sellers";
import KeyIngredients from "@/components/home/key-ingredients";
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
      <BestSellers />
      <KeyIngredients />
      <BeforeAfter />
      <Testimonials />
    </motion.div>
  );
}
