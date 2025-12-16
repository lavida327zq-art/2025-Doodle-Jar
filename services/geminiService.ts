import { GoogleGenAI } from "@google/genai";

const getGeminiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not set in process.env");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateReflectiveQuestion = async (): Promise<string> => {
  const ai = getGeminiClient();
  if (!ai) {
    // Fallback if no API key is present
    const fallbacks = [
      "What was the most unexpected joy of 2024?",
      "Who made you smile the most this year?",
      "What is a habit you want to keep in 2025?",
      "Describe your favorite quiet moment from last year.",
      "What was the biggest risk you took?"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a single, short, reflective question for a 'Year in Review' journal. It should be warm, nostalgic, and open-ended. Return ONLY the question text, no quotes.",
    });
    
    return response.text.trim() || "What is your hope for tomorrow?";
  } catch (error) {
    console.error("Failed to generate question:", error);
    return "What made you feel grateful today?";
  }
};