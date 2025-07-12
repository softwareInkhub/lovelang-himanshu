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
    className="h-screen bg-cover bg-center relative flex items-center justify-center"
    style={{ backgroundImage: `url(${config.backgroundImage})` }}
  >
    <div 
      className="absolute inset-0 bg-black"
      style={{ opacity: config.overlayOpacity / 100 }}
    ></div>
    <div className="relative z-10 text-center max-w-4xl px-4">
      <h1 
        className="text-5xl md:text-7xl font-bold mb-6"
        style={{ color: config.textColor }}
      >
        {config.heading}
      </h1>
      <p 
        className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
        style={{ color: config.textColor }}
      >
        {config.subtitle}
      </p>
      <button className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors">
        {config.buttonText}
      </button>
    </div>
  </section>
);

export default HeroSection;