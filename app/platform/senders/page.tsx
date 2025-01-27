import LineSenderCard from "@/components/platform/senders/line-sender-card";
import SlackSenderCard from "@/components/platform/senders/slack-sender-card";
import DiscordSenderCard from "@/components/platform/senders/discord-sender-card";
import FacebookSenderCard from "@/components/platform/senders/facebook-sender-card";

import { getSenders } from "@/actions/senders";

export default async function Senders() {
  const senders = await getSenders();

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <LineSenderCard senders={senders.data} />
      <SlackSenderCard />
      <DiscordSenderCard />
      <FacebookSenderCard />
    </div>
  );
}
