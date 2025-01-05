import { UUID } from "crypto";

export interface Sender {
  id: UUID;
  name: string;
  access_token: string;
  target: string;
  verified: boolean;
}
