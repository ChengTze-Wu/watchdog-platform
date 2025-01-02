"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Spacer,
} from "@nextui-org/react";
import { FaLine } from "react-icons/fa6";

import CreateSenderModal from "@/components/platform/senders/create-sender-modal";

export default function LineSenderCard() {
  return (
    <Card shadow="sm">
      <CardHeader>
        <FaLine className="w-10 h-10" color="#00c300" />
        <Spacer x={2} />
        <p className="text-sm text-default-500">Line Message API</p>
        <Spacer />
      </CardHeader>
      <CardBody>
        <CreateSenderModal />
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}
