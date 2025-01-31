"use client";

import { Tabs, Tab } from "@heroui/react";

import OnlineTable from "@/components/platform/devices/online-table";
import OfflineTable from "@/components/platform/devices/offline-table";

export default function PlatformTables({ className }: { className?: string }) {
  return (
    <Tabs size="sm" className={className}>
      <Tab title="線上裝置" key={0}>
        <OnlineTable />
      </Tab>
      <Tab title="24小時內離線裝置" key={1}>
        <OfflineTable />
      </Tab>
    </Tabs>
  );
}
