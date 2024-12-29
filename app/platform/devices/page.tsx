import { getDevices } from "@/actions/devices";

import MainTable from "@/components/platform/devices/main-table";

export default async function Devices() {
  const devices = await getDevices();

  return <MainTable devices={devices.data} />;
}
