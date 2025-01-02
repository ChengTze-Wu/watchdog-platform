"use server";

const ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN as string;

if (!ACCESS_TOKEN) {
  throw new Error("Missing LINE_ACCESS TOKEN");
}

export async function broadcastLine(prevState: any, message: string) {
  const quota = await getLineQuota(ACCESS_TOKEN);
  if (quota >= 5) {
    return {
      message: "本月配額已使用完畢，請聯絡系統管理員",
    };
  }

  const res = await fetch("https://api.line.me/v2/bot/message/broadcast", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      messages: [{ type: "text", text: message }],
    }),
  });

  if (!res.ok) {
    return { message: "Failed to broadcast message" };
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
