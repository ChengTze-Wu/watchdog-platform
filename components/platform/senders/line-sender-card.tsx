"use client";

import { useActionState, useEffect, startTransition, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spacer,
  Chip,
  Divider,
  Button,
  Input,
} from "@heroui/react";
import { FaLine, FaLock, FaLockOpen } from "react-icons/fa6";

import { Sender } from "@/models/senders";
import { verifySender, updateSender } from "@/actions/senders";
import CreateSenderModal from "@/components/platform/senders/create-sender-modal";
import { useAlert } from "@/components/common/flash-alert";

interface AlertConfig {
  title: string;
  description: string;
  color: "success" | "default" | "danger";
}

interface AlertConfigs {
  [key: string]: AlertConfig;
}

export default function LineSenderCard({ sender }: { sender?: Sender }) {
  const { showAlert } = useAlert();

  const [lockEdit, setLockEdit] = useState(true);
  const [onlineThreshold, setOnlineThreshold] = useState(
    sender?.online_threshold?.toString()
  );
  const [offlineThreshold, setOfflineThreshold] = useState(
    sender?.offline_threshold?.toString()
  );
  const [quota, setQuota] = useState(sender?.quota?.toString());

  const initialState = { message: "" };
  const [state, formAction, pending] = useActionState(
    verifySender,
    initialState
  );

  const updateInitialState = { message: "" };
  const [updateState, updateAction, updatePending] = useActionState(
    updateSender,
    updateInitialState
  );

  const handleVerify = (senderId: string) => {
    const formData = new FormData();
    formData.set("senderId", senderId);

    startTransition(() => {
      formAction(formData);
    });
  };

  const handleUpdate = () => {
    if (!sender?.id) return;

    const formData = new FormData();
    formData.set("senderId", sender.id);
    formData.set("onlineThreshold", onlineThreshold || "");
    formData.set("offlineThreshold", offlineThreshold || "");
    formData.set("quota", quota || "");

    startTransition(() => {
      updateAction(formData);
    });
  };

  useEffect(() => {
    if (pending || !state?.message) return;

    const alertConfig: AlertConfigs = {
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

  useEffect(() => {
    if (updatePending || !updateState?.message) return;

    const alertConfig: AlertConfigs = {
      success: {
        title: "更新",
        description: "更新成功",
        color: "success",
      },
      default: {
        title: "警告",
        description: updateState.message,
        color: "danger",
      },
    };

    const config = alertConfig[updateState.message] || alertConfig.default;
    showAlert(config);
    if (config.color === "success") {
      setLockEdit(true);
    }
  }, [updateState, updatePending, showAlert]);

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
          <Button
            size="sm"
            variant="light"
            onPress={() => setLockEdit(!lockEdit)}
            isIconOnly
          >
            {lockEdit ? <FaLock /> : <FaLockOpen />}
          </Button>
        </div>
        <Divider className="my-2" />
        <div className="flex flex-col gap-2">
          <Input
            label="上線認定時長（min）"
            type="text"
            size="sm"
            isDisabled={lockEdit}
            radius="md"
            value={onlineThreshold}
            onChange={(e) => setOnlineThreshold(e.target.value)}
          />
          <Input
            label="離線認定時長（min）"
            type="text"
            size="sm"
            isDisabled={lockEdit}
            radius="md"
            value={offlineThreshold}
            onChange={(e) => setOfflineThreshold(e.target.value)}
          />
          <Input
            label="發送配額上限（次/月）"
            type="text"
            size="sm"
            isDisabled={lockEdit}
            radius="md"
            value={quota}
            onChange={(e) => setQuota(e.target.value)}
          />
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
      <CardFooter className="flex justify-between">
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
        {!lockEdit && (
          <Button
            size="sm"
            variant="flat"
            isLoading={updatePending}
            onPress={handleUpdate}
          >
            儲存
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
