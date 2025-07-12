import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ConfigFormProps {
  config: any;
  onChange: (config: any) => void;
  sectionType: string;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ config, onChange, sectionType }) => {
  const updateConfig = (key: string, value: any) => {
    onChange({ ...config, [key]: value });
  };

  const updateNestedConfig = (parentKey: string, childKey: string, value: any) => {
    onChange({
      ...config,
      [parentKey]: {
        ...config[parentKey],
        [childKey]: value
      }
    });
  };

  const renderHeroForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="backgroundImage">Background Image URL</Label>
        <Input
          id="backgroundImage"
          value={config.backgroundImage || ''}
          onChange={(e) => updateConfig('backgroundImage', e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      <div>
        <Label htmlFor="heading">Heading</Label>
        <Input
          id="heading"
          value={config.heading || ''}
          onChange={(e) => updateConfig('heading', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="subtitle">Subtitle</Label>
        <Textarea
          id="subtitle"
          value={config.subtitle || ''}
          onChange={(e) => updateConfig('subtitle', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="buttonText">Button Text</Label>
        <Input
          id="buttonText"
          value={config.buttonText || ''}
          onChange={(e) => updateConfig('buttonText', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="textColor">Text Color</Label>
        <Input
          id="textColor"
          type="color"
          value={config.textColor || '#ffffff'}
          onChange={(e) => updateConfig('textColor', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="overlayOpacity">Overlay Opacity (%)</Label>
        <input
          id="overlayOpacity"
          type="range"
          min="0"
          max="100"
          value={config.overlayOpacity || 50}
          onChange={(e) => updateConfig('overlayOpacity', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="text-sm text-gray-500 mt-1">{config.overlayOpacity || 50}%</div>
      </div>
    </div>
  );

  const renderCollectionsForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Section Title</Label>
        <Input
          id="title"
          value={config.title || ''}
          onChange={(e) => updateConfig('title', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="subtitle">Section Subtitle</Label>
        <Textarea
          id="subtitle"
          value={config.subtitle || ''}
          onChange={(e) => updateConfig('subtitle', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="backgroundColor">Background Color</Label>
        <Input
          id="backgroundColor"
          type="color"
          value={config.backgroundColor || '#f8f9fa'}
          onChange={(e) => updateConfig('backgroundColor', e.target.value)}
        />
      </div>
    </div>
  );

  const renderFooterForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={config.companyName || ''}
          onChange={(e) => updateConfig('companyName', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={config.description || ''}
          onChange={(e) => updateConfig('description', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="backgroundColor">Background Color</Label>
        <Input
          id="backgroundColor"
          type="color"
          value={config.backgroundColor || '#1f2937'}
          onChange={(e) => updateConfig('backgroundColor', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="textColor">Text Color</Label>
        <Input
          id="textColor"
          type="color"
          value={config.textColor || '#ffffff'}
          onChange={(e) => updateConfig('textColor', e.target.value)}
        />
      </div>
    </div>
  );

  const renderGenericForm = () => (
    <div className="space-y-4">
      <div>
        <Label>Configuration JSON</Label>
        <Textarea
          value={JSON.stringify(config, null, 2)}
          onChange={(e) => {
            try {
              const newConfig = JSON.parse(e.target.value);
              onChange(newConfig);
            } catch (error) {
              // Invalid JSON, ignore
            }
          }}
          rows={10}
          className="font-mono text-sm"
        />
      </div>
    </div>
  );

  const renderFormByType = () => {
    if (sectionType === 'HeroSection') {
      return renderHeroForm();
    } else if (sectionType === 'CollectionsSection') {
      return renderCollectionsForm();
    } else if (sectionType === 'FooterSection') {
      return renderFooterForm();
    } else {
      return renderGenericForm();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Section Configuration</h3>
        {renderFormByType()}
      </div>
    </div>
  );
};

export default ConfigForm;
        />
        <span className="text-sm text-gray-500">{config.overlayOpacity || 40}%</span>
      </div>
    </div>
  );

  const renderCollectionsForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Section Title</Label>
        <Input
          id="title"
          value={config.title || ''}
          onChange={(e) => updateConfig('title', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="subtitle">Section Subtitle</Label>
        <Textarea
          id="subtitle"
          value={config.subtitle || ''}
          onChange={(e) => updateConfig('subtitle', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="backgroundColor">Background Color</Label>
        <Input
          id="backgroundColor"
          type="color"
          value={config.backgroundColor || '#fef7ed'}
          onChange={(e) => updateConfig('backgroundColor', e.target.value)}
        />
      </div>
      {config.collections?.map((collection: any, index: number) => (
        <div key={index} className="border p-4 rounded-lg space-y-2">
          <h4 className="font-semibold">Collection {index + 1}</h4>
          <Input
            placeholder="Collection Name"
            value={collection.name || ''}
            onChange={(e) => {
              const newCollections = [...config.collections];
              newCollections[index] = { ...collection, name: e.target.value };
              updateConfig('collections', newCollections);
            }}
          />
          <Input
            placeholder="Image URL"
            value={collection.image || ''}
            onChange={(e) => {
              const newCollections = [...config.collections];
              newCollections[index] = { ...collection, image: e.target.value };
              updateConfig('collections', newCollections);
            }}
          />
          <Textarea
            placeholder="Description"
            value={collection.description || ''}
            onChange={(e) => {
              const newCollections = [...config.collections];
              newCollections[index] = { ...collection, description: e.target.value };
              updateConfig('collections', newCollections);
            }}
          />
        </div>
      ))}
    </div>
  );

  const renderFooterForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={config.companyName || ''}
          onChange={(e) => updateConfig('companyName', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={config.description || ''}
          onChange={(e) => updateConfig('description', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="backgroundColor">Background Color</Label>
        <Input
          id="backgroundColor"
          type="color"
          value={config.backgroundColor || '#1f2937'}
          onChange={(e) => updateConfig('backgroundColor', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="copyright">Copyright Text</Label>
        <Input
          id="copyright"
          value={config.copyright || ''}
          onChange={(e) => updateConfig('copyright', e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Section Configuration</h3>
      {sectionType === 'HeroSection' && renderHeroForm()}
      {sectionType === 'CollectionsSection' && renderCollectionsForm()}
      {sectionType === 'FooterSection' && renderFooterForm()}
    </div>
  );
};

export default ConfigForm;