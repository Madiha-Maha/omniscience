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
  const defaultIdeas = [
    {
      id: `idea-1-${Date.now()}`,
      topic: `${interests} & Architectural Resonance`,
      copy: `The future of ${interests} belongs to those who prioritize *substance over noise*. When you strip away the ephemeral hype, only structural clarity remains. Here is how leading teams execute with precision.`,
      visuals: `Monochrome architectural render with high-contrast geometric shadows. Minimalist typographic overlay.`,
      suggestedTime: `09:30 AM EST (Peak Engagement Window)`
    },
    {
      id: `idea-2-${Date.now()}`,
      topic: `Algorithmic Velocity in ${interests}`,
      copy: `Most creators chase reach; *architects engineer depth*. In an era of infinite content, retention is the ultimate moat. Three principles to elevate your ${platform} narrative strategy today.`,
      visuals: `Cinematic macro lens focus on brutalist stone texture. Deep obsidian tones.`,
      suggestedTime: `02:15 PM EST (High Viral Distribution)`
    },
    {
      id: `idea-3-${Date.now()}`,
      topic: `The Entropy of ${interests}`,
      copy: `Simplicity is not the absence of complexity—it is *complexity synthesized*. As ${interests} evolves, the brands that win will be those that master high-fidelity storytelling.`,
      visuals: `Abstract 3D fluid glass dispersion graphic reflecting ambient warm luxury lighting.`,
      suggestedTime: `06:45 PM EST (Evening Retargeting Window)`
    }
  ];

  try {
    const ai = getAI();
    if (!ai) return defaultIdeas;

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
    
    const parsed = JSON.parse(response.text || '[]');
    return parsed.length > 0 ? parsed : defaultIdeas;
  } catch (error) {
    console.error("AI Post Generation Error:", error);
    return defaultIdeas;
  }
}
