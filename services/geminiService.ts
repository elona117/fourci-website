import { GoogleGenAI } from "@google/genai";

export const generateClimateAdvice = async (userPrompt: string, history: { role: 'user' | 'model', text: string }[] = []) => {
  try {
    // Fix: Correct initialization using the provided @google/genai SDK guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Fix: Prepare contents array for multi-turn history including roles and parts
    const contents = [
      ...history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      })),
      { role: 'user', parts: [{ text: userPrompt }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: `You are the FOURCi AI Assistant. 
        FOURCi (Concern on Climate Change for the Community Initiative) is a Nigerian NGO.
        Role: Expert in Sahelian ecology, climate resilience, and sustainable development.
        Tone: Professional, empathetic, and community-focused.
        Key Info: Headquartered in Maiduguri, Borno State. 
        Contact: If users want to reach out directly, the primary contact email is davidbulus117@gmail.com.
        Focus: Reforestation (Great Green Wall), Eco-Clubs, and Community Adaptation.
        Call to Action: Direct users to "Get Involved" page for donations or volunteering.
        Constraint: Max 150 words per response. Avoid generic AI fluff.`,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    // Fix: The response.text property is the correct way to extract the generated text
    if (!response.text) {
      throw new Error("Empty response from AI");
    }

    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error?.message?.includes("API_KEY_INVALID")) {
      return "Assistant configuration error: Invalid API Key. Please check your environment variables.";
    }
    return "I'm having trouble connecting to my climate database right now. Please try again in a few moments.";
  }
};