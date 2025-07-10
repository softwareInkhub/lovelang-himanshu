import { motion } from "framer-motion";
import { LOVELANG_IMAGES } from "@/data/image-urls";

const badges = [
  {
    name: "FDCA Approved",
    image: LOVELANG_IMAGES.badges.fdcaApproved,
    description: "Certified for safety and quality"
  },
  {
    name: "Vitamin Infused",
    image: LOVELANG_IMAGES.badges.vitaminInfused,
    description: "Enriched with essential vitamins"
  },
  {
    name: "Vegan",
    image: LOVELANG_IMAGES.badges.vegan,
    description: "100% plant-based formulation"
  },
  {
    name: "Cruelty Free",
    image: LOVELANG_IMAGES.badges.crueltyFree,
    description: "Never tested on animals"
  }
];

export default function BrandBadges() {
  return (
    <section className="py-16 bg-stone-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-orange-600 italic">Promise</span> to You
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            We believe in transparency, quality, and ethical practices in everything we do.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <img
                  src={badge.image}
                  alt={badge.name}
                  className="w-16 h-16 mx-auto mb-4 object-contain"
                />
                <h3 className="font-semibold text-stone-900 mb-2">{badge.name}</h3>
                <p className="text-sm text-stone-600">{badge.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}