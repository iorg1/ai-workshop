export function buildTravelPlanPrompt(description: string): string {
  return `You are an expert travel planner. Based on the following travel description, create a detailed day-by-day travel plan.

Travel description: "${description}"

Return ONLY a valid JSON array (no markdown, no code blocks, no extra text) where each element represents one day with this exact structure:
[
  {
    "day": 1,
    "date": "optional date string if inferrable",
    "title": "Brief day title",
    "activities": [
      {
        "name": "Activity name",
        "description": "What to do and see",
        "duration": "Estimated duration",
        "tips": "Optional practical tips"
      }
    ],
    "accommodation": {
      "name": "Hotel/hostel/accommodation name or type",
      "type": "Hotel | Hostel | Airbnb | Resort | Camping | Other",
      "description": "Brief description",
      "estimatedCostPerNight": "Approximate cost range"
    },
    "transport": [
      {
        "from": "Origin",
        "to": "Destination",
        "method": "Flight | Train | Bus | Car | Walk | Metro | Ferry | Other",
        "duration": "Estimated travel time",
        "estimatedCost": "Approximate cost"
      }
    ]
  }
]

Make the plan practical, realistic and detailed. Include local tips, must-see sights, and authentic experiences. Provide 2-4 activities per day and 1-3 transport entries per day where relevant.`;
}
