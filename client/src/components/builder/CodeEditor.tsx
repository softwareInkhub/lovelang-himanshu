import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: string;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  value, 
  onChange, 
  language = 'typescript',
  height = '400px'
}) => {
  console.log('CodeEditor received value:', value?.substring(0, 100) + '...'); // Debug log
  
  return (
    <div className="border rounded-lg overflow-hidden bg-gray-900">
      {!value ? (
        <div className="flex items-center justify-center h-full min-h-[400px] text-gray-400">
          <div className="text-center">
            <div className="text-lg mb-2">No code generated yet</div>
            <div className="text-sm">Click "Generate Code" or modify configuration to see code</div>
          </div>
        </div>
      ) : (
        <Editor
          height={height}
          defaultLanguage={language}
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
            readOnly: false,
            wordWrap: 'on'
          }}
        />
      )}
    </div>
  );
};

export default CodeEditor;