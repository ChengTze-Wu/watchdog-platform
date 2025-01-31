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

import { getDisconnectedDevices } from "@/actions/disconnected-devices";
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

export default function OfflineTable() {
  const [disconnectedDevice, setDisconnectedDevice] = useState<
    DisconnectedDevice[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDisconnectedDevices().then((response) => {
      setDisconnectedDevice(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <Table aria-label="Table with dynamic connected devices">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={disconnectedDevice}
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
