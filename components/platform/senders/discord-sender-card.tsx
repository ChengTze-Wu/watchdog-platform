"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Spacer,
} from "@nextui-org/react";
import { FaPlus, FaDiscord } from "react-icons/fa6";

export default function DiscordSenderCard() {
  const handleSender = async () => {};

  return (
    <Card shadow="sm" isDisabled>
      <CardHeader>
        <FaDiscord className="w-10 h-10" color="#7289da" />
        <Spacer x={2} />
        <p className="text-sm text-default-500">Discord API</p>
        <Spacer />
      </CardHeader>
      <CardBody>
        <Button
          isDisabled
          isIconOnly
          variant="ghost"
          className="w-full h-40 border-dashed border-1"
          onPress={handleSender}
        >
          <FaPlus />
        </Button>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}
