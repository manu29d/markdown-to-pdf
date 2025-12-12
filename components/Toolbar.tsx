import React from 'react';
import { Download, Sparkles, RotateCcw, FileText, Type, Palette, LayoutTemplate } from 'lucide-react';
import { ToolbarProps } from '../types';

const Toolbar: React.FC<ToolbarProps> = ({ 
  onPrint, 
  onAiPolish, 
  onReset, 
  isGenerating,
  fonts,
  selectedFont,
  onFontChange,
  themes,
  selectedTheme,
  onThemeChange,
  templates,
  onTemplateSelect
}) => {
  return (
    <header className="bg-white border-b border-slate-200 h-auto py-3 md:py-0 md:h-16 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between no-print z-50 gap-3 md:gap-0">
      <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center gap-2">
          <div className="bg-rose-100 p-2 rounded-lg text-rose-500">
            <FileText size={20} />
          </div>
          <h1 className="font-bold text-slate-700 text-lg tracking-tight hidden sm:block">
            MarkDown<span className="text-rose-400">CV</span>
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:gap-3 justify-center w-full md:w-auto">
        
        {/* Templates Dropdown */}
        <div className="relative group">
            <div className="flex items-center gap-1 text-slate-600 bg-slate-50 border border-slate-200 px-2 py-1.5 rounded text-sm hover:bg-slate-100 cursor-pointer">
               <LayoutTemplate size={14} />
               <select 
                 className="bg-transparent outline-none cursor-pointer w-20 sm:w-24 text-slate-700 font-medium appearance-none"
                 onChange={(e) => onTemplateSelect(e.target.value)}
                 value=""
                 title="Load Template"
               >
                 <option value="" disabled>Template</option>
                 {templates.map(t => (
                   <option key={t.id} value={t.id}>{t.name}</option>
                 ))}
               </select>
            </div>
        </div>

        {/* Font Select */}
        <div className="relative">
            <div className="flex items-center gap-1 text-slate-600 bg-slate-50 border border-slate-200 px-2 py-1.5 rounded text-sm hover:bg-slate-100">
               <Type size={14} />
               <select 
                 className="bg-transparent outline-none cursor-pointer w-20 sm:w-24 text-slate-700 font-medium"
                 value={selectedFont}
                 onChange={(e) => onFontChange(e.target.value)}
                 title="Select Font"
               >
                 {fonts.map(f => (
                   <option key={f.id} value={f.id}>{f.name}</option>
                 ))}
               </select>
            </div>
        </div>

        {/* Theme Select */}
        <div className="relative">
            <div className="flex items-center gap-1 text-slate-600 bg-slate-50 border border-slate-200 px-2 py-1.5 rounded text-sm hover:bg-slate-100">
               <Palette size={14} />
               <select 
                 className="bg-transparent outline-none cursor-pointer w-20 sm:w-24 text-slate-700 font-medium"
                 value={selectedTheme}
                 onChange={(e) => onThemeChange(e.target.value)}
                 title="Select Color Theme"
               >
                 {themes.map(t => (
                   <option key={t.id} value={t.id}>{t.name}</option>
                 ))}
               </select>
            </div>
        </div>
        
        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

        <button
          onClick={onAiPolish}
          disabled={isGenerating}
          className={`
            flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm font-medium transition-all shadow-sm
            ${isGenerating 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200'}
          `}
          title="Polish with AI"
        >
          <Sparkles size={16} className={isGenerating ? "animate-spin" : ""} />
          <span className="hidden sm:inline">{isGenerating ? 'Polishing...' : 'AI Polish'}</span>
        </button>

        <button
          onClick={onPrint}
          className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-sm font-medium transition-all shadow-md active:scale-95"
          title="Save as PDF"
        >
          <Download size={16} />
          <span className="hidden sm:inline">PDF</span>
        </button>
      </div>
    </header>
  );
};

export default Toolbar;
