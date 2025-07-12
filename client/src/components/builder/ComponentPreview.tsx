import React, { useMemo } from 'react';
import HeroSection from './HeroSection';
import CollectionsSection from './CollectionsSection';
import FooterSection from './FooterSection';

interface ComponentPreviewProps {
  sectionType: string;
  config: any;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ sectionType, config }) => {
  const renderComponent = useMemo(() => {
    switch (sectionType) {
      case 'HeroSection':
        return <HeroSection config={config} />;
      case 'CollectionsSection':
        return <CollectionsSection config={config} />;
      case 'FooterSection':
        return <FooterSection config={config} />;
      default:
        return (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-xl">Select a section to preview</h3>
          </div>
        );
    }
  }, [sectionType, config]);

  return (
    <div className="w-full h-full overflow-auto bg-white">
      <div className="min-h-full">
        {renderComponent}
      </div>
    </div>
  );
};

export default ComponentPreview;