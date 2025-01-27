"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

const WatchDogApiHost =
  process.env.WATCHDOG_API_HOST || "http://localhost:8000";

const createSenderSchema = z.object({
  name: z.string().min(1, {
    message: "識別名稱不得為空",
  }),
  accessToken: z.string().min(1, {
    message: "Access Token 不得為空",
  }),
});

export async function createSender(prevState: any, formData: FormData) {
  const validatedFields = createSenderSchema.safeParse({
    name: formData.get("name"),
    accessToken: formData.get("accessToken"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, accessToken } = validatedFields.data;

  const response = await fetch(`${WatchDogApiHost}/senders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      access_token: accessToken,
    }),
  });

  const jsonResponse = await response.json();

  if (!response.ok) {
    return {
      message: jsonResponse.message,
    };
  }

  revalidatePath("/platform/senders");

  return {
    message: "success",
  };
}

const updateSenderSchema = z.object({
  senderId: z.string().min(1, {
    message: "Sender ID 不得為空",
  }),
  onlineThreshold: z.number().int().min(1, {
    message: "上線閥值不得小於 1",
  }),
  offlineThreshold: z.number().int().min(1, {
    message: "離線閥值不得小於 1",
  }),
  quota: z.number().int().min(1, {
    message: "可用配額不得小於 1",
  }),
});

export async function updateSender(prevState: any, formData: FormData) {
  const validatedFields = updateSenderSchema.safeParse({
    senderId: formData.get("senderId"),
    onlineThreshold: Number(formData.get("onlineThreshold")),
    offlineThreshold: Number(formData.get("offlineThreshold")),
    quota: Number(formData.get("quota")),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { senderId, onlineThreshold, offlineThreshold, quota } =
    validatedFields.data;

  const response = await fetch(`${WatchDogApiHost}/senders/${senderId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      online_threshold: onlineThreshold,
      offline_threshold: offlineThreshold,
      quota,
    }),
  });

  const jsonResponse = await response.json();

  if (!response.ok) {
    return {
      message: jsonResponse.message,
    };
  }

  revalidatePath("/platform/senders");

  return {
    message: "success",
  };
}

export async function getSenders() {
  const response = await fetch(`${WatchDogApiHost}/senders/`);
  const jsonResponse = await response.json();

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(jsonResponse.message);
  }

  return jsonResponse;
}

const verifySenderSchema = z.object({
  senderId: z.string().min(1, {
    message: "Sender ID 不得為空",
  }),
});

export async function verifySender(prevState: any, formData: FormData) {
  const validatedFields = verifySenderSchema.safeParse({
    senderId: formData.get("senderId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { senderId } = validatedFields.data;

  const response = await fetch(
    `${WatchDogApiHost}/senders/${senderId}/verify/`,
    {
      method: "POST",
    }
  );

  const jsonResponse = await response.json();

  if (!response.ok) {
    return {
      message: jsonResponse.message,
    };
  }

  revalidatePath("/platform/senders");

  return {
    message: "success",
  };
}
