"use server";

import { notFound } from "next/navigation";

const WatchDogApiHost =
  process.env.WATCHDOG_API_HOST || "http://localhost:8000";

export interface DailyConnected {
  hour: string;
  count: number;
}

export async function getDailyConnected(): Promise<DailyConnected[]> {
  const response = await fetch(`${WatchDogApiHost}/statistics/dailyConnected/`);
  const jsonResponse = await response.json();

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(jsonResponse.message);
  }

  return jsonResponse;
}
