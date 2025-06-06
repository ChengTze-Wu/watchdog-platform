import { UUID } from "crypto";

export interface Device {
  id: UUID;
  name: string;
  nickname: string;
  mac_address: string;
  vendor: string;
  senders: UUID[];
}

export interface DeviceResponse {
  data: Device[] | [];
  pagination: {
    totalItems: number;
    totalPages: number;
    nextPage: number | null;
  };
}

export interface ConnectedDevice {
  device: Device;
  connection_type: string;
  ip_address: string;
  rssi: number;
  rx_speed: number;
  tx_speed: number;
  last_connected_at: string;
}

export interface DisconnectedDevice {
  device: Device;
  created_at: string;
}
