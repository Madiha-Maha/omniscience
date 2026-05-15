import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing. AI features will be disabled.");
      // Return a dummy object or handle gracefully
      return null;
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function getAIInsights(platform: string, metrics: any) {
  try {
    const ai = getAI();
    if (!ai) return "AI services are currently unavailable (missing configuration).";
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a high-level social media analyst. Analyze the following data for ${platform}: ${JSON.stringify(metrics)}. 
      Provide 3 actionable insights in a professional, concise tone. 
      Format rules:
      1. Start with a brief, italicized summarizing paragraph of the current state.
      2. Follow with a list of 3 specific bullet points.
      3. Use italics for emphasis on key results or terminology.
      4. Avoid code blocks. Use plain text with newlines.`,
    });
    return response.text;
  } catch (error) {
    console.error("AI Insights Error:", error);
    return "Unable to generate insights at this time. Please check your API key.";
  }
}

export async function getTrendingKeywords(platform: string) {
  try {
    const ai = getAI();
    if (!ai) return ["Minimalism", "AI Ethics", "Neural Design", "Sustainability", "Veblen Goods", "Etherealism"];

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Identify 6 real-time trending keywords or interests for a high-end social media audience on ${platform}. 
      Focus on sophisticated topics like design, philosophy, emerging tech, and lifestyle.
      Respond with ONLY a comma-separated list. No preamble.`,
    });
    return response.text.split(',').map(s => s.trim());
  } catch (error) {
    console.error("AI Trending Error:", error);
    return ["Minimalism", "AI Ethics", "Neural Design", "Sustainability", "Veblen Goods", "Etherealism"];
  }
}

export async function generatePostIdeas(platform: string, interests: string) {
  try {
    const ai = getAI();
    if (!ai) return [];

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 high-fidelity, viral social media post ideas for ${platform} based on these interests: ${interests}.
      
      TONE GUIDELINES:
      - Use an "Elite Analyst" voice: sophisticated, slightly cryptic, highly intellectual, and authoritative.
      - Incorporate concepts of "Resonance", "Entropy", "Architectural Integrity", or "Neural Depth".
      - Use italics for emphasis on philosophical weighted words.
      - The copy must be ready to publish.

      Respond ONLY with a JSON array of objects. 
      Each object must have these exact keys: "id", "topic", "copy", "visuals", "suggestedTime".
      The "visuals" should describe a high-concept aesthetic direction.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              topic: { type: Type.STRING },
              copy: { type: Type.STRING },
              visuals: { type: Type.STRING },
              suggestedTime: { type: Type.STRING },
            },
            required: ["id", "topic", "copy", "visuals", "suggestedTime"],
          },
        },
      },
    });
    
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("AI Post Generation Error:", error);
    return [];
  }
}
