import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye, Code, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'hero' | 'product' | 'footer' | 'collection';
  tags: string[];
  downloads: number;
}

const templates: Template[] = [
  {
    id: 'hero-lovelang',
    name: 'LoveLang Hero',
    description: 'Beautiful hero section with fruit-themed background',
    preview: '/api/components/HeroSection/preview',
    category: 'hero',
    tags: ['beauty', 'ecommerce', 'hero'],
    downloads: 245
  },
  {
    id: 'collections-fruit',
    name: 'Fruit Collections',
    description: 'Product collection showcase with hover effects',
    preview: '/api/components/CollectionsSection/preview',
    category: 'collection',
    tags: ['products', 'grid', 'collections'],
    downloads: 189
  },
  {
    id: 'footer-modern',
    name: 'Modern Footer',
    description: 'Clean footer with social links and company info',
    preview: '/api/components/FooterSection/preview',
    category: 'footer',
    tags: ['footer', 'links', 'social'],
    downloads: 167
  }
];

interface TemplateGalleryProps {
  onSelectTemplate: (template: Template) => void;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'hero', name: 'Hero Sections' },
    { id: 'collection', name: 'Collections' },
    { id: 'product', name: 'Products' },
    { id: 'footer', name: 'Footers' }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const downloadTemplate = async (template: Template) => {
    try {
      const response = await fetch(`/api/templates/${template.id}/download`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${template.id}-template.zip`;
      link.click();
      
      toast({
        title: "Template Downloaded",
        description: `${template.name} has been downloaded successfully!`
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download template",
        variant: "destructive"
      });
    }
  };

  const copyCode = async (template: Template) => {
    try {
      const response = await fetch(`/api/components/${template.id.split('-')[0]}Section`);
      const data = await response.json();
      
      const fullCode = `// Component Code\n${data.code}\n\n// Configuration\n${JSON.stringify(data.config, null, 2)}`;
      await navigator.clipboard.writeText(fullCode);
      
      toast({
        title: "Code Copied",
        description: "Template code copied to clipboard!"
      });
    } catch (error) {
      toast({
        title: "Copy Failed", 
        description: "Failed to copy template code",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Template Gallery</h2>
          <p className="text-gray-600">Choose from our collection of reusable website sections</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-gray-500">Preview</span>
              </div>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <p className="text-sm text-gray-600">{template.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 mb-4">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  {template.downloads} downloads
                </span>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => onSelectTemplate(template)}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Use
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyCode(template)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadTemplate(template)}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;