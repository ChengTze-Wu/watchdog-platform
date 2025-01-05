"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spacer,
  Chip,
  Divider,
} from "@nextui-org/react";
import { FaLine } from "react-icons/fa6";

import { Sender } from "@/models/senders";
import CreateSenderModal from "@/components/platform/senders/create-sender-modal";

export default function LineSenderCard({ sender }: { sender?: Sender }) {
  return (
    <Card shadow="sm">
      <CardHeader>
        <FaLine className="w-10 h-10" color="#00c300" />
        <Spacer x={2} />
        <p className="text-sm text-default-500">Line Message API</p>
        <Spacer />
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">{sender?.name || "未設定"}</p>
          <Chip color={sender?.verified ? "success" : "default"}>
            {sender?.verified ? "已驗證" : "未驗證"}
          </Chip>
        </div>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}
