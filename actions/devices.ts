"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

import { DeviceResponse } from "@/models/devices";

const WatchDogApiHost =
  process.env.WATCHDOG_API_HOST || "http://localhost:8000";

export async function getDevices({
  page = "1",
  limit = "10",
}: {
  page?: string;
  limit?: string;
}): Promise<DeviceResponse> {
  const response = await fetch(
    `${WatchDogApiHost}/devices/?page=${page}&limit=${limit}`
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

const updateNicknameSchema = z.object({
  deviceId: z.string().min(1, {
    message: "裝置 ID 不得為空",
  }),
  nickname: z.string().min(1, {
    message: "認列名稱不得為空",
  }),
});

export async function updateNickname(prevState: any, formData: FormData) {
  const validatedFields = updateNicknameSchema.safeParse({
    deviceId: formData.get("deviceId"),
    nickname: formData.get("nickname"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { deviceId, nickname } = validatedFields.data;

  const response = await fetch(`${WatchDogApiHost}/devices/${deviceId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nickname,
    }),
  });

  const jsonResponse = await response.json();

  if (!response.ok) {
    return {
      message: jsonResponse.message,
    };
  }

  revalidatePath("/platform/devices");

  return {
    message: "success",
  };
}
