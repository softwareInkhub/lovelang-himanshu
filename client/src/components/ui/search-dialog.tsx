import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import products from "@/data/products.json";
import { Product } from "@/types/product";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  
  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleProductClick = () => {
    setQuery("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-50 mx-4"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Search Products</h3>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <Input
                  placeholder="Search for shampoos, masks, serums..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10"
                  autoFocus
                />
              </div>
              
              {query && (
                <div className="max-h-96 overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    <div className="space-y-3">
                      {filteredProducts.slice(0, 6).map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          onClick={handleProductClick}
                        >
                          <div className="flex items-center gap-4 p-3 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{product.name}</h4>
                              <p className="text-stone-600 text-xs">{product.category}</p>
                            </div>
                            <span className="font-bold text-primary-600">₹{product.price}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-stone-500">
                      <Search className="w-12 h-12 mx-auto mb-4 text-stone-300" />
                      <p>No products found matching "{query}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}