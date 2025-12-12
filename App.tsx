import React, { useState, useCallback } from 'react';
import Toolbar from './components/Toolbar';
import EditorComponent from './components/Editor';
import Preview from './components/Preview';
import { polishResume } from './services/geminiService';
import { INITIAL_MARKDOWN } from './constants';

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(INITIAL_MARKDOWN);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Handle printing/PDF generation
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // Handle Reset
  const handleReset = useCallback(() => {
    if (window.confirm('Are you sure you want to reset to the sample resume? Your changes will be lost.')) {
      setMarkdown(INITIAL_MARKDOWN);
    }
  }, []);

  // Handle AI Polish
  const handleAiPolish = useCallback(async () => {
    if (!process.env.API_KEY) {
      alert("Please configure the API_KEY in your environment to use AI features.");
      return;
    }
    
    setIsGenerating(true);
    try {
      const improvedMarkdown = await polishResume(markdown);
      setMarkdown(improvedMarkdown);
    } catch (error) {
      console.error(error);
      alert("Failed to improve resume using AI. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [markdown]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Toolbar 
        onPrint={handlePrint}
        onAiPolish={handleAiPolish}
        onReset={handleReset}
        isGenerating={isGenerating}
      />
      
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Editor Pane */}
        <div className="flex-1 h-full overflow-hidden flex flex-col min-h-[300px] border-b md:border-b-0">
          <div className="bg-[#21252b] text-slate-400 text-xs px-4 py-1.5 flex justify-between items-center border-b border-white/5 uppercase tracking-wider font-semibold">
            <span>Markdown Source</span>
          </div>
          <EditorComponent 
            markdown={markdown} 
            onChange={setMarkdown} 
          />
        </div>

        {/* Preview Pane */}
        <div className="flex-1 h-full bg-pastel-slate relative flex flex-col overflow-hidden">
          <div className="bg-white/80 backdrop-blur text-slate-500 text-xs px-4 py-1.5 flex justify-between items-center border-b border-slate-200 uppercase tracking-wider font-semibold z-10 shadow-sm">
            <span>Live Preview (A4)</span>
          </div>
          <div className="flex-1 overflow-auto bg-slate-100">
             <Preview markdown={markdown} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
