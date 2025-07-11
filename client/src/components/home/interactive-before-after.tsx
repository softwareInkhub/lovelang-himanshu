import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { LOVELANG_IMAGES } from "@/data/image-urls";

const beforeAfterComparisons = [
  {
    id: 1,
    title: "lovelang for your frizzy hair",
    beforeImage: LOVELANG_IMAGES.beforeAfter.frizzyBefore,
    afterImage: LOVELANG_IMAGES.beforeAfter.frizzyAfter,
    description: "See how our Mango + Hyaluronic formula transforms frizzy, unmanageable hair into smooth, silky strands."
  },
  {
    id: 2,
    title: "lovelang for your hair fall",
    beforeImage: LOVELANG_IMAGES.beforeAfter.hairFallBefore,
    afterImage: LOVELANG_IMAGES.beforeAfter.hairFallAfter,
    description: "Watch how our Peach + Biotin treatment reduces hair fall and promotes stronger, fuller hair."
  },
  {
    id: 3,
    title: "lovelang for your damaged hair", 
    beforeImage: LOVELANG_IMAGES.beforeAfter.damagedBefore,
    afterImage: LOVELANG_IMAGES.beforeAfter.damagedAfter,
    description: "Experience the repair power of our Avocado + Ceramide formula on damaged, brittle hair."
  }
];

export default function InteractiveBeforeAfter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentComparison = beforeAfterComparisons[currentIndex];

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, [isDragging]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, [isDragging]);

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6">
            Real Results, Real <span className="text-orange-600 italic">Transformation</span>
          </h2>
          <p className="text-lg lg:text-xl text-stone-600 max-w-3xl mx-auto mb-8">
            Slide to see the incredible before and after results with our fruit-powered formulations
          </p>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {beforeAfterComparisons.map((comparison, index) => (
              <button
                key={comparison.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  index === currentIndex
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-white text-stone-600 hover:bg-orange-100'
                }`}
              >
                {comparison.title.split(' ').slice(-2).join(' ')}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Title */}
            <div className="text-center py-6 bg-gradient-to-r from-orange-600 to-yellow-500">
              <h3 className="text-xl lg:text-2xl font-bold text-white">
                {currentComparison.title}
              </h3>
            </div>

            {/* Interactive Comparison */}
            <div className="relative p-6 lg:p-8">
              <div
                ref={containerRef}
                className="relative aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-2xl cursor-col-resize select-none"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                onTouchMove={handleTouchMove}
              >
                {/* Before Image (Background) */}
                <img
                  src={currentComparison.beforeImage}
                  alt="Before treatment"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />

                {/* After Image (Clipped) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img
                    src={currentComparison.afterImage}
                    alt="After treatment"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>

                {/* Slider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 transition-all duration-100"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                >
                  {/* Slider Handle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-orange-500 flex items-center justify-center cursor-col-resize">
                    <div className="flex space-x-0.5">
                      <div className="w-0.5 h-4 bg-orange-500 rounded"></div>
                      <div className="w-0.5 h-4 bg-orange-500 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Before/After Labels */}
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Before
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  After
                </div>

                {/* Instructions */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                  ← Slide to compare →
                </div>
              </div>

              {/* Description */}
              <div className="text-center mt-6">
                <p className="text-stone-600 text-base lg:text-lg max-w-2xl mx-auto">
                  {currentComparison.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {beforeAfterComparisons.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setSliderPosition(50);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-orange-600 scale-125' 
                    : 'bg-stone-300 hover:bg-orange-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}