"use server";

import { notFound } from "next/navigation";

import { DisconnectedDevice } from "@/models/devices";

const WatchDogApiHost =
  process.env.WATCHDOG_API_HOST || "http://localhost:8000";

interface DisconnectedDeviceResponse {
  data: DisconnectedDevice[] | [];
  pagination: {
    totalItems: number | null;
    totalPages: number | null;
    nextPage: number | null;
  };
}

export async function getDisconnectedDevices(): Promise<DisconnectedDeviceResponse> {
  const response = await fetch(`${WatchDogApiHost}/disconnectedDevices/`);
  const jsonResponse = await response.json();

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(jsonResponse.message);
  }

  return jsonResponse;
}
