"use client";

import { FormEvent, startTransition, useActionState, useEffect } from "react";

import { FaPlus, FaLine } from "react-icons/fa6";
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
} from "@nextui-org/react";

import { createSender } from "@/actions/senders";

export default function CreateSenderModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const initialState = { message: "" };
  const [state, formAction, pending] = useActionState(
    createSender,
    initialState
  );

  useEffect(() => {
    if (state.message === "success") {
      onClose();
    }
  }, [state, onClose]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        className="w-full h-40 border-dashed border-1"
        isIconOnly
        aria-label="edit"
        onPress={onOpen}
      >
        <FaPlus />
      </Button>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          <Form onSubmit={handleSubmit} validationErrors={state.errors}>
            <ModalHeader>
              <FaLine className="w-10 h-10" color="#00c300" />
            </ModalHeader>
            <ModalBody className="w-full">
              <Input isClearable isRequired name="name" label="識別名稱" />
              <Input
                isClearable
                isRequired
                name="accessToken"
                label="Channel Access Token"
              />
            </ModalBody>
            <ModalFooter className="w-full">
              <Button onPress={onClose} size="sm">
                關閉
              </Button>
              <Button
                color="primary"
                type="submit"
                size="sm"
                isLoading={pending}
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
