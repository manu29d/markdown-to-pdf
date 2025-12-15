import React, { useState } from 'react';
import { Download, Sparkles, RotateCcw, FileText, Type, Palette, LayoutTemplate, Settings, X } from 'lucide-react';
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
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [tempApiKey, setTempApiKey] = useState(apiKey);

  const handleSaveApiKey = () => {
    if (tempApiKey.trim()) {
      localStorage.setItem('gemini_api_key', tempApiKey.trim());
      setApiKey(tempApiKey.trim());
    }
    setShowSettings(false);
  };

  const handleClearApiKey = () => {
    if (window.confirm('Are you sure you want to remove your API key from this browser?')) {
      localStorage.removeItem('gemini_api_key');
      setApiKey('');
      setTempApiKey('');
      setShowSettings(false);
    }
  };

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
          onClick={() => setShowSettings(true)}
          className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-sm font-medium transition-all border border-slate-300"
          title="Settings"
        >
          <Settings size={16} />
          <span className="hidden sm:inline">Settings</span>
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

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] no-print" onClick={() => setShowSettings(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">Settings</h2>
              <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Google Gemini API Key
                </label>
                <input
                  type="password"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Your API key is stored locally in your browser and never sent to any server except Google Gemini.
                </p>
              </div>

              <div className="flex gap-2 justify-end">
                {apiKey && (
                  <button
                    onClick={handleClearApiKey}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Remove Key
                  </button>
                )}
                <button
                  onClick={handleSaveApiKey}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Toolbar;
