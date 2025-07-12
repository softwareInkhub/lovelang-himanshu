import React from 'react';
import Editor from '@monaco-editor/react';

interface CSSEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  height?: string;
}

const CSSEditor: React.FC<CSSEditorProps> = ({ 
  value, 
  onChange, 
  height = '300px'
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-800 text-white px-4 py-2 text-sm font-semibold">
        Custom CSS
      </div>
      <Editor
        height={height}
        defaultLanguage="css"
        value={value}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
        }}
      />
    </div>
  );
};

export default CSSEditor;