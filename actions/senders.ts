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
