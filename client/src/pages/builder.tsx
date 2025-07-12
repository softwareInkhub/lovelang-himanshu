import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Eye, Code, Settings, Layout, Share2 } from 'lucide-react';
import ComponentPreview from '@/components/builder/ComponentPreview';
import CodeEditor from '@/components/builder/CodeEditor';
import ConfigForm from '@/components/builder/ConfigForm';
import TemplateGallery from '@/components/builder/TemplateGallery';
import ExportManager from '@/components/builder/ExportManager';
import { useToast } from '@/hooks/use-toast';

const sections = [
  { id: 'HeroSection', name: 'Hero Section', description: 'Main banner section' },
  { id: 'CollectionsSection', name: 'Collections', description: 'Product collections showcase' },
  { id: 'FooterSection', name: 'Footer', description: 'Site footer with links' }
];

export default function Builder() {
  const [selectedSection, setSelectedSection] = useState('HeroSection');
  const [config, setConfig] = useState<any>({});
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [activeMainTab, setActiveMainTab] = useState('builder');
  const { toast } = useToast();

  useEffect(() => {
    loadSection(selectedSection);
  }, [selectedSection]);

  // Auto-generate code when config changes
  useEffect(() => {
    if (Object.keys(config).length > 0) {
      const debounceTimer = setTimeout(() => {
        generateCode(config);
      }, 1000); // Debounce for 1 second
      
      return () => clearTimeout(debounceTimer);
    }
  }, [config, selectedSection]);

  const loadSection = async (sectionName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/components/${sectionName}`);
      if (response.ok) {
        const data = await response.json();
        setConfig(data.config);
        setCode(data.code);
        
        // Also generate fresh code based on config
        await generateCode(data.config);
      } else {
        toast({
          title: "Error",
          description: "Failed to load section data",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error loading section:', error);
      toast({
        title: "Error", 
        description: "Failed to load section data",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const generateCode = async (currentConfig = config) => {
    try {
      const response = await fetch(`/api/components/${selectedSection}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: currentConfig })
      });
      
      if (response.ok) {
        const data = await response.json();
        setCode(data.code);
        toast({
          title: "Code Generated",
          description: "Fresh code generated based on your configuration!"
        });
      }
    } catch (error) {
      console.error('Error generating code:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate code",
        variant: "destructive"
      });
    }
  };

  const saveChanges = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/components/${selectedSection}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, config }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Section saved successfully!"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to save section",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error saving section:', error);
      toast({
        title: "Error",
        description: "Failed to save section", 
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleTemplateSelect = (template: any) => {
    setActiveMainTab('builder');
    loadSection(template.id.split('-')[0] + 'Section');
    toast({
      title: "Template Loaded",
      description: `${template.name} template has been loaded for editing`
    });
  };

  const handleExport = async (options: any) => {
    try {
      const response = await fetch('/api/templates/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sections: [selectedSection],
          options,
          code,
          config
        })
      });

      if (response.ok) {
        const templateData = await response.json();
        
        // Create downloadable file
        const dataStr = JSON.stringify(templateData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${options.packageName || 'template'}.json`;
        link.click();
        
        toast({
          title: "Export Successful",
          description: `Template exported as ${options.packageName || 'template'}.json`
        });
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export template",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Website Template Builder</h1>
            <p className="text-gray-600">Create, edit, and share reusable website templates</p>
          </div>
          <div className="flex items-center space-x-3">
            <Tabs value={activeMainTab} onValueChange={setActiveMainTab}>
              <TabsList>
                <TabsTrigger value="gallery">
                  <Layout className="w-4 h-4 mr-2" />
                  Templates
                </TabsTrigger>
                <TabsTrigger value="builder">
                  <Code className="w-4 h-4 mr-2" />
                  Builder
                </TabsTrigger>
                <TabsTrigger value="export">
                  <Share2 className="w-4 h-4 mr-2" />
                  Export
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button onClick={() => generateCode()} variant="outline" size="sm" disabled={isLoading}>
              <Code className="w-4 h-4 mr-2" />
              Generate Code
            </Button>
            <Button onClick={saveChanges} disabled={isLoading} size="sm">
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="h-full">
          {/* Template Gallery */}
          <TabsContent value="gallery" className="h-full m-0 p-6">
            <TemplateGallery onSelectTemplate={handleTemplateSelect} />
          </TabsContent>

          {/* Builder Interface */}
          <TabsContent value="builder" className="h-full m-0">
            <div className="flex h-full">
              {/* Sidebar */}
              <div className="w-64 bg-white border-r shadow-sm">
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-4">Sections</h2>
                  <div className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setSelectedSection(section.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedSection === section.id
                            ? 'bg-orange-50 border-orange-200 text-orange-900'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="font-medium">{section.name}</div>
                        <div className="text-sm text-gray-500">{section.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex">
                {/* Preview/Editor Area */}
                <div className="flex-1 flex flex-col">
                  <div className="bg-white border-b p-4">
                    <div className="flex items-center justify-between">
                      <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList>
                          <TabsTrigger value="preview">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </TabsTrigger>
                          <TabsTrigger value="code">
                            <Code className="w-4 h-4 mr-2" />
                            Code
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                      
                      {activeTab === 'code' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(code);
                            toast({
                              title: "Code Copied",
                              description: "Component code copied to clipboard!"
                            });
                          }}
                        >
                          Copy Code
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden">
                    <TabsContent value="preview" className="h-full m-0">
                      <ComponentPreview sectionType={selectedSection} config={config} />
                    </TabsContent>
                    <TabsContent value="code" className="h-full m-0 p-4">
                      <CodeEditor
                        value={code}
                        onChange={(value) => setCode(value || '')}
                        height="100%"
                      />
                    </TabsContent>
                  </div>
                </div>

                {/* Configuration Panel */}
                <div className="w-96 bg-white border-l shadow-sm overflow-auto">
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      <Settings className="w-5 h-5 mr-2" />
                      <h3 className="text-lg font-semibold">Configuration</h3>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">{selectedSection}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ConfigForm
                          config={config}
                          onChange={setConfig}
                          sectionType={selectedSection}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Export & Share */}
          <TabsContent value="export" className="h-full m-0 p-6">
            <div className="max-w-2xl mx-auto">
              <ExportManager
                selectedSections={[selectedSection]}
                onExport={handleExport}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}