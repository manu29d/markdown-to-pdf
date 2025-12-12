export interface ResumeState {
  markdown: string;
  isGenerating: boolean;
}

export interface ThemeColors {
  primary: string;   // H1, Strong
  secondary: string; // H2, H3
  body: string;      // P, Li
  accent: string;    // Borders, HR
  link: string;      // Links
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
}

export interface FontOption {
  id: string;
  name: string;
  family: string;
}

export interface Template {
  id: string;
  name: string;
  content: string;
}

export interface ToolbarProps {
  onPrint: () => void;
  onAiPolish: () => void;
  onReset: () => void;
  isGenerating: boolean;
  
  fonts: FontOption[];
  selectedFont: string;
  onFontChange: (fontId: string) => void;

  themes: Theme[];
  selectedTheme: string;
  onThemeChange: (themeId: string) => void;

  templates: Template[];
  onTemplateSelect: (templateId: string) => void;
}

export interface EditorProps {
  markdown: string;
  onChange: (value: string) => void;
}

export interface PreviewProps {
  markdown: string;
  fontFamily: string;
  theme: Theme;
}
