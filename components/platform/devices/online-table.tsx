"use client";

import { useEffect, useState } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@heroui/react";

import { ConnectedDevice } from "@/models/devices";
import { getConnectedDevices } from "@/actions/connected-devices";
import { getNestedKeyValue } from "@/utils/objects";

const columns = [
  {
    key: "device.nickname",
    label: "認列名稱",
  },
  {
    key: "device.name",
    label: "裝置名稱",
  },
  {
    key: "connection_type",
    label: "連線類型",
  },
  {
    key: "ip_address",
    label: "IP 位址",
  },
  {
    key: "rssi",
    label: "訊號強度",
  },
  {
    key: "rx_speed",
    label: "接收速度",
  },
  {
    key: "tx_speed",
    label: "傳送速度",
  },
  {
    key: "last_connected_at",
    label: "最後連線時間",
  },
];

export default function OnlineTable() {
  const [connectedDevice, setConnectedDevice] = useState<ConnectedDevice[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getConnectedDevices().then((devices) => {
      setConnectedDevice(devices.data);
      setLoading(false);
    });
  }, []);

  return (
    <Table aria-label="Table with dynamic connected devices">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={connectedDevice}
        isLoading={loading}
        loadingContent={<Spinner color="default" />}
      >
        {(item) => (
          <TableRow key={item.device.id}>
            {(columnKey) => (
              <TableCell>{getNestedKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
