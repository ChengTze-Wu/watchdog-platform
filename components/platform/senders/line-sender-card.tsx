"use client";

import { useActionState, useEffect, startTransition } from "react";

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
} from "@heroui/react";
import { FaLine } from "react-icons/fa6";

import { Sender } from "@/models/senders";
import { verifySender } from "@/actions/senders";
import CreateSenderModal from "@/components/platform/senders/create-sender-modal";
import { useAlert } from "@/components/common/flash-alert";

export default function LineSenderCard({ sender }: { sender?: Sender }) {
  const { showAlert } = useAlert();

  const initialState = { message: "" };
  const [state, formAction, pending] = useActionState(
    verifySender,
    initialState
  );

  const handleVerify = (senderId: string) => {
    const formData = new FormData();
    formData.set("senderId", senderId);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (pending || !state?.message) return;

    const alertConfig: any = {
      success: {
        title: "驗證",
        description: "驗證成功",
        color: "success",
      },
      default: {
        title: "警告",
        description: state.message,
        color: "danger",
      },
    };

    const config = alertConfig[state.message] || alertConfig.default;
    showAlert(config);
  }, [state, pending, showAlert]);

  const SenderContent = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <Card shadow="sm">
      <CardHeader>
        <FaLine className="w-10 h-10" color="#00c300" />
        <Spacer x={2} />
        <p className="text-sm text-default-500">Line Message API</p>
        <Spacer />
      </CardHeader>
      <CardBody>{sender ? <SenderContent /> : <CreateSenderModal />}</CardBody>
      <CardFooter>
        <Button
          size="sm"
          color="success"
          variant="flat"
          onPress={() => handleVerify(sender?.id || "")}
          isDisabled={sender?.verified}
          isLoading={pending}
        >
          驗證
        </Button>
      </CardFooter>
    </Card>
  );
}
