import { motion } from "framer-motion";
import { LOVELANG_IMAGES } from "@/data/image-urls";
import { Button } from "@/components/ui/button";

const featuredProducts = [
  {
    name: "Mango Collection",
    subtitle: "For Frizzy Hair",
    description: "Hyaluronic Complex hydrates deeply and smooths rough cuticles to reduce frizz and boost shine.",
    image: LOVELANG_IMAGES.products.mango.featured,
    color: "from-orange-100 via-yellow-50 to-orange-50",
    textColor: "text-orange-800",
    buttonColor: "bg-orange-600 hover:bg-orange-700 text-white"
  },
  {
    name: "Peach Collection", 
    subtitle: "For Hair Fall",
    description: "Biotin and protein complexes strengthen roots and reduce hair fall for thicker, healthier hair.",
    image: LOVELANG_IMAGES.products.peach.featured,
    color: "from-rose-100 via-pink-50 to-rose-50",
    textColor: "text-rose-800",
    buttonColor: "bg-rose-600 hover:bg-rose-700 text-white"
  },
  {
    name: "Avocado Collection",
    subtitle: "For Damaged Hair", 
    description: "Ceramides repair damage and restore strength for softer, healthier hair with natural nourishment.",
    image: LOVELANG_IMAGES.products.avocado.featured,
    color: "from-green-100 via-emerald-50 to-green-50",
    textColor: "text-green-800",
    buttonColor: "bg-green-600 hover:bg-green-700 text-white"
  }
];

export default function ProductShowcase() {
  return (
    <section className="py-20 bg-gradient-to-br from-stone-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="text-orange-600 italic">Collections</span>
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Discover our signature fruit-powered formulations designed for your specific hair concerns
          </p>
        </motion.div>

        <div className="space-y-20">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} 
                         flex flex-col lg:flex gap-12 lg:gap-20 items-center`}
            >
              {/* Product Image */}
              <div className="flex-1">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${product.color} p-8`}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} - ${product.subtitle}`}
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl"></div>
                </motion.div>
              </div>

              {/* Product Content */}
              <div className="flex-1 space-y-6">
                <div>
                  <motion.p
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className={`${product.textColor} font-semibold text-lg mb-2`}
                  >
                    {product.subtitle}
                  </motion.p>
                  <motion.h3
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-3xl lg:text-4xl font-bold text-stone-900 mb-4"
                  >
                    {product.name}
                  </motion.h3>
                </div>

                <motion.p
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-lg text-stone-700 leading-relaxed"
                >
                  {product.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button 
                    onClick={() => {
                      document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        let categoryBtn: HTMLButtonElement | null = null;
                        if (product.name.includes("Mango")) {
                          categoryBtn = document.querySelector('[data-category="frizz"]') as HTMLButtonElement;
                        } else if (product.name.includes("Peach")) {
                          categoryBtn = document.querySelector('[data-category="hair-fall"]') as HTMLButtonElement;
                        } else if (product.name.includes("Avocado")) {
                          categoryBtn = document.querySelector('[data-category="damage"]') as HTMLButtonElement;
                        }
                        categoryBtn?.click();
                      }, 500);
                    }}
                    className={`${product.buttonColor} px-8 py-3 rounded-full font-semibold transition-all`}
                  >
                    Shop {product.name.split(' ')[0]} Range
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => document.getElementById('key-ingredients')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-3 rounded-full font-semibold border-2 border-stone-300 text-stone-700 hover:bg-stone-100"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}