import { UUID } from "crypto";

export interface Device {
  id: UUID;
  name: string | null;
  nickname: string | null;
  mac_address: string | null;
  vendor: string | null;
}
