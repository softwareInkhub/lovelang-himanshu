import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites-store";
import { toast } from "@/hooks/use-toast";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addToCart = useCartStore(state => state.addToCart);
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart`,
      duration: 3000,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wasFavorite = isFavorite(product.id);
    toggleFavorite(product);
    
    toast({
      title: wasFavorite ? "Removed from Wishlist" : "Added to Wishlist!",
      description: wasFavorite 
        ? `${product.name} has been removed from your wishlist`
        : `${product.name} has been added to your wishlist`,
      duration: 2000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group w-full h-full"
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <Link href={`/products/${product.slug}`}>
          <div className="relative">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Badge className="absolute top-4 left-4" variant="secondary">
              {product.category}
            </Badge>
            <Button
              onClick={handleToggleFavorite}
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-md"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite(product.id) 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-stone-400 hover:text-red-500'
                }`}
              />
            </Button>
          </div>
        </Link>
        
        <CardContent className="p-3 sm:p-4 lg:p-6 flex flex-col h-full">
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-sm sm:text-lg lg:text-xl font-bold mb-2 hover:text-orange-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                    i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-stone-600 text-xs sm:text-sm">({product.reviews})</span>
          </div>
          
          <p className="text-stone-600 mb-3 sm:mb-4 line-clamp-2 text-xs sm:text-sm">{product.description}</p>
          
          <div className="flex flex-col gap-2 sm:gap-3 mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600">₹{product.price}</span>
            </div>
            <Button
              onClick={handleAddToCart}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center gap-1 sm:gap-2 font-semibold shadow-md text-xs sm:text-sm"
              size="sm"
            >
              <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
