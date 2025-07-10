import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useFavoritesStore } from "@/store/favorites-store";
import { useCartStore } from "@/store/cart-store";
import { toast } from "@/hooks/use-toast";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { favorites, removeFromFavorites } = useFavoritesStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromFavorites(productId);
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist",
    });
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
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  Wishlist
                </h3>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {favorites.length === 0 ? (
                <div className="text-center py-8 text-stone-500">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-stone-300" />
                  <p className="text-lg font-medium mb-2">Your wishlist is empty</p>
                  <p className="text-sm">Save items you love to view them here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {favorites.map((product) => (
                    <div key={product.id} className="flex items-center space-x-3 p-3 lg:p-4 border rounded-lg">
                      <Link href={`/products/${product.slug}`} onClick={onClose}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      </Link>
                      <div className="flex-1">
                        <Link href={`/products/${product.slug}`} onClick={onClose}>
                          <h4 className="font-semibold text-sm lg:text-base hover:text-primary-600 transition-colors cursor-pointer">
                            {product.name}
                          </h4>
                        </Link>
                        <p className="text-stone-600 text-xs lg:text-sm">{product.category}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-primary-600">₹{product.price}</span>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAddToCart(product)}
                              className="text-primary-600 hover:bg-primary-50"
                            >
                              <ShoppingCart className="w-3 h-3 mr-1" />
                              Add to Cart
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveFromWishlist(product.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              title="Remove from wishlist"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {favorites.length > 0 && (
              <div className="border-t p-6">
                <p className="text-sm text-stone-600 text-center mb-4">
                  {favorites.length} item{favorites.length !== 1 ? 's' : ''} in your wishlist
                </p>
                <Button
                  className="w-full bg-pink-500 hover:bg-pink-600"
                  onClick={() => {
                    favorites.forEach(product => handleAddToCart(product));
                    onClose();
                  }}
                >
                  Add All to Cart
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}