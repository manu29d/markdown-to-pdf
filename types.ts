export interface ResumeState {
  markdown: string;
  isGenerating: boolean;
}

export interface ToolbarProps {
  onPrint: () => void;
  onAiPolish: () => void;
  onReset: () => void;
  isGenerating: boolean;
}

export interface EditorProps {
  markdown: string;
  onChange: (value: string) => void;
}

export interface PreviewProps {
  markdown: string;
}
