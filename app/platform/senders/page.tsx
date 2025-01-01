import LineSenderCard from "@/components/platform/senders/line-sender-card";
import SlackSenderCard from "@/components/platform/senders/slack-sender-card";
import DiscordSenderCard from "@/components/platform/senders/discord-sender-card";
import FacebookSenderCard from "@/components/platform/senders/facebook-sender-card";

export default function Senders() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <LineSenderCard />
      <SlackSenderCard />
      <DiscordSenderCard />
      <FacebookSenderCard />
    </div>
  );
}
