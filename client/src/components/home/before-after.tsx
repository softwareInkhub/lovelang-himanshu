import { motion } from "framer-motion";

export default function BeforeAfter() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See the <span className="text-primary-600 italic">Transformation</span>
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Real results from real customers using our fruit-powered, science-backed formulations.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Before</h3>
                <img
                  src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
                  alt="Hair before treatment"
                  className="w-full h-64 object-cover rounded-2xl"
                />
                <p className="text-stone-600 mt-4">Frizzy, dry, and damaged hair lacking shine and smoothness.</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-primary-600">After</h3>
                <img
                  src="https://images.unsplash.com/photo-1498661390416-d1b26d4cbb2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
                  alt="Hair after treatment"
                  className="w-full h-64 object-cover rounded-2xl"
                />
                <p className="text-stone-600 mt-4">Smooth, hydrated, and healthy hair with natural shine and bounce.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
