import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const beforeAfterData = [
  {
    title: "Mango + Hyaluronic for Frizzy Hair",
    description: "Deep hydration that smooths rough cuticles to reduce frizz and boost shine.",
    before: "https://images.unsplash.com/photo-1595475038665-8d66b0d87d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    after: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    color: "from-yellow-100 to-orange-50"
  },
  {
    title: "Peach + Biotin for Hair Fall",
    description: "Strengthens roots and reduces hair fall for thicker, healthier looking hair.",
    before: "https://images.unsplash.com/photo-1559599238-82c8ac264b29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    after: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    color: "from-pink-100 to-rose-50"
  },
  {
    title: "Avocado + Ceramide for Damaged Hair", 
    description: "Repairs damage and restores strength for softer, healthier hair.",
    before: "https://images.unsplash.com/photo-1559599238-82c8ac264b29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    after: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    color: "from-green-100 to-emerald-50"
  }
];

export default function BeforeAfter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  const currentData = beforeAfterData[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : beforeAfterData.length - 1));
    setShowAfter(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < beforeAfterData.length - 1 ? prev + 1 : 0));
    setShowAfter(false);
  };

  return (
    <section className="py-16 lg:py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6">
            See the <span className="text-primary-600 italic">Transformation</span>
          </h2>
          <p className="text-lg lg:text-xl text-stone-600 max-w-3xl mx-auto">
            Real results from our fruit-powered, science-backed formulations
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`bg-gradient-to-br ${currentData.color} rounded-3xl p-6 lg:p-12`}
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content */}
              <div className="text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">
                  {currentData.title}
                </h3>
                <p className="text-base lg:text-lg text-stone-700 mb-6 lg:mb-8">
                  {currentData.description}
                </p>
                
                <div className="flex justify-center lg:justify-start space-x-4">
                  <Button 
                    variant={!showAfter ? "default" : "outline"}
                    onClick={() => setShowAfter(false)}
                    className="px-6 py-2"
                  >
                    Before
                  </Button>
                  <Button 
                    variant={showAfter ? "default" : "outline"}
                    onClick={() => setShowAfter(true)}
                    className="px-6 py-2"
                  >
                    After
                  </Button>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-lg">
                  <img
                    src={showAfter ? currentData.after : currentData.before}
                    alt={`${showAfter ? 'After' : 'Before'} using ${currentData.title}`}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {showAfter ? 'After' : 'Before'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
            
            <div className="flex space-x-2">
              {beforeAfterData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setShowAfter(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary-600' : 'bg-stone-300'
                  }`}
                />
              ))}
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
              onClick={handleNext}
            >
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}