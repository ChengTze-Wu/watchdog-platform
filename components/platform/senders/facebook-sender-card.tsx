"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Spacer,
} from "@heroui/react";
import { FaPlus, FaFacebookMessenger } from "react-icons/fa6";

export default function FacebookSenderCard() {
  const handleSender = async () => {};

  return (
    <Card shadow="sm" isDisabled>
      <CardHeader>
        <FaFacebookMessenger className="w-10 h-10" color="#0084ff" />
        <Spacer x={2} />
        <p className="text-sm text-default-500">Facebook Messenger API</p>
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
