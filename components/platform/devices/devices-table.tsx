"use client";

import {
  useCallback,
  Key,
  useActionState,
  startTransition,
  useEffect,
} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Select,
  SelectItem,
  Chip,
} from "@heroui/react";
import type { SelectedItems } from "@heroui/react";

import { setAlert } from "@/actions/devices";
import EditNicknameModal from "@/components/platform/devices/edit-nickname-modal";
import { Device, DeviceResponse } from "@/models/devices";
import { Sender } from "@/models/senders";
import { useAlert } from "@/components/common/flash-alert";

interface AlertConfig {
  title: string;
  description: string;
  color: "success" | "default" | "danger";
}

interface AlertConfigs {
  [key: string]: AlertConfig;
}

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
    key: "alert",
    label: "警戒",
  },
  {
    key: "actions",
    label: "操作",
  },
];

export default function DevicesTable({
  devicesWithPagination,
  senders,
}: {
  devicesWithPagination: DeviceResponse;
  senders?: Sender[];
}) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { showAlert } = useAlert();

  const initialState = { message: "" };
  const [state, formAction, pending] = useActionState(setAlert, initialState);

  const devices = devicesWithPagination.data;
  const totalItems = devicesWithPagination.pagination.totalItems;
  const totalPages = devicesWithPagination.pagination.totalPages;
  const currentPage = Number(searchParams.get("page")) || 1;

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

  const setAlertHandler = (
    deviceId: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const senderId = e.target.value;
    const formData = new FormData();
    formData.set("deviceId", deviceId);

    const senders = senderId ? [senderId] : [];
    formData.set("senders", JSON.stringify(senders));

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (pending || !state?.message) return;

    const alertConfig: AlertConfigs = {
      success: {
        title: "警戒",
        description: "警報器設定成功",
        color: "success",
      },
      dismiss: {
        title: "解除警戒",
        description: "警報器解除成功",
        color: "default",
      },
      default: {
        title: "警告",
        description: state.message,
        color: "danger",
      },
    };

    const config = alertConfig[state.message] || alertConfig.default;
    showAlert(config);
  }, [state, pending, showAlert]);

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
      case "alert":
        return (
          senders && (
            <Select
              aria-label="Select alert sender"
              items={senders}
              className="min-w-24"
              placeholder="請選擇警報器"
              onChange={(e) => setAlertHandler(device.id, e)}
              selectedKeys={device.senders}
              renderValue={(items: SelectedItems<Sender>) => {
                return items.map((item) => (
                  <Chip key={item.key} color="danger" size="sm">
                    {item.data?.name}
                  </Chip>
                ));
              }}
              variant="bordered"
            >
              {(sender) => (
                <SelectItem key={sender.id} value={sender.id}>
                  {sender.name}
                </SelectItem>
              )}
            </Select>
          )
        );
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
