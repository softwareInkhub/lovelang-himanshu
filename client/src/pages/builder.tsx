import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Eye, Code, Settings, Palette, Download, Upload } from 'lucide-react';
import ComponentPreview from '@/components/builder/ComponentPreview';
import DynamicComponentPreview from '@/components/builder/DynamicComponentPreview';
import CodeEditor from '@/components/builder/CodeEditor';
import CSSEditor from '@/components/builder/CSSEditor';
import ConfigForm from '@/components/builder/ConfigForm';
import TemplateLibrary from '@/components/builder/TemplateLibrary';
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
  const [customCSS, setCustomCSS] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [previewMode, setPreviewMode] = useState<'static' | 'dynamic'>('dynamic');
  const { toast } = useToast();

  useEffect(() => {
    loadSection(selectedSection);
  }, [selectedSection]);

  const loadSection = async (sectionName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/components/${sectionName}`);
      if (response.ok) {
        const data = await response.json();
        setConfig(data.config);
        setCode(data.code);
        setCustomCSS(data.customCSS || '');
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

  const saveChanges = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/components/${selectedSection}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, config, customCSS }),
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

  const exportConfig = () => {
    const exportData = {
      section: selectedSection,
      config,
      code,
      customCSS,
      timestamp: new Date().toISOString()
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedSection.toLowerCase()}-complete.json`;
    link.click();
  };

  const importConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importData = JSON.parse(e.target?.result as string);
          setConfig(importData.config || {});
          setCode(importData.code || '');
          setCustomCSS(importData.customCSS || '');
          toast({
            title: "Success",
            description: "Configuration imported successfully!"
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Invalid configuration file",
            variant: "destructive"
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const applyTemplate = (template: any) => {
    setConfig(template.config);
    setCode(template.code);
    setCustomCSS(template.customCSS || '');
    toast({
      title: "Template Applied",
      description: `${template.name} template has been loaded successfully!`
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Page Builder</h1>
            <p className="text-gray-600">Build and customize your website sections</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Button onClick={exportConfig} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <label>
                <Button variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </span>
                </Button>
                <input
                  type="file"
                  accept=".json"
                  onChange={importConfig}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setPreviewMode(previewMode === 'static' ? 'dynamic' : 'static')}
                variant="outline"
                size="sm"
                title={`Switch to ${previewMode === 'static' ? 'Dynamic' : 'Static'} Preview`}
              >
                {previewMode === 'static' ? 'Static' : 'Dynamic'} Preview
              </Button>
            </div>
            <Button onClick={saveChanges} disabled={isLoading} size="sm">
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
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
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="preview">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="code">
                    <Code className="w-4 h-4 mr-2" />
                    JSX/TSX
                  </TabsTrigger>
                  <TabsTrigger value="css">
                    <Palette className="w-4 h-4 mr-2" />
                    CSS
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="preview" className="h-full m-0">
                {previewMode === 'dynamic' ? (
                  <DynamicComponentPreview 
                    sectionType={selectedSection} 
                    config={config} 
                    code={code}
                  />
                ) : (
                  <ComponentPreview sectionType={selectedSection} config={config} />
                )}
              </TabsContent>
              <TabsContent value="code" className="h-full m-0 p-4">
                <div className="space-y-4 h-full">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Live Code Editor:</strong> Edit JSX/TSX code and see changes in real-time.
                      Use React hooks, Tailwind classes, and Lucide icons.
                    </p>
                  </div>
                  <CodeEditor
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    height="calc(100% - 80px)"
                  />
                </div>
              </TabsContent>
              <TabsContent value="css" className="h-full m-0 p-4">
                <div className="space-y-4 h-full">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <p className="text-sm text-purple-800">
                      <strong>Custom CSS:</strong> Add custom styles that will be applied to your section.
                      Use CSS selectors and properties.
                    </p>
                  </div>
                  <CSSEditor
                    value={customCSS}
                    onChange={(value) => setCustomCSS(value || '')}
                    height="calc(100% - 80px)"
                  />
                </div>
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
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">{selectedSection} Configuration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ConfigForm
                      config={config}
                      onChange={setConfig}
                      sectionType={selectedSection}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <TemplateLibrary
                      sectionType={selectedSection}
                      onApplyTemplate={applyTemplate}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}