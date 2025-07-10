import { motion } from "framer-motion";
import { Leaf, Droplets, Shield } from "lucide-react";

const ingredients = [
  {
    name: "Biotin",
    icon: Leaf,
    description: "Strengthens hair follicles and reduces hair fall while promoting healthy growth and thickness.",
    color: "from-primary-100 to-primary-200",
    iconColor: "text-primary-600"
  },
  {
    name: "Hyaluronic Acid",
    icon: Droplets,
    description: "Provides deep hydration and moisture retention for smoother, more manageable hair.",
    color: "from-blue-100 to-blue-200",
    iconColor: "text-blue-600"
  },
  {
    name: "Ceramides",
    icon: Shield,
    description: "Repairs damaged hair cuticles and strengthens the hair barrier to prevent future breakage.",
    color: "from-green-100 to-green-200",
    iconColor: "text-green-600"
  }
];

export default function KeyIngredients() {
  return (
    <section id="key-ingredients" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Key <span className="text-orange-600 italic">Active</span> Ingredients
          </h2>
          <p className="text-lg lg:text-xl text-stone-600 max-w-4xl mx-auto">
            Our formulas are built around three powerhouse actives: Biotin to reduce hair fall, 
            Hyaluronic Acid to hydrate deeply, and Ceramides to repair damage and prevent breakage.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-24 h-24 bg-gradient-to-br ${ingredient.color} rounded-full flex items-center justify-center mx-auto mb-6`}
              >
                <ingredient.icon className={`w-12 h-12 ${ingredient.iconColor}`} />
              </motion.div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4">{ingredient.name}</h3>
              <p className="text-sm lg:text-base text-stone-600">{ingredient.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
