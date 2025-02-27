"use server";

import { notFound } from "next/navigation";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale/zh-TW";

const WatchDogApiHost =
  process.env.WATCHDOG_API_HOST || "http://localhost:8000";

export interface DailyConnected {
  hour: string;
  count: number;
}

export async function getDailyConnected({
  date,
}: {
  date?: Date;
} = {}): Promise<DailyConnected[]> {
  if (!date) {
    date = new Date();
  }

  const formateDate = format(date, "yyyy-MM-dd", { locale: zhTW });

  const response = await fetch(
    `${WatchDogApiHost}/statistics/dailyConnected/?date=${formateDate}`
  );
  const jsonResponse = await response.json();

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(jsonResponse.message);
  }

  return jsonResponse;
}
