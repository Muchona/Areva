
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, MessageRole } from "../types.ts";

export const SYSTEM_INSTRUCTION = `You are the Areva Automation Senior AI Consultant. 
Areva Automation is a world leader in 4-Way Pallet Shuttle (Taxi™) technology.

Technical Specs:
- Areva Taxi™: Autonomous 4-way navigation.
- VTU: High-speed Z-axis lifts.
- Reach: Ambient to -30°C.
- Benefit: Up to 80% more density.

Role: Provide technical, professional advice. Use Google Search to find recent news about Areva industry trends if asked. 
Always cite sources if Google Search grounding is used.`;

export const getWarehouseAdvice = async (history: ChatMessage[], message: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Upgraded to Pro for Search tools
      contents: [
        { role: 'user', parts: [{ text: `System Instruction: ${SYSTEM_INSTRUCTION}` }] },
        ...history.map(msg => ({
          role: msg.role === MessageRole.MODEL ? 'model' as const : 'user' as const,
          parts: [{ text: msg.text }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        tools: [{ googleSearch: {} }] // Added Search Grounding
      }
    });

    let output = response.text || "Analyzing technical data...";
    
    // Extract grounding URLs if present
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && chunks.length > 0) {
      const urls = chunks
        .map((c: any) => c.web?.uri)
        .filter((u: any) => u);
      if (urls.length > 0) {
        output += "\n\nSources:\n" + Array.from(new Set(urls)).map(u => `- ${u}`).join('\n');
      }
    }

    return output;
  } catch (error) {
    console.error("Gemini Consulting Fault:", error);
    return "The Areva AI Core is currently undergoing maintenance. Please reach out to our team directly.";
  }
};
