import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Download, Share, Package, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportManagerProps {
  selectedSections: string[];
  onExport: (options: ExportOptions) => void;
}

interface ExportOptions {
  format: 'react' | 'html' | 'template';
  includeStyles: boolean;
  includeConfig: boolean;
  packageName?: string;
  description?: string;
}

const ExportManager: React.FC<ExportManagerProps> = ({ selectedSections, onExport }) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'react',
    includeStyles: true,
    includeConfig: true,
    packageName: 'my-website-template',
    description: 'Custom website template created with LoveLang Page Builder'
  });
  const { toast } = useToast();

  const handleExport = () => {
    onExport(exportOptions);
    toast({
      title: "Export Started",
      description: `Exporting ${selectedSections.length} sections as ${exportOptions.format.toUpperCase()}`
    });
  };

  const generateShareableLink = async () => {
    try {
      const response = await fetch('/api/templates/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections: selectedSections, options: exportOptions })
      });
      
      const { shareId } = await response.json();
      const shareUrl = `${window.location.origin}/template/${shareId}`;
      
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Share Link Created",
        description: "Shareable link copied to clipboard!"
      });
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Failed to create shareable link",
        variant: "destructive"
      });
    }
  };

  const publishToGallery = async () => {
    try {
      const response = await fetch('/api/templates/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sections: selectedSections,
          options: exportOptions,
          public: true
        })
      });
      
      if (response.ok) {
        toast({
          title: "Published Successfully",
          description: "Your template is now available in the public gallery!"
        });
      }
    } catch (error) {
      toast({
        title: "Publish Failed",
        description: "Failed to publish template",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6 h-full overflow-auto">
      <Card>
        <CardHeader>
          <CardTitle>Export & Share</CardTitle>
          <p className="text-sm text-gray-600">
            Export your sections as reusable templates
          </p>
        </CardHeader>
      <CardContent className="space-y-6">
        {/* Template Info */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="packageName">Template Name</Label>
            <Input
              id="packageName"
              value={exportOptions.packageName}
              onChange={(e) => setExportOptions(prev => ({ ...prev, packageName: e.target.value }))}
              placeholder="my-awesome-template"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={exportOptions.description}
              onChange={(e) => setExportOptions(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your template..."
              rows={3}
            />
          </div>
        </div>

        {/* Export Format */}
        <div>
          <Label>Export Format</Label>
          <div className="flex space-x-2 mt-2">
            {['react', 'html', 'template'].map((format) => (
              <Button
                key={format}
                size="sm"
                variant={exportOptions.format === format ? "default" : "outline"}
                onClick={() => setExportOptions(prev => ({ ...prev, format: format as any }))}
              >
                {format.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-3">
          <Label>Include</Label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.includeStyles}
                onChange={(e) => setExportOptions(prev => ({ ...prev, includeStyles: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">Styles & CSS</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.includeConfig}
                onChange={(e) => setExportOptions(prev => ({ ...prev, includeConfig: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">Configuration Files</span>
            </label>
          </div>
        </div>

        {/* Selected Sections */}
        <div>
          <Label>Selected Sections ({selectedSections.length})</Label>
          <div className="mt-2 space-y-1">
            {selectedSections.map((section) => (
              <div key={section} className="text-sm bg-gray-100 px-3 py-1 rounded">
                {section}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={handleExport} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={generateShareableLink}>
              <Share className="w-4 h-4 mr-2" />
              Share Link
            </Button>
            <Button variant="outline" onClick={publishToGallery}>
              <Globe className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="text-center pt-4 border-t">
          <p className="text-sm text-gray-500">
            Your templates have been downloaded 0 times
          </p>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default ExportManager;