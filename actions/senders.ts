"use server";

export async function broadcastLine(accessToken: string, message: string) {
  const res = await fetch("https://api.line.me/v2/bot/message/broadcast", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      messages: [{ type: "text", text: message }],
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to broadcast message");
  }
}

export async function getLineQuota(accessToken: string) {
  const res = await fetch(
    "https://api.line.me/v2/bot/message/quota/consumption",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to get line quota");
  }

  const data = await res.json();
  const quota = data.totalUsage as number;
  return quota;
}
