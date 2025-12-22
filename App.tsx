import React, { useState, useCallback } from 'react';
import Toolbar from './components/Toolbar';
import EditorComponent from './components/Editor';
import Preview from './components/Preview';
import { polishResume } from './services/geminiService';
import { INITIAL_MARKDOWN, FONTS, THEMES, TEMPLATES } from './constants';

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(INITIAL_MARKDOWN);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  // New State for customizations
  const [selectedFontId, setSelectedFontId] = useState<string>(FONTS[0].id);
  const [selectedThemeId, setSelectedThemeId] = useState<string>(THEMES[0].id);

  // Derived state helpers
  const currentFont = FONTS.find(f => f.id === selectedFontId) || FONTS[0];
  const currentTheme = THEMES.find(t => t.id === selectedThemeId) || THEMES[0];

  // Handle printing/PDF generation
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // Handle Reset
  const handleReset = useCallback(() => {
    if (window.confirm('Are you sure you want to reset to the sample resume? Your changes will be lost.')) {
      setMarkdown(INITIAL_MARKDOWN);
      setSelectedFontId(FONTS[0].id);
      setSelectedThemeId(THEMES[0].id);
    }
  }, []);

  // Handle Template Selection
  const handleTemplateSelect = useCallback((templateId: string) => {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (template && window.confirm(`Load "${template.name}" template? Current contents will be replaced.`)) {
      setMarkdown(template.content);
    }
  }, []);

  // Handle AI Polish
  const handleAiPolish = useCallback(async () => {
    setIsGenerating(true);
    try {
      const improvedMarkdown = await polishResume(markdown);
      setMarkdown(improvedMarkdown);
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Failed to improve resume using AI. Please try again.";
      alert(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  }, [markdown]);

  return (
    <div className="flex flex-col h-screen overflow-hidden print:h-auto print:overflow-visible">
      <div className="print:hidden">
        <Toolbar 
          onPrint={handlePrint}
          onAiPolish={handleAiPolish}
          onReset={handleReset}
          isGenerating={isGenerating}
          
          fonts={FONTS}
          selectedFont={selectedFontId}
          onFontChange={setSelectedFontId}
          
          themes={THEMES}
          selectedTheme={selectedThemeId}
          onThemeChange={setSelectedThemeId}

          templates={TEMPLATES}
          onTemplateSelect={handleTemplateSelect}
        />
      </div>
      
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative print:h-auto print:overflow-visible print:block">
        {/* Editor Pane */}
        <div className="flex-1 h-full overflow-hidden flex flex-col min-h-[300px] border-b md:border-b-0 print:hidden">
          <div className="bg-[#21252b] text-slate-400 text-xs px-4 py-1.5 flex justify-between items-center border-b border-white/5 uppercase tracking-wider font-semibold">
            <span>Markdown Source</span>
          </div>
          <EditorComponent 
            markdown={markdown} 
            onChange={setMarkdown} 
          />
        </div>

        {/* Preview Pane */}
        <div className="flex-1 h-full bg-pastel-slate relative flex flex-col overflow-hidden print:h-auto print:overflow-visible print:bg-white">
          <div className="bg-white/80 backdrop-blur text-slate-500 text-xs px-4 py-1.5 flex justify-between items-center border-b border-slate-200 uppercase tracking-wider font-semibold z-10 shadow-sm print:hidden">
            <span>Live Preview (A4)</span>
          </div>
          <div className="flex-1 overflow-auto bg-slate-100 print:overflow-visible print:bg-white print:h-auto">
             <Preview 
               markdown={markdown} 
               fontFamily={currentFont.family}
               theme={currentTheme}
             />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
