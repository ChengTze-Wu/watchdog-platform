"use client";

import { useEffect, useState, useActionState, startTransition } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Spacer,
} from "@nextui-org/react";
import { FaPlus, FaLine } from "react-icons/fa6";

import { broadcastLine } from "@/actions/senders";
import { useAlert } from "@/components/common/flash-alert";

const initialState = {
  message: "",
};

export default function LineSenderCard() {
  const { showAlert } = useAlert();

  const [state, broadcasAction, pending] = useActionState(
    broadcastLine,
    initialState
  );

  const handleLineSender = () => {
    startTransition(() => {
      broadcasAction("Hello");
    });
  };

  useEffect(() => {
    // 如何處裡 toast with useActionState
    // cf. https://github.com/shadcn-ui/ui/discussions/5332#discussioncomment-11113046
    if (pending || !state) {
      return;
    }
    if (state?.message) {
      showAlert({
        title: "警告",
        description: state.message,
        color: "danger",
      });
    }
  }, [state, pending]);

  return (
    <Card shadow="sm">
      <CardHeader>
        <FaLine className="w-10 h-10" color="#00c300" />
        <Spacer x={2} />
        <p className="text-sm text-default-500">Line Message API</p>
        <Spacer />
      </CardHeader>
      <CardBody>
        <Button
          isIconOnly
          variant="ghost"
          className="w-full h-40 border-dashed border-1"
          onPress={handleLineSender}
        >
          <FaPlus />
        </Button>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}
