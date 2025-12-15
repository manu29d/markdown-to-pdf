import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let client: GoogleGenAI | null = null;
let lastApiKey: string | null = null;

const getClient = () => {
  // Check localStorage for API key first, fall back to env var
  const apiKey = localStorage.getItem('gemini_api_key') || process.env.API_KEY;
  
  if (!apiKey) {
    console.error("API_KEY is missing. Please set it in Settings.");
    throw new Error("API Key not found. Please configure it in Settings.");
  }

  // Recreate client if API key changed
  if (!client || lastApiKey !== apiKey) {
    client = new GoogleGenAI({ apiKey });
    lastApiKey = apiKey;
  }
  
  return client;
};

export const polishResume = async (currentMarkdown: string): Promise<string> => {
  try {
    const ai = getClient();
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: currentMarkdown,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3, // Low temperature for more deterministic/professional results
      },
    });

    let text = response.text;
    
    if (!text) return currentMarkdown;

    // Cleanup if the model accidentally wrapped it in code blocks despite instructions
    if (text.startsWith("```markdown")) {
      text = text.replace(/^```markdown\n/, "").replace(/\n```$/, "");
    } else if (text.startsWith("```")) {
      text = text.replace(/^```\n/, "").replace(/\n```$/, "");
    }

    return text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
