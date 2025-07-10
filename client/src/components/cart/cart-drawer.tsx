import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function CartDrawer() {
  const { items, isOpen, toggleDrawer, removeFromCart, updateQuantity, total } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={toggleDrawer}
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
                <h3 className="text-xl font-bold">Shopping Cart</h3>
                <Button variant="ghost" size="sm" onClick={toggleDrawer}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-8 text-stone-500">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-stone-300" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size || 'default'}`} className="flex items-center space-x-3 p-3 lg:p-4 border rounded-lg">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm lg:text-base">{item.product.name}</h4>
                        <p className="text-stone-600 text-xs lg:text-sm">{item.product.category}</p>
                        {item.size && (
                          <p className="text-stone-600 text-sm">Size: {item.size}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-primary-600">₹{item.product.price * item.quantity}</span>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.product.id, item.size || 'default', Math.max(1, item.quantity - 1))}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.product.id, item.size || 'default', item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {items.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary-600">₹{total}</span>
                </div>
                <Button
                  asChild
                  className="w-full bg-primary-600 hover:bg-primary-700"
                  onClick={toggleDrawer}
                >
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
