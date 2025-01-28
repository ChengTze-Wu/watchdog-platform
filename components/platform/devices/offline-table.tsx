"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

import { DisconnectedDevice } from "@/models/devices";
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
    key: "created_at",
    label: "離線時間",
  },
];

export default function OfflineTable({
  disconnectedDevice,
}: {
  disconnectedDevice: DisconnectedDevice[];
}) {
  return (
    <Table
      topContent={
        <span className="text-default-400 text-small mt-4">
          24小時內離線裝置
        </span>
      }
      topContentPlacement="outside"
      aria-label="Table with dynamic connected devices"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={disconnectedDevice}>
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
