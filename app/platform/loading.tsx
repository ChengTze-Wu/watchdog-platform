"use client";

import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <Spinner color="default" size="lg" />
    </div>
  );
}
