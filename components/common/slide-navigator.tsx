"use client";

import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { Button, Spacer } from "@heroui/react";

export default function SlideNavigator({
  title,
  setNext,
  setPrev,
  dissableNext,
  dissablePrev,
}: {
  title: string;
  setNext?: () => void;
  setPrev?: () => void;
  dissableNext?: boolean;
  dissablePrev?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <Button
        radius="full"
        variant="light"
        onPress={setPrev}
        isIconOnly
        isDisabled={dissablePrev}
      >
        <MdNavigateBefore />
      </Button>
      <Spacer />
      <h2 className="font-semibold text-sm">{title}</h2>
      <Spacer />
      <Button
        radius="full"
        variant="light"
        onPress={setNext}
        isIconOnly
        isDisabled={dissableNext}
      >
        <MdNavigateNext />
      </Button>
    </div>
  );
}
