"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

import { ConnectedDevice } from "@/models/devices";

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

export default function OnlineTable({
  connectedDevice,
}: {
  connectedDevice: ConnectedDevice[];
}) {
  return (
    <Table aria-label="Table with dynamic connected devices">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={connectedDevice}>
        {(item) => (
          <TableRow key={item.device.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
