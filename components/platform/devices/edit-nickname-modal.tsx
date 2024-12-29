"use client";

import { useActionState, useEffect } from "react";

import { HiMiniPencilSquare } from "react-icons/hi2";
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

  useEffect(() => {
    if (state.message === "success") {
      onClose();
    }
  }, [state, onClose]);

  return (
    <>
      <Button isIconOnly aria-label="edit" onPress={onOpen} size="sm">
        <HiMiniPencilSquare />
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          <Form action={formAction}>
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
                name="nickname"
                label="認列名稱"
                placeholder="請輸入認列名稱"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter className="w-full">
              <Button onPress={onClose} variant="flat" size="sm">
                關閉
              </Button>
              <Button
                isLoading={pending}
                disabled={pending}
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
