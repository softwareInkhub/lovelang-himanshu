import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Heart, 
  Package, 
  TrendingUp, 
  User, 
  Settings,
  ArrowRight
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites-store";
import { Link } from "wouter";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { items } = useCartStore();
  const { favorites } = useFavoritesStore();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-stone-600 mb-6">Please log in to access your dashboard.</p>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-2">
              Welcome back, <span className="text-orange-600">{user?.name || 'User'}</span>!
            </h1>
            <p className="text-stone-600">Manage your hair care journey with LoveLang</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Cart Value</p>
                      <p className="text-2xl font-bold">₹{totalValue}</p>
                    </div>
                    <ShoppingBag className="w-8 h-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-pink-100 text-sm">Wishlist Items</p>
                      <p className="text-2xl font-bold">{favorites.length}</p>
                    </div>
                    <Heart className="w-8 h-8 text-pink-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Cart Items</p>
                      <p className="text-2xl font-bold">{totalItems}</p>
                    </div>
                    <Package className="w-8 h-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Cart Items */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-orange-600" />
                    Your Cart
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {items.length > 0 ? (
                    <div className="space-y-4">
                      {items.slice(0, 3).map((item) => (
                        <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-4 p-3 bg-stone-50 rounded-lg">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.product.name}</h4>
                            <p className="text-stone-600 text-xs">Qty: {item.quantity} • ₹{item.product.price}</p>
                          </div>
                        </div>
                      ))}
                      {items.length > 3 && (
                        <p className="text-stone-600 text-sm text-center">
                          +{items.length - 3} more items
                        </p>
                      )}
                      <Link href="/cart">
                        <Button className="w-full" variant="outline">
                          View Full Cart <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                      <p className="text-stone-600">Your cart is empty</p>
                      <Link href="/">
                        <Button className="mt-4" size="sm">Start Shopping</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Wishlist Items */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-600" />
                    Your Wishlist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {favorites.length > 0 ? (
                    <div className="space-y-4">
                      {favorites.slice(0, 3).map((product) => (
                        <div key={product.id} className="flex items-center gap-4 p-3 bg-stone-50 rounded-lg">
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{product.name}</h4>
                            <p className="text-stone-600 text-xs">₹{product.price}</p>
                          </div>
                        </div>
                      ))}
                      {favorites.length > 3 && (
                        <p className="text-stone-600 text-sm text-center">
                          +{favorites.length - 3} more items
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                      <p className="text-stone-600">Your wishlist is empty</p>
                      <Link href="/">
                        <Button className="mt-4" size="sm">Browse Products</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link href="/">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                      <Package className="w-6 h-6" />
                      <span className="text-sm">Browse Products</span>
                    </Button>
                  </Link>
                  <Link href="/hair-concerns/frizz">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                      <TrendingUp className="w-6 h-6" />
                      <span className="text-sm">Anti-Frizz Care</span>
                    </Button>
                  </Link>
                  <Link href="/hair-concerns/hair-fall">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                      <Heart className="w-6 h-6" />
                      <span className="text-sm">Hair Fall Care</span>
                    </Button>
                  </Link>
                  <Link href="/hair-concerns/damage">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                      <Settings className="w-6 h-6" />
                      <span className="text-sm">Damage Repair</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{user?.name || 'User'}</h3>
                    <p className="text-stone-600">{user?.email || 'Email not available'}</p>
                    <Badge variant="secondary" className="mt-2">
                      LoveLang Member
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}