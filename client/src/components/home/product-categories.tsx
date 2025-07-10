import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Mango",
    for: "For Frizzy Hair",
    description: "Hyaluronic Complex hydrates deeply and smooths rough cuticles to reduce frizz.",
    image: "https://images.unsplash.com/photo-1553279204-4c7e9ac3e5c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    bg: "from-primary-100 to-primary-50",
    textColor: "text-primary-600",
    buttonColor: "bg-white text-primary-600 hover:bg-primary-50"
  },
  {
    name: "Peach",
    for: "For Hair Fall",
    description: "Biotin and protein complexes strengthen roots and reduce hair fall effectively.",
    image: "https://images.unsplash.com/photo-1629828674344-8b4fd8d6d4e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    bg: "from-red-100 to-pink-50",
    textColor: "text-red-600",
    buttonColor: "bg-white text-red-600 hover:bg-red-50"
  },
  {
    name: "Avocado",
    for: "For Damaged Hair",
    description: "Ceramides repair damage and restore strength for healthier, softer hair.",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    bg: "from-green-100 to-emerald-50",
    textColor: "text-green-600",
    buttonColor: "bg-white text-green-600 hover:bg-green-50"
  }
];

export default function ProductCategories() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="text-primary-600 italic">Love Language</span>
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Each range is designed to target a specific hair concern with real, visible results.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${category.bg} p-8 h-96`}>
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
                    onClick={() => {
                      document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth' });
                      // Trigger category filter based on category
                      setTimeout(() => {
                        let categoryBtn: HTMLButtonElement | null = null;
                        if (category.name === "Mango") {
                          categoryBtn = document.querySelector('[data-category="frizz"]') as HTMLButtonElement;
                        } else if (category.name === "Peach") {
                          categoryBtn = document.querySelector('[data-category="hair-fall"]') as HTMLButtonElement;
                        } else if (category.name === "Avocado") {
                          categoryBtn = document.querySelector('[data-category="damage"]') as HTMLButtonElement;
                        }
                        categoryBtn?.click();
                      }, 500);
                    }}
                    className={`${category.buttonColor} self-start transition-colors text-sm lg:text-base px-4 py-2 lg:px-6 lg:py-3`}
                  >
                    Shop {category.name} Range
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
