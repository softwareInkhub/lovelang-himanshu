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

const collectionData = {
  mango: {
    name: "Mango Collection",
    description: "Nourishing mango-infused hair care for damaged hair",
    image: LOVELANG_IMAGES.collections.mango,
    color: "from-orange-200 to-yellow-200",
    textColor: "text-orange-800",
    badgeColor: "bg-orange-500",
    benefits: [
      "Rich in Vitamin A & C",
      "Deeply nourishes damaged hair",
      "Adds natural shine and softness",
      "Repairs split ends and breakage"
    ],
    ingredients: ["Mango Extract", "Vitamin E", "Argan Oil", "Keratin Protein"]
  },
  peach: {
    name: "Peach Collection",
    description: "Gentle peach formula for hair fall control and strengthening",
    image: LOVELANG_IMAGES.collections.peach,
    color: "from-pink-200 to-peach-200",
    textColor: "text-pink-800",
    badgeColor: "bg-pink-500",
    benefits: [
      "Reduces hair fall by 90%",
      "Strengthens hair roots",
      "Promotes healthy hair growth",
      "Gentle on sensitive scalp"
    ],
    ingredients: ["Peach Extract", "Biotin", "Collagen", "Peptide Complex"]
  },
  avocado: {
    name: "Avocado Collection",
    description: "Moisturizing avocado blend for frizz control and smoothness",
    image: LOVELANG_IMAGES.collections.avocado,
    color: "from-green-200 to-lime-200",
    textColor: "text-green-800",
    badgeColor: "bg-green-500",
    benefits: [
      "Controls frizz and flyaways",
      "Deep moisturizing formula",
      "Adds natural bounce and volume",
      "Protects from humidity"
    ],
    ingredients: ["Avocado Oil", "Shea Butter", "Coconut Oil", "Hyaluronic Acid"]
  }
};

export default function Collection() {
  const { collection } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');

  const collectionInfo = collectionData[collection as keyof typeof collectionData];
  
  if (!collectionInfo) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Collection not found</h1>
        <p className="text-stone-600">The collection you're looking for doesn't exist.</p>
      </div>
    );
  }

  // Filter products based on collection
  const getFilteredProducts = () => {
    const categoryMap = {
      mango: 'Damaged Hair',
      peach: 'Hair Fall', 
      avocado: 'Frizzy Hair'
    };
    
    return products.filter(product => 
      product.category === categoryMap[collection as keyof typeof categoryMap]
    ) as Product[];
  };

  const filteredProducts = getFilteredProducts();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${collectionInfo.color} py-16 lg:py-24`}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className={`${collectionInfo.badgeColor} text-white`}>
                  {collection?.charAt(0).toUpperCase() + collection?.slice(1)} Collection
                </Badge>
                <h1 className={`text-4xl lg:text-6xl font-bold ${collectionInfo.textColor}`}>
                  {collectionInfo.name}
                </h1>
                <p className={`text-lg lg:text-xl ${collectionInfo.textColor}/80 leading-relaxed`}>
                  {collectionInfo.description}
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className={`text-xl font-bold ${collectionInfo.textColor}`}>Key Benefits</h3>
                <ul className="space-y-2">
                  {collectionInfo.benefits.map((benefit, index) => (
                    <li key={index} className={`flex items-center gap-2 ${collectionInfo.textColor}/80`}>
                      <Star className="w-4 h-4 fill-current" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={collectionInfo.image}
                  alt={collectionInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Ingredients */}
      <section className="py-12 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Key Ingredients</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Our {collection} collection is powered by nature's finest ingredients
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {collectionInfo.ingredients.map((ingredient, index) => (
              <Card key={index} className="text-center p-4 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${collectionInfo.color} flex items-center justify-center`}>
                    <Star className={`w-6 h-6 ${collectionInfo.textColor}`} />
                  </div>
                  <h4 className="font-semibold text-sm lg:text-base">{ingredient}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                {collectionInfo.name} Products
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
                Filter & Sort
              </Button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-stone-600">No products found in this collection.</p>
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