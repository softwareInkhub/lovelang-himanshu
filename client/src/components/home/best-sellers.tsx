import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/product/product-grid";
import products from "@/data/products.json";

export default function BestSellers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const itemsPerPage = 3;
  
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => {
        if (selectedCategory === "hair-fall") return product.category.toLowerCase().includes("hair fall");
        if (selectedCategory === "frizz") return product.category.toLowerCase().includes("frizzy");
        if (selectedCategory === "damage") return product.category.toLowerCase().includes("damaged");
        return true;
      });
  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const currentProducts = filteredProducts.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
  };

  return (
    <section id="best-sellers" className="py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-0">Best <span className="text-orange-600 italic">Sellers</span></h2>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
                onClick={handlePrevious}
              >
                <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
                onClick={handleNext}
              >
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange("all")}
              className="text-xs lg:text-sm"
            >
              All Products
            </Button>
            <Button
              variant={selectedCategory === "hair-fall" ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange("hair-fall")}
              className="text-xs lg:text-sm"
              data-category="hair-fall"
            >
              For Hair Fall
            </Button>
            <Button
              variant={selectedCategory === "frizz" ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange("frizz")}
              className="text-xs lg:text-sm"
              data-category="frizz"
            >
              For Frizz
            </Button>
            <Button
              variant={selectedCategory === "damage" ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange("damage")}
              className="text-xs lg:text-sm"
              data-category="damage"
            >
              For Damage
            </Button>
          </div>
        </motion.div>
        
        <ProductGrid products={currentProducts} />
        
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary-600' : 'bg-stone-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
