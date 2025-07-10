import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOVELANG_IMAGES } from "@/data/image-urls";

const bannerSlides = [
  {
    image: LOVELANG_IMAGES.banners.skinificationBanner,
    title: "skinification of",
    subtitle: "hair care",
    description: "Transform your hair with our innovative fruit-powered skincare approach",
    ctaText: "Discover Collection",
    gradient: "from-yellow-400/20 to-orange-300/20",
    textColor: "text-yellow-900"
  },
  {
    image: LOVELANG_IMAGES.banners.fruitPoweredBanner,
    title: "powered by fruit,",
    subtitle: "backed by science",
    description: "Natural ingredients meet advanced hair science for optimal results",
    ctaText: "Shop Now",
    gradient: "from-orange-400/20 to-red-300/20",
    textColor: "text-orange-900"
  },
  {
    image: LOVELANG_IMAGES.banners.loveLanguageBanner,
    title: "your hair's love",
    subtitle: "language",
    description: "Speak fluently to your hair with our targeted treatment solutions",
    ctaText: "Find Your Match",
    gradient: "from-green-400/20 to-emerald-300/20",
    textColor: "text-green-900"
  }
];

export default function DynamicBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [isPlaying]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="relative h-screen max-h-[700px] min-h-[500px] overflow-hidden bg-stone-900">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={bannerSlides[currentSlide].image}
              alt={`${bannerSlides[currentSlide].title} ${bannerSlides[currentSlide].subtitle}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className={`absolute inset-0 bg-gradient-to-r ${bannerSlides[currentSlide].gradient}`}></div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                      {bannerSlides[currentSlide].title}
                    </h1>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight italic">
                      {bannerSlides[currentSlide].subtitle}
                    </h2>
                  </div>
                  
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg">
                    {bannerSlides[currentSlide].description}
                  </p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Button
                      onClick={() => document.getElementById('product-categories')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-white text-stone-900 hover:bg-stone-100 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-xl"
                    >
                      {bannerSlides[currentSlide].ctaText}
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 left-6 flex items-center space-x-4 z-20">
        {/* Play/Pause Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>

        {/* Slide Indicators */}
        <div className="flex space-x-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Arrow Navigation */}
      <div className="absolute bottom-6 right-6 flex space-x-2 z-20">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPrevious}
          className="w-10 h-10 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={goToNext}
          className="w-10 h-10 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: isPlaying ? "100%" : "0%" }}
          transition={{ duration: 5, ease: "linear" }}
          key={`${currentSlide}-${isPlaying}`}
        />
      </div>
    </section>
  );
}