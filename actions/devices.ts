"use server";

import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

import { Device } from "@/models/devices";

const WatchDogApiHost =
  process.env.WATCHDOG_API_HOST || "http://localhost:8000";

interface DeviceResponse {
  data: Device[] | [];
  pagination: {
    totalItems: number | null;
    totalPages: number | null;
    nextPage: number | null;
  };
}

export async function getDevices(): Promise<DeviceResponse> {
  const response = await fetch(`${WatchDogApiHost}/devices`);
  const jsonResponse = await response.json();

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(jsonResponse.message);
  }

  return jsonResponse;
}
