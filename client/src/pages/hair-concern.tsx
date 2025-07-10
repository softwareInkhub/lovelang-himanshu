import { useParams } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Grid, List, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/product/product-card";
import products from "@/data/products.json";
import { Product } from "@/types/product";
import { LOVELANG_IMAGES } from "@/data/image-urls";

const hairConcernData = {
  "frizz": {
    name: "Anti-Frizz Range",
    description: "Hyaluronic Complex hydrates deeply and smooths rough cuticles to reduce frizz",
    heroImage: LOVELANG_IMAGES.banners.skinificationBanner,
    color: "from-orange-200 to-yellow-100",
    bgColor: "bg-gradient-to-br from-orange-300 to-yellow-200",
    textColor: "text-orange-800",
    badgeColor: "bg-orange-500",
    category: "For Frizzy Hair",
    ingredients: [
      { name: "avocado + ceramides", icon: "🥑" },
      { name: "peach + biotin", icon: "🍑" },
      { name: "mango + hyaluronic", icon: "🥭" }
    ],
    benefits: [
      "Controls frizz and flyaways",
      "Deep moisturizing formula", 
      "Adds natural bounce and volume",
      "Protects from humidity"
    ]
  },
  "hair-fall": {
    name: "Volume Boost Range", 
    description: "Biotin and protein complexes strengthen roots and reduce hair fall effectively",
    heroImage: LOVELANG_IMAGES.banners.fruitPoweredBanner,
    color: "from-pink-200 to-red-100",
    bgColor: "bg-gradient-to-br from-pink-300 to-red-200",
    textColor: "text-pink-800",
    badgeColor: "bg-pink-500",
    category: "For Hair Fall",
    ingredients: [
      { name: "avocado + ceramides", icon: "🥑" },
      { name: "peach + biotin", icon: "🍑" },
      { name: "mango + hyaluronic", icon: "🥭" }
    ],
    benefits: [
      "Reduces hair fall by 90%",
      "Strengthens hair roots",
      "Promotes healthy hair growth", 
      "Gentle on sensitive scalp"
    ]
  },
  "damage": {
    name: "Damage Repair Range",
    description: "Ceramides repair damage and restore strength for healthier, softer hair",
    heroImage: LOVELANG_IMAGES.banners.loveLanguageBanner,
    color: "from-green-200 to-emerald-100", 
    bgColor: "bg-gradient-to-br from-green-300 to-emerald-200",
    textColor: "text-green-800",
    badgeColor: "bg-green-500",
    category: "For Damaged Hair",
    ingredients: [
      { name: "avocado + ceramides", icon: "🥑" },
      { name: "peach + biotin", icon: "🍑" },
      { name: "mango + hyaluronic", icon: "🥭" }
    ],
    benefits: [
      "Rich in Vitamin A & C",
      "Deeply nourishes damaged hair",
      "Adds natural shine and softness",
      "Repairs split ends and breakage"
    ]
  }
};

export default function HairConcern() {
  const { concern } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');

  const concernInfo = hairConcernData[concern as keyof typeof hairConcernData];
  
  if (!concernInfo) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Hair concern not found</h1>
        <p className="text-stone-600">The hair concern you're looking for doesn't exist.</p>
      </div>
    );
  }

  // Filter products based on hair concern
  const filteredProducts = products.filter(product => 
    product.category === concernInfo.category
  ) as Product[];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className={`relative overflow-hidden ${concernInfo.bgColor} py-16 lg:py-24`}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className={`${concernInfo.badgeColor} text-white`}>
                  Hair Care Solution
                </Badge>
                <h1 className={`text-4xl lg:text-6xl font-bold ${concernInfo.textColor}`}>
                  {concernInfo.name}
                </h1>
                <p className={`text-lg lg:text-xl ${concernInfo.textColor}/80 leading-relaxed`}>
                  {concernInfo.description}
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className={`text-xl font-bold ${concernInfo.textColor}`}>Key Benefits</h3>
                <ul className="space-y-2">
                  {concernInfo.benefits.map((benefit, index) => (
                    <li key={index} className={`flex items-center gap-2 ${concernInfo.textColor}/80`}>
                      <Star className="w-4 h-4 fill-current" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={concernInfo.heroImage}
                  alt={concernInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 lg:gap-8 max-w-2xl mx-auto">
            {concernInfo.ingredients.map((ingredient, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-3 rounded-full bg-stone-100 flex items-center justify-center text-2xl lg:text-3xl">
                  {ingredient.icon}
                </div>
                <p className="text-xs lg:text-sm font-medium text-stone-700">{ingredient.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 lg:py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                {concernInfo.category.toUpperCase()}
              </h2>
              <p className="text-stone-600">
                {filteredProducts.length} products available
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filter & sort (4)
              </Button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-stone-600">No products found for this hair concern.</p>
            </div>
          ) : (
            <div className={`grid ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 gap-6'
            } gap-6`}>
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}