import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/product/product-grid";
import products from "@/data/products.json";

export default function BestSellers() {
  // Get first 3 products as best sellers
  const bestSellers = products.slice(0, 3);

  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between mb-12"
        >
          <h2 className="text-4xl font-bold">Best Sellers</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="w-12 h-12 rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="sm" className="w-12 h-12 rounded-full">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
        
        <ProductGrid products={bestSellers} />
      </div>
    </section>
  );
}
