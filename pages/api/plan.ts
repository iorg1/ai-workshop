import type { NextApiRequest, NextApiResponse } from "next";
import { generateTravelPlan } from "../../src/services/travelService.js";
import type { TravelPlanRequest, TravelPlanResponse } from "../../src/types/travel.js";

type ErrorResponse = { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TravelPlanResponse | ErrorResponse>
): Promise<void> {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body as Partial<TravelPlanRequest>;

  if (!body.description || typeof body.description !== "string") {
    res.status(400).json({ error: "A travel description is required" });
    return;
  }

  try {
    const plan = await generateTravelPlan(body.description);
    res.status(200).json({ plan });
  } catch (err) {
    const message = err instanceof Error ? err.message : "An unexpected error occurred";
    const isClientError = message.includes("cannot be empty") || message.includes("API key");
    res.status(isClientError ? 400 : 500).json({ error: message });
  }
}
