"use client";

import { HiOutlineMenu } from "react-icons/hi";
import { Drawer, DrawerContent, Button, useDisclosure } from "@heroui/react";

import Sidebar from "@/components/platform/sidebar";

export default function Menu({ className }: { className?: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className={className}>
      <Button onPress={onOpen} isIconOnly size="sm" variant="light">
        <HiOutlineMenu className="w-5 h-5" />
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="left"
        className="w-64"
      >
        <DrawerContent>
          <Sidebar className="h-screen border-none" />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
