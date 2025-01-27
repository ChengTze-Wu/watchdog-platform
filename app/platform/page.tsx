import { getConnectedDevices } from "@/actions/connected-devices";
import { getDisconnectedDevices } from "@/actions/disconnected-devices";

import OnlineTable from "@/components/platform/devices/online-table";
import OfflineTable from "@/components/platform/devices/offline-table";

export default async function Platform() {
  const [connectedDevice, disconnectedDevice] = await Promise.all([
    getConnectedDevices(),
    getDisconnectedDevices(),
  ]);

  return (
    <>
      <OnlineTable connectedDevice={connectedDevice.data} />
      <OfflineTable disconnectedDevice={disconnectedDevice.data} />
    </>
  );
}
