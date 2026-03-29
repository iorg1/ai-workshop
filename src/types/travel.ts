export interface Activity {
  name: string;
  description: string;
  duration: string;
  tips?: string;
}

export interface Accommodation {
  name: string;
  type: string;
  description: string;
  estimatedCostPerNight?: string;
}

export interface Transport {
  from: string;
  to: string;
  method: string;
  duration: string;
  estimatedCost?: string;
}

export interface DayPlan {
  day: number;
  date?: string;
  title: string;
  activities: Activity[];
  accommodation: Accommodation;
  transport: Transport[];
}

export type TravelPlan = DayPlan[];

export interface TravelPlanRequest {
  description: string;
}

export interface TravelPlanResponse {
  plan: TravelPlan;
}
