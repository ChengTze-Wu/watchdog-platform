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

const setAlertSchema = z.object({
  deviceId: z.string().min(1, {
    message: "裝置 ID 不得為空",
  }),
  senders: z.array(z.string()).optional(),
});

export async function setAlert(prevState: any, formData: FormData) {
  const validatedFields = setAlertSchema.safeParse({
    deviceId: formData.get("deviceId"),
    senders: JSON.parse(formData.get("senders") as string),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { deviceId, senders } = validatedFields.data;

  const response = await fetch(
    `${WatchDogApiHost}/devices/${deviceId}/senders/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senders,
      }),
    }
  );

  const jsonResponse = await response.json();

  if (!response.ok) {
    console.log(jsonResponse);

    return {
      message: jsonResponse.message,
    };
  }

  revalidatePath("/platform/devices");

  if (senders?.length === 0) {
    return {
      message: "dismiss",
    };
  }

  return {
    message: "success",
  };
}
