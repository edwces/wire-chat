import { Message } from "./message.interface";
import { User } from "./user.interface";

export interface Conversation {
  id: number;
  members: User[];
  messages: Message[];
}
