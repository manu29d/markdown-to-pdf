# AI Coding Agent Instructions for Pastel Resume Builder

## Project Overview
A **client-side React application** for creating beautiful resume PDFs from Markdown. Key architectural choice: Privacy-first design—all processing happens in the browser except for optional AI features.

## Architecture & Data Flow

### Component Structure (React 19 + Vite)
- **App.tsx**: Central state management (markdown content, font/theme selections)
- **components/Editor.tsx**: Markdown editor using `react-simple-code-editor` + PrismJS syntax highlighting
- **components/Preview.tsx**: Live A4 preview rendering markdown with `react-markdown` + `remark-gfm`
- **components/Toolbar.tsx**: Controls for fonts, themes, templates, PDF export, and AI polish
- **services/geminiService.ts**: Google Gemini 2.5 Flash integration for resume enhancement

### State Flow Pattern
State lives in `App.tsx` and flows down via props. Updates flow up via callbacks:
```tsx
// App.tsx manages all state
const [markdown, setMarkdown] = useState<string>(INITIAL_MARKDOWN);
const [selectedFontId, setSelectedFontId] = useState<string>(FONTS[0].id);
const [selectedThemeId, setSelectedThemeId] = useState<string>(THEMES[0].id);
```

### Styling System
- **Tailwind CSS** (CDN version loaded in `index.html`) for utility classes
- **Dynamic theming** via inline styles—see `Preview.tsx` for how theme colors apply to markdown elements
- **Print-specific CSS** in `index.html` (lines 51-88)—critical for PDF generation via `window.print()`

## Key Technical Decisions

### 1. Environment Variables (API Keys)
API keys are injected at **build time** via Vite's `define` in `vite.config.ts`:
```typescript
define: {
  'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
}
```
⚠️ **Security note**: This approach exposes API keys in the client bundle. For production, use a backend proxy (see README warnings).

### 2. PDF Generation
Uses native browser `window.print()` with print-specific CSS media queries. No backend required:
```typescript
const handlePrint = useCallback(() => {
  window.print(); // See index.html for @media print styles
}, []);
```
Users must enable "Background Graphics" in print settings for proper theme colors.

### 3. TypeScript Patterns
- **Centralized types** in `types.ts`—all interfaces exported
- **Constants** in `constants.ts`—themes, fonts, templates, AI prompt
- **Type safety** enforced for all props using explicit interfaces (e.g., `ToolbarProps`, `PreviewProps`)

## Development Workflows

### Commands
```bash
npm run dev     # Vite dev server on port 3000
npm run build   # Production build to dist/
npm run preview # Preview production build
```

### Testing Changes
1. Run `npm run dev` and open `http://localhost:3000`
2. Test markdown rendering in both editor and preview panes
3. Test print/PDF by using `Ctrl+P` (Cmd+P) and checking preview
4. For AI polish: set `GEMINI_API_KEY` env var before starting dev server

### AI Feature Testing
The `polishResume` function in `geminiService.ts` uses:
- **Model**: `gemini-2.5-flash`
- **Temperature**: 0.3 (low for deterministic professional output)
- **System instruction**: Defined in `constants.ts` as `SYSTEM_INSTRUCTION`
- **Post-processing**: Strips markdown code fences if AI wraps response

## Project-Specific Conventions

### Adding New Themes
1. Add to `THEMES` array in `constants.ts` with `ThemeColors` interface
2. Colors apply to markdown elements via `Preview.tsx` component overrides:
   - `primary`: H1 headings and strong text
   - `secondary`: H2/H3 headings
   - `body`: Paragraphs and list items
   - `accent`: Borders and horizontal rules
   - `link`: Hyperlinks

### Adding New Fonts
1. Add Google Font link to `index.html` (line 30)
2. Add to `FONTS` array in `constants.ts` with exact font family string
3. Font applies via inline style on `#resume-preview` div in `Preview.tsx`

### Adding New Templates
Add to `TEMPLATES` array in `constants.ts` with:
- `id`: unique identifier
- `name`: display name in dropdown
- `content`: full markdown string (see existing examples)

### Markdown Rendering Customization
Modify `react-markdown` component overrides in `Preview.tsx`:
- Font sizes use CSS `pt` units for print accuracy (e.g., `text-[10pt]`)
- All text elements styled with theme colors via inline styles
- List markers colored via injected `<style>` tag

## Common Gotchas

1. **Tailwind classes must match CDN version**—custom config in `index.html` defines `pastel.*` color palette
2. **PrismJS theme** (`prism-tomorrow.css`) imported in `Editor.tsx`—changing requires understanding style injection order
3. **React 19 specifics**—uses newer `react-dom` client APIs; check compatibility when upgrading dependencies
4. **Vite path alias**—`@/` resolves to project root (see `vite.config.ts`)

## Integration Points

- **Google Gemini API**: Only external dependency, called from `geminiService.ts`
- **External fonts**: Google Fonts via CDN in `index.html`
- **Tailwind CSS**: CDN-based, no build step for styles

## When Modifying Code

- **UI changes**: Consider impact on both screen view and print output (test with `Ctrl+P`)
- **State updates**: Always use callbacks pattern—avoid direct state mutation
- **Type changes**: Update `types.ts` first, then implementation files
- **New dependencies**: Check bundle size impact (Vite build shows gzipped sizes)
