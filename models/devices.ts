import { UUID } from "crypto";

export interface Device {
  id: UUID;
  name: string;
  nickname: string;
  mac_address: string;
  vendor: string;
}
