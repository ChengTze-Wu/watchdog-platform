import { Spacer } from "@heroui/react";

import PlatformTables from "@/components/platform/platform-tables";
import Dashboard from "@/components/platform/dashboard";

export default async function Platform() {
  return (
    <div>
      <Dashboard />
      <Spacer y={4} />
      <PlatformTables />
    </div>
  );
}
