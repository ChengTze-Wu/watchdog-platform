"use client";

import { useActionState, useEffect, useTransition, FormEvent } from "react";

import { FaIdCard } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Form,
  Chip,
  Tooltip,
} from "@nextui-org/react";

import { Device } from "@/models/devices";
import { updateNickname } from "@/actions/devices";

export default function EditNicknameModal({ device }: { device: Device }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const initialState = { message: "" };
  const [state, formAction, pending] = useActionState(
    updateNickname,
    initialState
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (state.message === "success") {
      onClose();
    }
  }, [state, onClose]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    startTransition(() => {
      // NextUI 的 Form 使用 Native form, 因此 action 後會 reset.
      // cf. https://github.com/nextui-org/nextui/issues/4300#issuecomment-2537018475
      formAction(formData);
    });
  };

  return (
    <>
      <Tooltip
        color="foreground"
        content="認列"
        placement="right"
        delay={300}
        closeDelay={0}
      >
        <Button isIconOnly aria-label="edit" onPress={onOpen} size="sm">
          <FaIdCard />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          <Form onSubmit={handleSubmit} validationErrors={state.errors}>
            <ModalHeader>
              <h4 className="text-lg font-semibold flex items-center gap-2">
                認列{" "}
                <Chip color="default" size="sm">
                  {device.mac_address}
                </Chip>
              </h4>
            </ModalHeader>
            <ModalBody className="w-full">
              <Input name="deviceId" type="hidden" value={device.id} />
              <Input
                isClearable
                isRequired
                name="nickname"
                label="認列名稱"
                defaultValue={device.nickname}
              />
            </ModalBody>
            <ModalFooter className="w-full">
              <Button onPress={onClose} size="sm">
                關閉
              </Button>
              <Button
                color="primary"
                isLoading={pending || isPending}
                disabled={pending || isPending}
                type="submit"
                size="sm"
              >
                儲存
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}
