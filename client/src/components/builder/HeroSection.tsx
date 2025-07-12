import React from 'react';

interface HeroConfig {
  backgroundImage: string;
  heading: string;
  subtitle: string;
  buttonText: string;
  textColor: string;
  overlayOpacity: number;
}

interface HeroSectionProps {
  config: HeroConfig;
}

const HeroSection: React.FC<HeroSectionProps> = ({ config }) => (
  <section 
    className="h-screen bg-cover bg-center text-white relative" 
    style={{ backgroundImage: `url(${config.backgroundImage})` }}
  >
    <div 
      className="absolute inset-0 bg-black" 
      style={{ opacity: config.overlayOpacity / 100 }}
    />
    <div className="relative flex items-center justify-center h-full">
      <div className="text-center space-y-6 max-w-4xl px-4">
        <h1 
          className="text-5xl md:text-7xl font-bold leading-tight"
          style={{ color: config.textColor }}
        >
          {config.heading}
        </h1>
        <p 
          className="text-lg md:text-xl max-w-2xl mx-auto"
          style={{ color: config.textColor }}
        >
          {config.subtitle}
        </p>
        <button 
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
        >
          {config.buttonText}
        </button>
      </div>
    </div>
  </section>
);

export default HeroSection;