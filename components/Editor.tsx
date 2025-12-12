import React from 'react';
import Editor from 'react-simple-code-editor';
// @ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-markdown';
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme for editor contrast

interface EditorComponentProps {
  markdown: string;
  onChange: (value: string) => void;
}

const EditorComponent: React.FC<EditorComponentProps> = ({ markdown, onChange }) => {
  return (
    <div className="h-full w-full bg-[#282c34] text-sm font-mono overflow-auto border-r border-slate-200">
      <style>{`
        .textarea-editor {
            min-height: 100%;
        }
        /* Overriding prism styles for cleaner look */
        code[class*="language-"], pre[class*="language-"] {
            font-family: 'Fira Code', monospace !important;
            font-size: 13px !important;
            line-height: 1.6 !important;
            text-shadow: none !important;
        }
      `}</style>
      <Editor
        value={markdown}
        onValueChange={onChange}
        highlight={(code) => highlight(code, languages.markdown)}
        padding={24}
        className="textarea-editor"
        style={{
          fontFamily: '"Fira Code", monospace',
          fontSize: 13,
        }}
        textareaId="markdown-editor"
        placeholder="Type your resume markdown here..."
      />
    </div>
  );
};

export default EditorComponent;
