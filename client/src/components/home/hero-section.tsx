import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { LOVELANG_IMAGES } from "@/data/image-urls";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-yellow-200 to-orange-100 min-h-screen flex items-center">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl lg:text-7xl font-bold leading-tight"
          >
            <span className="text-stone-900">skinification of</span>
            <br />
            <span className="text-orange-600 italic">hair care</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-stone-700 leading-relaxed"
          >
            Powered by fruit, backed by science. Experience the revolutionary approach to hair care with our premium formulations.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              onClick={() => document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-stone-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-stone-800 transition-colors text-lg"
            >
              Shop Hair Kits
            </Button>
            <Button 
              onClick={() => document.getElementById('key-ingredients')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline" 
              className="border-2 border-stone-900 text-stone-900 px-8 py-4 rounded-full font-semibold hover:bg-stone-100 transition-colors text-lg"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <img
            src={LOVELANG_IMAGES.banners.shopAllBanner}
            alt="LoveLang Hair Care Products"
            className="rounded-3xl shadow-2xl w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent rounded-3xl"></div>
        </motion.div>
      </div>
    </section>
  );
}
