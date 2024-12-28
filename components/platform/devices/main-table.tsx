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

import { Device } from "@/models/devices";

export default function MainTable({ devices }: { devices: Device[] }) {
  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "nickname",
      label: "NICKNAME",
    },
    {
      key: "mac_address",
      label: "MAC ADDRESS",
    },
    {
      key: "vendor",
      label: "VENDOR",
    },
  ];

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={devices}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
