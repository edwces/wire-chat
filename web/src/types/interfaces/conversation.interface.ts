import { Message } from "./message.interface";
import { User } from "./user.interface";

export interface Conversation {
  id: string;
  participants: User[];
  messages: Message[];
}
