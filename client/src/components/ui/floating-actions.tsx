import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Plus, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites-store";
import WishlistDrawer from "@/components/wishlist/wishlist-drawer";

export default function FloatingActions() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { items, toggleDrawer } = useCartStore();
  const { favorites } = useFavoritesStore();
  
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favorites.length;

  const handleCartClick = () => {
    toggleDrawer();
    setIsExpanded(false);
  };

  const handleWishlistClick = () => {
    setIsWishlistOpen(true);
    setIsExpanded(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="flex flex-col gap-3 mb-3"
            >
              {/* Wishlist Button */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Button
                  onClick={handleWishlistClick}
                  className="relative h-12 w-12 rounded-full bg-pink-500 hover:bg-pink-600 shadow-lg"
                  size="sm"
                >
                  <Heart className="w-5 h-5 text-white" />
                  {favoritesCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                      {favoritesCount}
                    </Badge>
                  )}
                </Button>
              </motion.div>

              {/* Cart Button */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  onClick={handleCartClick}
                  className="relative h-12 w-12 rounded-full bg-primary-600 hover:bg-primary-700 shadow-lg"
                  size="sm"
                >
                  <ShoppingCart className="w-5 h-5 text-white" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`h-14 w-14 rounded-full shadow-lg transition-all duration-200 ${
              isExpanded 
                ? "bg-gray-600 hover:bg-gray-700" 
                : "bg-gradient-to-r from-primary-500 to-pink-500 hover:from-primary-600 hover:to-pink-600"
            }`}
            size="sm"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Plus className="w-6 h-6 text-white" />
              )}
            </motion.div>
          </Button>
        </motion.div>
      </div>

      {/* Wishlist Drawer */}
      <WishlistDrawer 
        isOpen={isWishlistOpen} 
        onClose={() => setIsWishlistOpen(false)} 
      />
    </>
  );
}