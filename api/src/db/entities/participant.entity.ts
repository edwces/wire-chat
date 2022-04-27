import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
} from "@mikro-orm/core";
import { Conversation } from "./conversation.entity";
import { Message } from "./message.entity";
import { User } from "./user.entity";

@Entity()
export class Participant {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  user!: User;

  @ManyToOne()
  conversation!: Conversation;

  @OneToMany(() => Message, (message) => message.participant)
  messages = new Collection<Message>(this);
}