import type { TravelPlan, DayPlan, Activity, Accommodation, Transport } from "../../types/travel.js";

export class TravelPlanParseError extends Error {
  constructor(
    message: string,
    public readonly raw: string
  ) {
    super(message);
    this.name = "TravelPlanParseError";
  }
}

function extractJsonFromText(text: string): string {
  const trimmed = text.trim();

  // Strip markdown code fences if present
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    return fenceMatch[1].trim();
  }

  // Find the outermost JSON array
  const arrayStart = trimmed.indexOf("[");
  const arrayEnd = trimmed.lastIndexOf("]");
  if (arrayStart !== -1 && arrayEnd !== -1 && arrayEnd > arrayStart) {
    return trimmed.slice(arrayStart, arrayEnd + 1);
  }

  return trimmed;
}

function parseActivity(raw: unknown): Activity {
  if (!raw || typeof raw !== "object") {
    throw new Error("Activity must be an object");
  }
  const obj = raw as Record<string, unknown>;
  return {
    name: String(obj.name ?? ""),
    description: String(obj.description ?? ""),
    duration: String(obj.duration ?? ""),
    tips: obj.tips ? String(obj.tips) : undefined,
  };
}

function parseAccommodation(raw: unknown): Accommodation {
  if (!raw || typeof raw !== "object") {
    throw new Error("Accommodation must be an object");
  }
  const obj = raw as Record<string, unknown>;
  return {
    name: String(obj.name ?? ""),
    type: String(obj.type ?? "Other"),
    description: String(obj.description ?? ""),
    estimatedCostPerNight: obj.estimatedCostPerNight
      ? String(obj.estimatedCostPerNight)
      : undefined,
  };
}

function parseTransport(raw: unknown): Transport {
  if (!raw || typeof raw !== "object") {
    throw new Error("Transport must be an object");
  }
  const obj = raw as Record<string, unknown>;
  return {
    from: String(obj.from ?? ""),
    to: String(obj.to ?? ""),
    method: String(obj.method ?? "Other"),
    duration: String(obj.duration ?? ""),
    estimatedCost: obj.estimatedCost ? String(obj.estimatedCost) : undefined,
  };
}

function parseDayPlan(raw: unknown, index: number): DayPlan {
  if (!raw || typeof raw !== "object") {
    throw new Error(`Day ${index + 1} must be an object`);
  }
  const obj = raw as Record<string, unknown>;

  const activities = Array.isArray(obj.activities)
    ? obj.activities.map(parseActivity)
    : [];

  const accommodation = parseAccommodation(
    obj.accommodation ?? { name: "TBD", type: "Other", description: "" }
  );

  const transport = Array.isArray(obj.transport)
    ? obj.transport.map(parseTransport)
    : [];

  return {
    day: typeof obj.day === "number" ? obj.day : index + 1,
    date: obj.date ? String(obj.date) : undefined,
    title: String(obj.title ?? `Day ${index + 1}`),
    activities,
    accommodation,
    transport,
  };
}

export function parseTravelPlan(rawText: string): TravelPlan {
  const jsonString = extractJsonFromText(rawText);

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err) {
    throw new TravelPlanParseError(
      `Failed to parse AI response as JSON: ${(err as Error).message}`,
      rawText
    );
  }

  if (!Array.isArray(parsed)) {
    throw new TravelPlanParseError(
      "AI response must be a JSON array of day plans",
      rawText
    );
  }

  return parsed.map((item, index) => parseDayPlan(item, index));
}
