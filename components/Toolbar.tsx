import React from 'react';
import { Download, Sparkles, RotateCcw, FileText } from 'lucide-react';
import { ToolbarProps } from '../types';

const Toolbar: React.FC<ToolbarProps> = ({ onPrint, onAiPolish, onReset, isGenerating }) => {
  return (
    <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between no-print z-50">
      <div className="flex items-center gap-2">
        <div className="bg-rose-100 p-2 rounded-lg text-rose-500">
          <FileText size={20} />
        </div>
        <h1 className="font-bold text-slate-700 text-lg tracking-tight">
          MarkDown<span className="text-rose-400">CV</span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors"
          title="Reset to sample"
        >
          <RotateCcw size={16} />
          <span className="hidden sm:inline">Reset</span>
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1"></div>

        <button
          onClick={onAiPolish}
          disabled={isGenerating}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm
            ${isGenerating 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200'}
          `}
        >
          <Sparkles size={16} className={isGenerating ? "animate-spin" : ""} />
          <span>{isGenerating ? 'Polishing...' : 'AI Polish'}</span>
        </button>

        <button
          onClick={onPrint}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-sm font-medium transition-all shadow-md active:scale-95"
        >
          <Download size={16} />
          <span>Save PDF</span>
        </button>
      </div>
    </header>
  );
};

export default Toolbar;
