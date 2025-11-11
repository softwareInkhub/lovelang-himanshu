import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import fs from 'fs';
import path from 'path';

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      // In local dev mode without real auth, return null user
      if (!req.user || !req.user.claims) {
        return res.json(null);
      }
      
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Protected route example
  app.post("/api/checkout", isAuthenticated, async (req, res) => {
    const userId = (req.user as any)?.claims?.sub;
    // Process checkout for authenticated user
    res.json({ success: true, message: "Checkout processed successfully" });
  });

  // Component API routes for page builder
  app.get("/api/components/:name", (req, res) => {
    try {
      const name = req.params.name;
      const configPath = path.join(process.cwd(), `client/src/configs/${name.toLowerCase().replace('section', '')}.json`);
      const componentPath = path.join(process.cwd(), `client/src/components/builder/${name}.tsx`);

      // Read config file
      let config = {};
      if (fs.existsSync(configPath)) {
        const configData = fs.readFileSync(configPath, 'utf-8');
        config = JSON.parse(configData);
      }

      // Read component code
      let code = '';
      if (fs.existsSync(componentPath)) {
        code = fs.readFileSync(componentPath, 'utf-8');
      }

      res.json({ config, code });
    } catch (error) {
      console.error('Error reading component:', error);
      res.status(500).json({ error: 'Failed to read component' });
    }
  });

  app.post("/api/components/:name", (req, res) => {
    try {
      const name = req.params.name;
      const { code, config } = req.body;
      
      const configPath = path.join(process.cwd(), `client/src/configs/${name.toLowerCase().replace('section', '')}.json`);
      const componentPath = path.join(process.cwd(), `client/src/components/builder/${name}.tsx`);

      // Ensure directories exist
      const configDir = path.dirname(configPath);
      const componentDir = path.dirname(componentPath);
      
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }
      if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true });
      }

      // Write config file
      if (config) {
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      }

      // Write component code
      if (code) {
        fs.writeFileSync(componentPath, code);
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Error saving component:', error);
      res.status(500).json({ error: 'Failed to save component' });
    }
  });

  // Template export route
  app.post("/api/templates/export", (req, res) => {
    try {
      const { sections, options, code, config } = req.body;
      
      // Generate template package
      const templateData = {
        name: options.packageName || 'custom-template',
        description: options.description || 'Custom website template',
        sections: sections,
        format: options.format,
        code: code,
        config: config,
        generatedAt: new Date().toISOString(),
        styles: options.includeStyles ? 'included' : 'excluded',
        configIncluded: options.includeConfig
      };

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="${options.packageName || 'template'}.json"`);
      res.json(templateData);
    } catch (error) {
      console.error('Error exporting template:', error);
      res.status(500).json({ error: 'Failed to export template' });
    }
  });

  // Template share route
  app.post("/api/templates/share", (req, res) => {
    try {
      const { sections, options } = req.body;
      const shareId = Math.random().toString(36).substr(2, 9);
      
      // In a real app, you'd save this to a database
      res.json({ 
        shareId, 
        shareUrl: `${req.protocol}://${req.get('host')}/template/${shareId}`
      });
    } catch (error) {
      console.error('Error creating share link:', error);
      res.status(500).json({ error: 'Failed to create share link' });
    }
  });

  // Template publish route
  app.post("/api/templates/publish", (req, res) => {
    try {
      const { sections, options } = req.body;
      
      // In a real app, you'd save this to a public gallery database
      res.json({ 
        success: true, 
        message: 'Template published successfully',
        templateId: Math.random().toString(36).substr(2, 9)
      });
    } catch (error) {
      console.error('Error publishing template:', error);
      res.status(500).json({ error: 'Failed to publish template' });
    }
  });

  // Generate code route - this creates the actual React component code
  app.post("/api/components/:name/generate", (req, res) => {
    try {
      const { name } = req.params;
      const { config } = req.body;
      
      let generatedCode = '';
      
      if (name === 'HeroSection') {
        generatedCode = generateHeroSectionCode(config);
      } else if (name === 'CollectionsSection') {
        generatedCode = generateCollectionsSectionCode(config);
      } else if (name === 'FooterSection') {
        generatedCode = generateFooterSectionCode(config);
      } else {
        generatedCode = generateGenericSectionCode(name, config);
      }
      
      res.json({ code: generatedCode });
    } catch (error) {
      console.error('Error generating code:', error);
      res.status(500).json({ error: 'Failed to generate code' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Code generation functions
function generateHeroSectionCode(config: any) {
  return `import React from 'react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section 
      className="relative h-screen flex items-center justify-center text-center"
      style={{
        backgroundImage: \`url('\${config.backgroundImage || 'https://lovelang.in/cdn/shop/files/shop-all-banner-1.jpg'}')\`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black" style={{ opacity: \`\${(config.overlayOpacity || 50) / 100}\` }}></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 
          className="text-4xl md:text-6xl font-bold mb-6"
          style={{ color: config.textColor || '#ffffff' }}
        >
          {config.heading || 'Skinification of Hair Care'}
        </h1>
        <p 
          className="text-xl md:text-2xl mb-8 opacity-90"
          style={{ color: config.textColor || '#ffffff' }}
        >
          {config.subtitle || 'Transform your hair with fruit-powered, science-backed solutions that love your hair back'}
        </p>
        <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
          {config.buttonText || 'Shop Collections'}
        </Button>
      </div>
    </section>
  );
}`;
}

function generateCollectionsSectionCode(config: any) {
  return `import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function CollectionsSection() {
  const collections = ${JSON.stringify(config.collections || [], null, 2)};
  
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
}`;
}

function generateFooterSectionCode(config: any) {
  return `import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer style={{ backgroundColor: config.backgroundColor || '#1f2937', color: config.textColor || '#ffffff' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{config.companyName || 'LoveLang'}</h3>
            <p className="text-sm opacity-80">
              {config.description || 'Fruit-powered, science-backed hair care solutions'}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {(config.links?.company || []).map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="opacity-80 hover:opacity-100 transition-opacity">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              {(config.links?.support || []).map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="opacity-80 hover:opacity-100 transition-opacity">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {config.socialMedia?.facebook && (
                <a href={config.socialMedia.facebook} className="opacity-80 hover:opacity-100 transition-opacity">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {config.socialMedia?.instagram && (
                <a href={config.socialMedia.instagram} className="opacity-80 hover:opacity-100 transition-opacity">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {config.socialMedia?.twitter && (
                <a href={config.socialMedia.twitter} className="opacity-80 hover:opacity-100 transition-opacity">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm opacity-80">
          {config.copyright || \`© \${new Date().getFullYear()} LoveLang. All rights reserved.\`}
        </div>
      </div>
    </footer>
  );
}`;
}

function generateGenericSectionCode(name: string, config: any) {
  return `import React from 'react';

export default function ${name}() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          {/* Add your ${name} content here */}
          Custom ${name}
        </h2>
        <div className="text-center">
          <p>Configuration: {JSON.stringify(config, null, 2)}</p>
        </div>
      </div>
    </section>
  );
}`;
}
