import { User } from "./user.interface";

export interface Message {
  id: number;
  content: string;
  participant: User;
}
