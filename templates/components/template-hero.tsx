import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface TemplateHeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  backgroundImage: string;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
  theme?: 'default' | 'beauty' | 'fashion' | 'food' | 'electronics' | 'minimal';
}

export default function TemplateHero({
  title,
  subtitle,
  description,
  primaryButtonText,
  secondaryButtonText,
  backgroundImage,
  onPrimaryClick,
  onSecondaryClick,
  theme = 'default'
}: TemplateHeroProps) {
  const themeClasses = {
    default: {
      background: 'bg-gradient-to-br from-orange-50 to-amber-50',
      title: 'text-orange-600',
      subtitle: 'text-stone-900',
      primaryButton: 'bg-orange-600 hover:bg-orange-700',
      secondaryButton: 'border-orange-600 text-orange-600 hover:bg-orange-50'
    },
    beauty: {
      background: 'bg-gradient-to-br from-pink-50 to-purple-50',
      title: 'text-pink-600',
      subtitle: 'text-gray-900',
      primaryButton: 'bg-pink-600 hover:bg-pink-700',
      secondaryButton: 'border-pink-600 text-pink-600 hover:bg-pink-50'
    },
    fashion: {
      background: 'bg-gradient-to-br from-gray-50 to-slate-50',
      title: 'text-gray-800',
      subtitle: 'text-gray-900',
      primaryButton: 'bg-gray-900 hover:bg-gray-800',
      secondaryButton: 'border-gray-900 text-gray-900 hover:bg-gray-50'
    },
    food: {
      background: 'bg-gradient-to-br from-red-50 to-orange-50',
      title: 'text-red-600',
      subtitle: 'text-gray-900',
      primaryButton: 'bg-red-600 hover:bg-red-700',
      secondaryButton: 'border-red-600 text-red-600 hover:bg-red-50'
    },
    electronics: {
      background: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      title: 'text-blue-600',
      subtitle: 'text-gray-900',
      primaryButton: 'bg-blue-600 hover:bg-blue-700',
      secondaryButton: 'border-blue-600 text-blue-600 hover:bg-blue-50'
    },
    minimal: {
      background: 'bg-white',
      title: 'text-black',
      subtitle: 'text-gray-900',
      primaryButton: 'bg-black hover:bg-gray-800',
      secondaryButton: 'border-black text-black hover:bg-gray-50'
    }
  };

  const classes = themeClasses[theme];

  return (
    <section className={`py-20 lg:py-32 ${classes.background} relative overflow-hidden`}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                className={`text-4xl lg:text-6xl font-bold ${classes.subtitle}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {title} <span className={`italic ${classes.title}`}>{subtitle}</span>
              </motion.h1>
              <motion.p 
                className="text-lg lg:text-xl text-gray-600 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {description}
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                onClick={onPrimaryClick}
                className={`${classes.primaryButton} text-white px-8 py-4 rounded-full font-semibold transition-colors text-lg`}
              >
                {primaryButtonText}
              </Button>
              <Button 
                onClick={onSecondaryClick}
                variant="outline" 
                className={`border-2 ${classes.secondaryButton} px-8 py-4 rounded-full font-semibold transition-colors text-lg`}
              >
                {secondaryButtonText}
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
              src={backgroundImage}
              alt="Hero Background"
              className="rounded-3xl shadow-2xl w-full h-auto"
            />
            <div className={`absolute inset-0 ${classes.title.replace('text-', 'bg-')}/20 rounded-3xl`}></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}