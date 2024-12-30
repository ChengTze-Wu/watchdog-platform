"use server";

import { notFound } from "next/navigation";

import { ConnectedDevice } from "@/models/devices";

const WatchDogApiHost =
  process.env.WATCHDOG_API_HOST || "http://localhost:8000";

interface ConnectedDeviceResponse {
  data: ConnectedDevice[] | [];
  pagination: {
    totalItems: number | null;
    totalPages: number | null;
    nextPage: number | null;
  };
}

export async function getConnectedDevices(): Promise<ConnectedDeviceResponse> {
  const response = await fetch(`${WatchDogApiHost}/connectedDevices/`);
  const jsonResponse = await response.json();

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(jsonResponse.message);
  }

  return jsonResponse;
}
