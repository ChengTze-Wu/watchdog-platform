import { getConnectedDevices } from "@/actions/connected-devices";

import OnlineTable from "@/components/platform/online/online-table";

export default async function Platform() {
  const connectedDevice = await getConnectedDevices();

  return <OnlineTable connectedDevice={connectedDevice.data} />;
}
