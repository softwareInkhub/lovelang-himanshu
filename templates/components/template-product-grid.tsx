import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

interface TemplateProductGridProps {
  products: Product[];
  title?: string;
  theme?: 'default' | 'beauty' | 'fashion' | 'food' | 'electronics' | 'minimal';
  layout?: 'grid' | 'horizontal-scroll';
  showFilters?: boolean;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
}

export default function TemplateProductGrid({
  products,
  title = "Products",
  theme = 'default',
  layout = 'grid',
  showFilters = false,
  onProductClick,
  onAddToCart,
  onToggleWishlist
}: TemplateProductGridProps) {
  const themeClasses = {
    default: {
      accent: 'text-orange-600',
      button: 'bg-orange-600 hover:bg-orange-700',
      badge: 'bg-orange-100 text-orange-800',
      card: 'hover:shadow-orange-100'
    },
    beauty: {
      accent: 'text-pink-600',
      button: 'bg-pink-600 hover:bg-pink-700',
      badge: 'bg-pink-100 text-pink-800',
      card: 'hover:shadow-pink-100'
    },
    fashion: {
      accent: 'text-gray-800',
      button: 'bg-gray-900 hover:bg-gray-800',
      badge: 'bg-gray-100 text-gray-800',
      card: 'hover:shadow-gray-100'
    },
    food: {
      accent: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700',
      badge: 'bg-red-100 text-red-800',
      card: 'hover:shadow-red-100'
    },
    electronics: {
      accent: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700',
      badge: 'bg-blue-100 text-blue-800',
      card: 'hover:shadow-blue-100'
    },
    minimal: {
      accent: 'text-black',
      button: 'bg-black hover:bg-gray-800',
      badge: 'bg-gray-100 text-gray-800',
      card: 'hover:shadow-gray-100'
    }
  };

  const classes = themeClasses[theme];

  const containerClass = layout === 'horizontal-scroll' 
    ? "flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

  const itemClass = layout === 'horizontal-scroll'
    ? "flex-shrink-0 min-w-[280px] sm:min-w-[320px]"
    : "";

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {title.split(' ').map((word, index) => (
                index === title.split(' ').length - 1 ? (
                  <span key={index} className={`italic ${classes.accent}`}>
                    {word}
                  </span>
                ) : (
                  <span key={index}>{word} </span>
                )
              ))}
            </h2>
          </motion.div>
        )}

        <div className={containerClass}>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className={itemClass}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className={`overflow-hidden shadow-lg hover:shadow-xl ${classes.card} transition-all duration-300 h-full flex flex-col cursor-pointer`}>
                <div 
                  className="relative"
                  onClick={() => onProductClick(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-green-500 text-white">New</Badge>
                    )}
                    {product.isSale && (
                      <Badge className="bg-red-500 text-white">Sale</Badge>
                    )}
                    {!product.inStock && (
                      <Badge variant="secondary">Out of Stock</Badge>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-md"
                  >
                    <Heart className="w-4 h-4 text-stone-400 hover:text-red-500 transition-colors" />
                  </Button>
                </div>

                <CardContent className="p-3 sm:p-4 lg:p-6 flex flex-col h-full">
                  <div 
                    className="cursor-pointer flex-1"
                    onClick={() => onProductClick(product)}
                  >
                    <Badge className={`${classes.badge} mb-2`} variant="secondary">
                      {product.category}
                    </Badge>
                    
                    <h3 className="text-sm sm:text-lg lg:text-xl font-bold mb-2 hover:text-orange-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 sm:w-4 sm:h-4 ${
                              i < Math.floor(product.rating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-stone-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-stone-600 text-xs sm:text-sm">({product.reviews})</span>
                    </div>
                    
                    <p className="text-stone-600 mb-3 sm:mb-4 line-clamp-2 text-xs sm:text-sm">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2 sm:gap-3 mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-lg sm:text-xl lg:text-2xl font-bold ${classes.accent}`}>
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-stone-500 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      disabled={!product.inStock}
                      className={`w-full ${classes.button} text-white flex items-center justify-center gap-1 sm:gap-2 font-semibold shadow-md text-xs sm:text-sm`}
                      size="sm"
                    >
                      <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}