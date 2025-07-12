import React from 'react';

interface Collection {
  id: string;
  name: string;
  image: string;
  description: string;
  color: string;
}

interface CollectionsConfig {
  title: string;
  subtitle: string;
  collections: Collection[];
  backgroundColor: string;
}

interface CollectionsSectionProps {
  config: CollectionsConfig;
}

const CollectionsSection: React.FC<CollectionsSectionProps> = ({ config }) => (
  <section 
    className="py-20"
    style={{ backgroundColor: config.backgroundColor }}
  >
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          {config.title}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {config.subtitle}
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {config.collections.map((collection) => (
          <div 
            key={collection.id}
            className="text-center group cursor-pointer"
          >
            <div 
              className="w-48 h-48 mx-auto rounded-full mb-6 overflow-hidden group-hover:scale-105 transition-transform duration-300"
              style={{ backgroundColor: collection.color }}
            >
              <img 
                src={collection.image} 
                alt={collection.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2">
              {collection.name}
            </h3>
            <p className="text-gray-600">
              {collection.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CollectionsSection;