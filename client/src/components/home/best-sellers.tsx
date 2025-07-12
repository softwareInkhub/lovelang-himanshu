import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/product/product-grid";
import products from "@/data/products.json";

export default function BestSellers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Define all categories for cycling
  const categories = ["all", "hair-fall", "frizz", "damage"];
  
  // Dynamic items per page: show more for "All Products", fewer for specific categories
  const getItemsPerPage = () => {
    return selectedCategory === "all" ? 4 : 2;
  };
  
  const itemsPerPage = getItemsPerPage();
  
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
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      // Go to previous category and its last page
      const currentCategoryIndex = categories.indexOf(selectedCategory);
      const prevCategory = currentCategoryIndex > 0 
        ? categories[currentCategoryIndex - 1] 
        : categories[categories.length - 1];
      
      setSelectedCategory(prevCategory);
      
      // Calculate pages for the new category with dynamic items per page
      const prevCategoryProducts = prevCategory === "all" 
        ? products 
        : products.filter(product => {
            if (prevCategory === "hair-fall") return product.category.toLowerCase().includes("hair fall");
            if (prevCategory === "frizz") return product.category.toLowerCase().includes("frizzy");
            if (prevCategory === "damage") return product.category.toLowerCase().includes("damaged");
            return true;
          });
      
      const prevCategoryItemsPerPage = prevCategory === "all" ? 4 : 2;
      const prevCategoryPages = Math.ceil(prevCategoryProducts.length / prevCategoryItemsPerPage);
      setCurrentIndex(Math.max(0, prevCategoryPages - 1));
    }
  };

  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Go to next category and first page
      const currentCategoryIndex = categories.indexOf(selectedCategory);
      const nextCategory = currentCategoryIndex < categories.length - 1 
        ? categories[currentCategoryIndex + 1] 
        : categories[0];
      
      setSelectedCategory(nextCategory);
      setCurrentIndex(0);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentIndex(0); // Always reset to first page when changing categories
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
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full transition-all ${
                  totalPages <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-50 hover:border-orange-300'
                }`}
                onClick={handlePrevious}
                disabled={totalPages <= 1}
              >
                <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full transition-all ${
                  totalPages <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-50 hover:border-orange-300'
                }`}
                onClick={handleNext}
                disabled={totalPages <= 1}
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
        
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-125 ${
                  index === currentIndex ? 'bg-orange-600' : 'bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Show current page and category info */}
        <div className="text-center mt-4 text-sm text-stone-600">
          {totalPages > 1 ? (
            <>Page {currentIndex + 1} of {totalPages} • </>
          ) : null}
          {selectedCategory === "all" && "All Products"}
          {selectedCategory === "hair-fall" && "For Hair Fall"}
          {selectedCategory === "frizz" && "For Frizz"}
          {selectedCategory === "damage" && "For Damage"}
        </div>
      </div>
    </section>
  );
}
