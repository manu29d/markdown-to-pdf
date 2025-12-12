import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is missing from environment variables.");
      throw new Error("API Key not found");
    }
    client = new GoogleGenAI({ apiKey });
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
