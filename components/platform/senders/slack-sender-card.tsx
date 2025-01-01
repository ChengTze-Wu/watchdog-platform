"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Spacer,
} from "@nextui-org/react";
import { FaPlus, FaSlack } from "react-icons/fa6";

import { useAlert } from "@/components/common/flash-alert";

export default function SlackSenderCard() {
  const { showAlert } = useAlert();

  const handleSender = async () => {};

  return (
    <Card shadow="sm">
      <CardHeader>
        <FaSlack className="w-10 h-10" />
        <Spacer x={2} />
        <p className="text-sm text-default-500">Slack API</p>
        <Spacer />
      </CardHeader>
      <CardBody>
        <Button
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
