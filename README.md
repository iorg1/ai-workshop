# ai-workshop-research

# ✈️ AI Travel Planner

A travel planning application built with [vinext](https://github.com/cloudflare/vinext) (the Next.js API surface reimplemented on Vite), deployed to Cloudflare Workers, and powered by Google Gemini AI.

Describe a trip and receive a structured day-by-day itinerary with activities, accommodation options, and transport details — all displayed as a clean JSON-backed UI.

![AI Travel Planner UI](https://github.com/user-attachments/assets/ce3bb577-7bcf-4d3f-a763-1e95a6b12e50)

---

## Project structure

```
├── pages/                      # vinext Pages Router
│   ├── _app.tsx                # Global app wrapper
│   ├── index.tsx               # Home page (form + structured results)
│   ├── index.module.css        # Scoped page styles
│   └── api/
│       └── plan.ts             # 👈 POST /api/plan — delegates to travelService
│
├── src/                        # Domain logic (framework-agnostic)
│   ├── types/
│   │   └── travel.ts           # TypeScript interfaces (DayPlan, Activity, …)
│   ├── ai/
│   │   ├── client.ts           # 👈Google AI client initialisation
│   │   ├── prompts/
│   │   │   └── travelPrompt.ts # 👈 Prompt template for the LLM
│   └── services/
│       └── travelService.ts    # 👈 Orchestrates prompt → AI call → parse
│
├── styles/
│   └── globals.css             # Global reset & base styles
│
├── worker/
│   └── index.ts                # Cloudflare Worker entry point
│
├── vite.config.ts              # vinext + conditional @cloudflare/vite-plugin
├── wrangler.toml               # Cloudflare Workers deployment config
└── next.config.js              # Next.js / vinext config
...
```

---

## Getting started

### Prerequisites

- Node.js
- A [Google AI Studio](https://aistudio.google.com/) API key

### Development

```bash
npm install

# Create a local env file with your Google AI API key
echo 'GOOGLE_AI_API_KEY=your_key_here' > .env.local

npm run dev        # starts vinext dev server on http://localhost:3001
```

## How it works

1. **User** fills in a free-text trip description (e.g. "5 days in Kyoto, focus on temples and food, mid-range budget").
2. **`/api/plan`** receives the POST request and calls `travelService.generateTravelPlan()`.
3. **`travelService`** builds a prompt via `travelPrompt.buildTravelPlanPrompt()`, calls Google Gemini through `createGoogleAIClient()`, then parses the response with `parseTravelPlan()`.
4. The parsed **JSON array** of `DayPlan` objects is returned to the browser and rendered day-by-day, showing activities, accommodation, and transport for each day.

## Example descriptions:

### Lake Garda, one week

I'm traveling to Lake Garda for one week, and we are staying at an AirBnB with a pool in Lazise. We are a family with four kids and the girlfriend of the oldest one:
Boy, 3 years
Girl, 10 years
Boy, 12 years.
Girlfriend, 16 years.
Boy, 17 years.

Father, 45
Mother, 41

During the week we want to cook three dinners at the house, and visit four restaurants.
We have a car there.
During the week we want to visit Verona and Venezia. Please give a recommendation for taking the car or use the train.
The rest of the time, we want to explore the various attractions around Lake Garda, preferably some hidden gems.
