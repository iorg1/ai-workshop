import type { TravelPlan } from "../types/travel";
import { buildTravelPlanPrompt } from "../ai/prompts/travelPrompt";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateTravelPlan(description: string): Promise<TravelPlan> {
  const client = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

  const model = client.getGenerativeModel({
    model: "gemini-3-flash-preview",
    generationConfig: { responseMimeType: "application/json" },
  });

  const prompt = buildTravelPlanPrompt(description.trim());

  const result = await model.generateContent(prompt);

  const rawText = result.response.text();

  return JSON.parse(rawText) as TravelPlan;
}
