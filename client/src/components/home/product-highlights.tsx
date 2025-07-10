import { motion } from "framer-motion";
import { LOVELANG_IMAGES } from "@/data/image-urls";

const highlightedProducts = [
  {
    title: "Mango Collection",
    subtitle: "Premium Frizz Control",
    image: "https://lovelang.in/cdn/shop/files/MC2_e6c27907-cc33-452c-9e25-fb54887cfe43.jpg?v=1747815833&width=1000",
    gradient: "from-orange-400/20 to-yellow-300/20",
    textColor: "text-orange-800"
  },
  {
    title: "Peach Collection", 
    subtitle: "Advanced Hair Fall Protection",
    image: "https://lovelang.in/cdn/shop/files/PC2_105826fe-ee21-44c9-a2e9-6e4f9a55fed6.jpg?v=1747652218&width=1000",
    gradient: "from-rose-400/20 to-pink-300/20",
    textColor: "text-rose-800"
  },
  {
    title: "Avocado Collection",
    subtitle: "Deep Damage Repair",
    image: "https://lovelang.in/cdn/shop/files/AC2_bbd43ee2-b7ff-46a5-936f-a323e575c765.jpg?v=1747652205&width=1000",
    gradient: "from-green-400/20 to-emerald-300/20", 
    textColor: "text-green-800"
  },
  {
    title: "Peach Shampoo",
    subtitle: "Daily Hair Fall Control",
    image: "https://lovelang.in/cdn/shop/files/PS2.jpg?v=1748252426&width=1000",
    gradient: "from-amber-400/20 to-orange-300/20",
    textColor: "text-amber-800"
  }
];

export default function ProductHighlights() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Premium <span className="text-orange-600 italic">Formulations</span>
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Discover our signature products crafted with authentic fruit extracts and advanced hair science
          </p>
        </motion.div>
        
        <div className="lg:grid lg:grid-cols-4 lg:gap-8 md:grid md:grid-cols-2 md:gap-6 flex overflow-x-auto gap-6 pb-4 lg:pb-0 scrollbar-hide">
          {highlightedProducts.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 min-w-[260px] lg:min-w-0">
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative p-6">
                  <div className="aspect-square overflow-hidden rounded-xl mb-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="text-center">
                    <h3 className={`font-bold text-lg mb-1 ${product.textColor} group-hover:text-stone-900 transition-colors`}>
                      {product.title}
                    </h3>
                    <p className="text-stone-600 text-sm">{product.subtitle}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}