"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { IoIosSettings } from "react-icons/io";
import ThemeSwitcher from "@/components/common/theme-switcher";

export default function SettingModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        variant="light"
        onPress={onOpen}
        className="flex items-center justify-start pl-2"
      >
        <IoIosSettings className="w-5 h-5" />
        系統設定
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>設定</ModalHeader>
          <ModalBody>
            <ThemeSwitcher />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
