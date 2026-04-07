import type { TravelPlan } from "../types/travel.js";
import { createGoogleAIClient, MODEL_NAME } from "../ai/client.js";
import { buildTravelPlanPrompt } from "../ai/prompts/travelPrompt.js";

export async function generateTravelPlan(description: string): Promise<TravelPlan> {
  if (!description || description.trim().length === 0) {
    throw new Error("Travel description cannot be empty");
  }

  const client = createGoogleAIClient();
  const model = client.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: { responseMimeType: "application/json" },
  });

  const prompt = buildTravelPlanPrompt(description.trim());

  const result = await model.generateContent(prompt);
  const rawText = result.response.text();

  return JSON.parse(rawText) as TravelPlan;
}
