import { getDevices } from "@/actions/devices";

import DevicesTable from "@/components/platform/devices/devices-table";

export default async function Devices(props: {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
  }>;
}) {
  const { page, limit } = (await props.searchParams) || {};

  const dataWithPagination = await getDevices({
    page,
    limit,
  });

  return <DevicesTable dataWithPagination={dataWithPagination} />;
}
