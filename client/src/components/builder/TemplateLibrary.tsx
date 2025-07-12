import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Download } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  sectionType: string;
  config: any;
  code: string;
  customCSS?: string;
  preview: string;
}

interface TemplateLibraryProps {
  onApplyTemplate: (template: Template) => void;
  sectionType: string;
}

const templates: Template[] = [
  {
    id: 'hero-gradient',
    name: 'Gradient Hero',
    description: 'Modern hero section with gradient background',
    sectionType: 'HeroSection',
    preview: '/api/placeholder/300/200',
    config: {
      backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      heading: 'Revolutionary Hair Care',
      subtitle: 'Experience the future of hair health with our science-backed solutions',
      buttonText: 'Discover More',
      textColor: '#ffffff',
      overlayOpacity: 0
    },
    code: `const HeroSection = ({ config }) => (
  <section 
    className="h-screen flex items-center justify-center relative overflow-hidden"
    style={{ background: config.backgroundImage }}
  >
    <div className="absolute inset-0 bg-black opacity-20"></div>
    <div className="relative z-10 text-center max-w-4xl px-4">
      <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
        {config.heading}
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
        {config.subtitle}
      </p>
      <button className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
        {config.buttonText}
      </button>
    </div>
  </section>
);`,
    customCSS: `
.hero-section {
  background-attachment: fixed;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.floating-element {
  animation: float 3s ease-in-out infinite;
}
`
  },
  {
    id: 'hero-split',
    name: 'Split Hero',
    description: 'Hero section with split layout and image',
    sectionType: 'HeroSection',
    preview: '/api/placeholder/300/200',
    config: {
      backgroundImage: 'https://lovelang.in/cdn/shop/files/shop-all-banner-1.jpg?v=1747823477&width=1000',
      heading: 'Natural Hair Solutions',
      subtitle: 'Discover the power of fruit-based hair care that transforms your hair naturally',
      buttonText: 'Shop Now',
      textColor: '#1f2937',
      overlayOpacity: 10
    },
    code: `const HeroSection = ({ config }) => (
  <section className="min-h-screen flex items-center">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight" style={{ color: config.textColor }}>
            {config.heading}
          </h1>
          <p className="text-xl text-gray-600 max-w-md">
            {config.subtitle}
          </p>
          <button className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors">
            {config.buttonText}
          </button>
        </div>
        <div className="relative">
          <img 
            src={config.backgroundImage}
            alt="Hero"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 opacity-20 rounded-2xl"></div>
        </div>
      </div>
    </div>
  </section>
);`
  },
  {
    id: 'collections-grid',
    name: 'Modern Grid',
    description: 'Clean grid layout for collections',
    sectionType: 'CollectionsSection',
    preview: '/api/placeholder/300/200',
    config: {
      title: 'Our Collections',
      subtitle: 'Discover hair care solutions tailored to your unique needs',
      backgroundColor: '#f8fafc',
      collections: [
        {
          id: 'premium',
          name: 'Premium Line',
          image: 'https://lovelang.in/cdn/shop/files/mango-collection-hero.jpg?v=1747823477&width=400',
          description: 'Luxury hair care for ultimate results',
          color: '#fbbf24'
        },
        {
          id: 'natural',
          name: 'Natural Line',
          image: 'https://lovelang.in/cdn/shop/files/avocado-collection-hero.jpg?v=1747823477&width=400',
          description: 'Organic ingredients for gentle care',
          color: '#86efac'
        },
        {
          id: 'professional',
          name: 'Professional Line',
          image: 'https://lovelang.in/cdn/shop/files/peach-collection-hero.jpg?v=1747823477&width=400',
          description: 'Salon-quality treatments at home',
          color: '#fca5a5'
        }
      ]
    },
    code: `const CollectionsSection = ({ config }) => (
  <section className="py-24" style={{ backgroundColor: config.backgroundColor }}>
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">{config.title}</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{config.subtitle}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {config.collections.map((collection, index) => (
          <div key={collection.id} className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
            <div className="aspect-square overflow-hidden">
              <img 
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3">{collection.name}</h3>
              <p className="text-gray-600 leading-relaxed">{collection.description}</p>
              <div className="mt-6">
                <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                  Explore Collection →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);`
  }
];

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onApplyTemplate, sectionType }) => {
  const filteredTemplates = templates.filter(template => template.sectionType === sectionType);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Template Library</h3>
        <p className="text-sm text-gray-600">Choose from pre-built templates to get started quickly</p>
      </div>
      
      <div className="grid gap-4">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </div>
                <Button
                  onClick={() => onApplyTemplate(template)}
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Use</span>
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateLibrary;