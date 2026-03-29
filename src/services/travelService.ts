import type { TravelPlan } from "../types/travel.js";
import { createGoogleAIClient, MODEL_NAME } from "../ai/client.js";
import { buildTravelPlanPrompt } from "../ai/prompts/travelPrompt.js";
import { parseTravelPlan } from "../ai/parsers/planParser.js";

export async function generateTravelPlan(description: string): Promise<TravelPlan> {
  if (!description || description.trim().length === 0) {
    throw new Error("Travel description cannot be empty");
  }

  const client = createGoogleAIClient();
  const model = client.getGenerativeModel({ model: MODEL_NAME });

  const prompt = buildTravelPlanPrompt(description.trim());

  const result = await model.generateContent(prompt);
  const response = result.response;
  const rawText = response.text();

  return parseTravelPlan(rawText);
}
