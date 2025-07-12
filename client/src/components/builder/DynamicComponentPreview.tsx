import React, { useMemo, useCallback } from 'react';
import * as LucideReact from 'lucide-react';

interface DynamicComponentPreviewProps {
  code: string;
  config: any;
  sectionType: string;
}

const DynamicComponentPreview: React.FC<DynamicComponentPreviewProps> = ({ 
  code, 
  config, 
  sectionType 
}) => {
  const renderDynamicComponent = useCallback(() => {
    try {
      // Create a safe environment for code execution
      const componentScope = {
        React,
        ...React,
        useState: React.useState,
        useEffect: React.useEffect,
        useMemo: React.useMemo,
        useCallback: React.useCallback,
        ...LucideReact, // Include Lucide icons
        config,
        className: '', // For Tailwind classes
      };

      // Clean the code to extract just the component function
      const cleanCode = code
        .replace(/import.*?from.*?;/g, '') // Remove imports
        .replace(/export\s+default\s+/g, '') // Remove export default
        .trim();

      // Create a function that returns the component
      const componentFunction = new Function(
        ...Object.keys(componentScope),
        `return ${cleanCode}`
      );

      // Execute the function with the scope
      const Component = componentFunction(...Object.values(componentScope));

      // Return the rendered component
      return React.createElement(Component, { config });
    } catch (error) {
      console.error('Error rendering dynamic component:', error);
      return (
        <div className="p-8 text-center bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            Component Error
          </h3>
          <p className="text-red-600 text-sm">
            {error instanceof Error ? error.message : 'Failed to render component'}
          </p>
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-red-700 font-medium">
              Show Details
            </summary>
            <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto">
              {error instanceof Error ? error.stack : String(error)}
            </pre>
          </details>
        </div>
      );
    }
  }, [code, config]);

  const renderedComponent = useMemo(() => {
    return renderDynamicComponent();
  }, [renderDynamicComponent]);

  return (
    <div className="w-full h-full overflow-auto bg-white">
      <div className="min-h-full">
        {renderedComponent}
      </div>
    </div>
  );
};

export default DynamicComponentPreview;