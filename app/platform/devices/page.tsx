import { getDevices } from "@/actions/devices";

import DevicesTable from "@/components/platform/devices/devices-table";

export default async function Devices() {
  const devices = await getDevices();

  return <DevicesTable devices={devices.data} />;
}
