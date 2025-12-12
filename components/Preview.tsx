import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PreviewProps {
  markdown: string;
}

const Preview: React.FC<PreviewProps> = ({ markdown }) => {
  return (
    <div className="h-full w-full bg-pastel-slate overflow-auto flex justify-center p-8 relative">
      {/* A4 Paper Simulation */}
      <div 
        id="resume-preview"
        className="bg-white shadow-lg w-[210mm] min-h-[297mm] p-[15mm] md:p-[20mm] text-slate-800 box-border mx-auto origin-top"
      >
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            // User requirement: h1 = 14pt (approx 1.25rem or 19px)
            // Tailwind 'text-xl' is 1.25rem (20px). Let's use arbitrary for exactness.
            h1: ({node, ...props}) => (
              <h1 className="text-[14pt] font-bold text-slate-900 border-b-2 border-slate-100 pb-2 mb-4 mt-6 first:mt-0 leading-tight" {...props} />
            ),
            // h2 usually maps to standard headings, let's treat it similarly to h1 but slightly different if user uses ##
            h2: ({node, ...props}) => (
              <h2 className="text-[13pt] font-bold text-slate-800 mt-5 mb-3 leading-snug" {...props} />
            ),
            // User requirement: h3 = 12pt
            h3: ({node, ...props}) => (
              <h3 className="text-[12pt] font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-1 mt-6 mb-3" {...props} />
            ),
            // User requirement: p = 10pt
            p: ({node, ...props}) => (
              <p className="text-[10pt] leading-[1.6] text-slate-600 mb-3" {...props} />
            ),
            ul: ({node, ...props}) => (
              <ul className="list-disc list-outside ml-4 mb-3 text-[10pt] text-slate-600" {...props} />
            ),
            ol: ({node, ...props}) => (
              <ol className="list-decimal list-outside ml-4 mb-3 text-[10pt] text-slate-600" {...props} />
            ),
            li: ({node, ...props}) => (
              <li className="mb-1 leading-[1.5] pl-1" {...props} />
            ),
            a: ({node, ...props}) => (
              <a className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 underline-offset-2" {...props} />
            ),
            hr: ({node, ...props}) => (
              <hr className="border-t border-slate-200 my-4" {...props} />
            ),
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-slate-200 pl-4 italic text-slate-500 my-4" {...props} />
            ),
            // Apply bold styling for emphasis
            strong: ({node, ...props}) => (
              <strong className="font-bold text-slate-800" {...props} />
            ),
            em: ({node, ...props}) => (
              <em className="italic text-slate-700" {...props} />
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
