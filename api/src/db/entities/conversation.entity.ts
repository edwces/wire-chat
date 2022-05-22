import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
} from "@mikro-orm/core";
import { Message } from "./message.entity";
import { User } from "./user.entity";

@Entity()
export class Conversation {
  @PrimaryKey()
  id!: number;

  @ManyToMany(() => User, (participant) => participant.conversations)
  participants = new Collection<User>(this);

  @OneToMany(() => Message, (message) => message.conversation)
  messages = new Collection<Message>(this);
}
