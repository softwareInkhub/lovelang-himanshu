import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { LOVELANG_IMAGES } from "@/data/image-urls";

const categories = [
  {
    name: "Mango",
    for: "For Frizzy Hair",
    description: "Hyaluronic Complex hydrates deeply and smooths rough cuticles to reduce frizz.",
    image: LOVELANG_IMAGES.products.mango.icon,
    bg: "from-orange-100 to-yellow-50",
    textColor: "text-orange-600",
    buttonColor: "bg-white text-orange-600 hover:bg-orange-50",
    slug: "mango"
  },
  {
    name: "Peach",
    for: "For Hair Fall",
    description: "Biotin and protein complexes strengthen roots and reduce hair fall effectively.",
    image: LOVELANG_IMAGES.products.peach.icon,
    bg: "from-red-100 to-pink-50",
    textColor: "text-red-600",
    buttonColor: "bg-white text-red-600 hover:bg-red-50",
    slug: "peach"
  },
  {
    name: "Avocado",
    for: "For Damaged Hair",
    description: "Ceramides repair damage and restore strength for healthier, softer hair.",
    image: LOVELANG_IMAGES.products.avocado.icon,
    bg: "from-green-100 to-emerald-50",
    textColor: "text-green-600",
    buttonColor: "bg-white text-green-600 hover:bg-green-50",
    slug: "avocado"
  }
];

export default function ProductCategories() {
  return (
    <section id="product-categories" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="text-orange-600 italic">Love Language</span>
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Each range is designed to target a specific hair concern with real, visible results.
          </p>
        </motion.div>
        
        <div className="md:grid md:grid-cols-3 md:gap-8 flex md:flex-none overflow-x-auto gap-6 pb-4 md:pb-0 scrollbar-hide">
          {categories.map((category, index) => (
            <Link key={category.name} href={`/collections/${category.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${category.bg} p-8 h-96 min-w-[280px] md:min-w-0 transition-all duration-300 hover:shadow-2xl`}>
                  <img
                    src={category.image}
                    alt={`Fresh ${category.name.toLowerCase()}`}
                    className="absolute top-4 right-4 w-24 h-24 object-cover rounded-full shadow-lg"
                  />
                  
                  <div className="relative z-10 h-full flex flex-col justify-end">
                    <h3 className="text-2xl lg:text-3xl font-bold text-stone-900 mb-2">{category.name}</h3>
                    <p className={`${category.textColor} font-semibold mb-4 text-sm lg:text-base`}>{category.for}</p>
                    <p className="text-stone-700 mb-6 text-sm lg:text-base">{category.description}</p>
                    <Button 
                      className={`${category.buttonColor} self-start transition-colors text-sm lg:text-base px-4 py-2 lg:px-6 lg:py-3 group-hover:scale-105 transition-transform`}
                    >
                      Shop {category.name} Range
                    </Button>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
