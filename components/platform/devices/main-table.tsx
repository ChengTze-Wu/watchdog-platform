"use client";

import { useCallback, useState, Key } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

import EditNicknameModal from "@/components/platform/devices/edit-nickname-modal";
import { Device } from "@/models/devices";

const columns = [
  {
    key: "nickname",
    label: "認列名稱",
  },
  {
    key: "name",
    label: "裝置名稱",
  },
  {
    key: "mac_address",
    label: "MAC 位址",
  },
  {
    key: "vendor",
    label: "製造商",
  },
  {
    key: "actions",
    label: "操作",
  },
];

export default function MainTable({ devices }: { devices: Device[] }) {
  const renderCell = useCallback((device: Device, columnKey: Key) => {
    const cellValue = device[columnKey as keyof Device];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-4">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditNicknameModal device={device} />
            </span>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Table with dynamic devices">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={devices}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
