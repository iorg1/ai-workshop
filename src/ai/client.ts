import { GoogleGenerativeAI } from "@google/generative-ai";

function getApiKey(): string {
  const apiKey =
    process.env.GOOGLE_AI_API_KEY ||
    (typeof globalThis !== "undefined" &&
      (globalThis as Record<string, unknown>).GOOGLE_AI_API_KEY);

  if (!apiKey || typeof apiKey !== "string") {
    throw new Error(
      "GOOGLE_AI_API_KEY environment variable is not set. " +
        "Set it in your .env.local file for development or as a Wrangler secret for production."
    );
  }

  return apiKey;
}

export function createGoogleAIClient(): GoogleGenerativeAI {
  return new GoogleGenerativeAI(getApiKey());
}

export const MODEL_NAME = "gemini-1.5-flash";
