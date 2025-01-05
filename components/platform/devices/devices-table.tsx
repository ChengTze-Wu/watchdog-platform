"use client";

import { useCallback, Key } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";

import EditNicknameModal from "@/components/platform/devices/edit-nickname-modal";
import { Device, DeviceResponse } from "@/models/devices";

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

export default function DevicesTable({
  dataWithPagination,
}: {
  dataWithPagination: DeviceResponse;
}) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const devices = dataWithPagination.data;
  const totalItems = dataWithPagination.pagination.totalItems;
  const totalPages = dataWithPagination.pagination.totalPages;
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page) {
      const stringPage = page.toString();
      params.set("page", stringPage);
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const setLimit = (limit: string) => {
    const params = new URLSearchParams(searchParams);
    if (limit) {
      params.set("limit", limit);
      params.delete("page");
    } else {
      params.delete("limit");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const topContent = (
    <div className="flex justify-between items-center">
      <span className="text-default-400 text-small">
        共 {totalItems} 筆裝置
      </span>
      <label className="flex items-center text-default-400 text-small">
        每頁顯示
        <select
          className="bg-transparent outline-none text-default-400 text-small"
          onChange={(e) => setLimit(e.target.value)}
          value={searchParams.get("limit") || "10"}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        筆
      </label>
    </div>
  );

  const bottomContent = (
    <div className="flex justify-center">
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={currentPage}
        total={totalPages}
        onChange={setPage}
      />
    </div>
  );

  const renderCell = useCallback((device: Device, columnKey: Key) => {
    const cellValue = device[columnKey as keyof Device];

    switch (columnKey) {
      case "actions":
        return <EditNicknameModal device={device} />;
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="Table with dynamic devices"
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
    >
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
