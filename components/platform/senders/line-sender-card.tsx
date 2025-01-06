"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spacer,
  Chip,
  Divider,
  Switch,
  Button,
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
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold">{sender?.name || "未設定"}</p>
            <Chip
              color={sender?.verified ? "success" : "default"}
              size="sm"
              variant="faded"
            >
              {sender?.verified ? "已驗證" : "未驗證"}
            </Chip>
          </div>
          <Switch
            color="success"
            defaultSelected
            isDisabled
            startContent={<span>開</span>}
            endContent={<span>關</span>}
          />
        </div>
        <Divider className="my-2" />
        <div className="flex flex-col gap-2">
          <p className="text-sm text-default-500">
            上線認定時長<span className="text-default-900">: 5 分鐘</span>
          </p>
          <p className="text-sm text-default-500">
            離線認定時長<span className="text-default-900">: 5 分鐘</span>
          </p>
          <p className="text-sm text-default-500">每月發送上限: 200 次</p>
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex justify-between items-center">
          <Button size="sm" color="success" variant="flat" isDisabled>
            驗證
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
