import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function CollectionsSection() {
  const collections = [
  {
    "id": "avocado",
    "name": "Avocado Collection",
    "image": "https://lovelang.in/cdn/shop/files/avocado-collection.jpg",
    "description": "For Damaged Hair - Repair and restore with nutrient-rich avocado",
    "color": "#10b981"
  },
  {
    "id": "mango",
    "name": "Mango Collection",
    "image": "https://lovelang.in/cdn/shop/files/mango-collection.jpg",
    "description": "For Frizzy Hair - Smooth and tame with tropical mango extracts",
    "color": "#f59e0b"
  },
  {
    "id": "peach",
    "name": "Peach Collection",
    "image": "https://lovelang.in/cdn/shop/files/peach-collection.jpg",
    "description": "For Hair Fall - Strengthen and protect with gentle peach nutrients",
    "color": "#ec4899"
  }
];
  
  return (
    <section className="py-16" style={{ backgroundColor: config.backgroundColor || '#f8f9fa' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {config.title || 'Choose Your Love Language'}
          </h2>
          <p className="text-lg text-gray-600">
            {config.subtitle || 'Discover our fruit-powered collections designed for your specific hair needs'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <Card key={collection.id} className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="aspect-square rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: collection.color }}>
                  {collection.name}
                </h3>
                <p className="text-gray-600">
                  {collection.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}