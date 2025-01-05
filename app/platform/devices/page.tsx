import { getDevices } from "@/actions/devices";
import { getSenders } from "@/actions/senders";

import DevicesTable from "@/components/platform/devices/devices-table";

export default async function Devices(props: {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
  }>;
}) {
  const { page, limit } = (await props.searchParams) || {};

  const devicesData = getDevices({ page, limit });

  const [devicesWithPagination, senders] = await Promise.all([
    devicesData,
    getSenders(),
  ]);

  return (
    <DevicesTable
      devicesWithPagination={devicesWithPagination}
      senders={senders.data}
    />
  );
}
