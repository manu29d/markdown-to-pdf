import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PreviewProps } from '../types';

const Preview: React.FC<PreviewProps> = ({ markdown, fontFamily, theme }) => {
  const { colors } = theme;

  return (
    <div id="preview-container" className="h-full w-full bg-pastel-slate overflow-auto flex justify-center p-8 relative">
      {/* A4 Paper Simulation */}
      <div 
        id="resume-preview"
        className="bg-white shadow-lg w-[210mm] min-h-[297mm] px-[15mm] py-[10mm] md:px-[20mm] md:py-[15mm] box-border mx-auto origin-top transition-colors duration-300"
        style={{ fontFamily: fontFamily }}
      >
        <style>{`
          #resume-preview ul li::marker {
            color: ${colors.primary};
          }
        `}</style>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            // User requirement: h1 = 14pt (approx 19px/1.25rem)
            // Color: Theme Primary
            // Border: Theme Accent
            h1: ({node, ...props}) => (
              <h1 
                className="text-[14pt] font-bold border-b-2 pb-2 mb-4 mt-6 first:mt-0 leading-tight uppercase tracking-wider" 
                style={{ color: colors.primary, borderColor: colors.accent }}
                {...props} 
              />
            ),
            
            // h2 usually standard headings
            h2: ({node, ...props}) => (
              <h2 
                className="text-[13pt] font-bold mt-5 mb-3 leading-snug" 
                style={{ color: colors.secondary }}
                {...props} 
              />
            ),
            
            // User requirement: h3 = 12pt
            h3: ({node, ...props}) => (
              <h3 
                className="text-[12pt] font-bold uppercase tracking-wide border-b pb-1 mt-6 mb-3" 
                style={{ color: colors.secondary, borderColor: colors.accent }}
                {...props} 
              />
            ),
            
            // User requirement: p = 10pt
            p: ({node, ...props}) => (
              <p 
                className="text-[10pt] leading-[1.6] mb-3" 
                style={{ color: colors.body }}
                {...props} 
              />
            ),
            
            ul: ({node, ...props}) => (
              <ul 
                className="list-disc list-outside ml-4 mb-3 text-[10pt]" 
                style={{ color: colors.body }}
                {...props} 
              />
            ),
            
            ol: ({node, ...props}) => (
              <ol 
                className="list-decimal list-outside ml-4 mb-3 text-[10pt]" 
                style={{ color: colors.body }}
                {...props} 
              />
            ),
            
            li: ({node, ...props}) => (
              <li className="mb-1 leading-[1.5] pl-1" {...props} />
            ),
            
            a: ({node, ...props}) => (
              <a 
                className="underline decoration-1 underline-offset-2 hover:opacity-80 transition-opacity" 
                style={{ color: colors.link, textDecorationColor: colors.accent }}
                {...props} 
              />
            ),
            
            hr: ({node, ...props}) => (
              <hr 
                className="border-t my-4" 
                style={{ borderColor: colors.accent }}
                {...props} 
              />
            ),
            
            blockquote: ({node, ...props}) => (
              <blockquote 
                className="border-l-4 pl-4 italic my-4" 
                style={{ borderColor: colors.accent, color: colors.body }}
                {...props} 
              />
            ),
            
            // Strong uses Primary color for emphasis
            strong: ({node, ...props}) => (
              <strong 
                className="font-bold" 
                style={{ color: colors.primary }}
                {...props} 
              />
            ),
            
            em: ({node, ...props}) => (
              <em className="italic" {...props} />
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Preview;