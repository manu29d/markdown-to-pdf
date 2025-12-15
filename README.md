# Pastel Resume Builder

A beautiful, Markdown-to-PDF resume builder featuring soft pastel themes, live A4 preview, and AI-powered text polishing.

## Features

- **Live Preview**: Real-time rendering of Markdown into a professional A4 resume format.
- **AI Polish**: Integrated with Google Gemini 2.5 Flash to enhance resume content with professional phrasing and strong action verbs.
- **Customization**:
  - **Themes**: Choose from 5 curated pastel color palettes (Sage, Ocean, Rose, Lavender, Charcoal).
  - **Fonts**: Select from professional typefaces (Inter, Lato, Merriweather, etc.).
  - **Templates**: One-click resume templates for different career levels.
- **Privacy Focused**: Runs entirely in the browser (client-side). Your data doesn't leave your device except for the optional AI Polish feature.
- **Print to PDF**: Uses native browser print capabilities for vector-perfect PDF export.

## Usage

### Prerequisites
- A modern web browser (Chrome, Edge, Firefox, Safari).
- (Optional) A Google Gemini API Key for the "AI Polish" feature.

### Running Locally

Since this application uses ES Modules directly via `importmap`, you can run it with any static file server.

1. Clone or download the repository.
2. Serve the directory.
   - **Using Python**:
     ```bash
     python3 -m http.server 8000
     ```
   - **Using Node/npx**:
     ```bash
     npx serve
     ```
3. Open `http://localhost:8000` in your browser.

### Using the App

1. **Edit**: Type your resume in Markdown on the left pane.
2. **Customize**: Use the toolbar to change fonts and color themes.
3. **AI Polish**: 
   - Ensure you have an `API_KEY` configured in your environment or code (Note: For this static demo, you may need to manually input it or proxy it if not running in a secure env). 
   - Click "AI Polish" to improve your text.
4. **Save**: Click "PDF" or use `Ctrl+P` (Cmd+P) to save the document. Ensure "Background Graphics" is enabled in your print settings.

## Deployment

### GitHub Pages

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

1. Go to **Settings > Pages** in your GitHub repository.
2. Ensure **Source** is set to "GitHub Actions".
3. Push your code to the `main` branch.
4. The workflow defined in `.github/workflows/deploy.yml` will automatically build and deploy the site.

## Configuration

To enable the AI features, the application expects an API Key. 
*Note: In a pure client-side static deployment, exposing API keys is risky. For production use, consider setting up a lightweight backend proxy.*
