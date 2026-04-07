import { GoogleGenerativeAI } from "@google/generative-ai";

function getApiKey(): string {
  const apiKey = process.env.GOOGLE_AI_API_KEY;

  if (!apiKey || typeof apiKey !== "string") {
    throw new Error("GOOGLE_AI_API_KEY environment variable is not set.");
  }

  return apiKey;
}

export function createGoogleAIClient(): GoogleGenerativeAI {
  return new GoogleGenerativeAI(getApiKey());
}
