import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Conversation } from "./conversation.entity";
import { User } from "./user.entity";

@Entity()
export class Message {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Conversation)
  conversation!: Conversation;

  @Property()
  content!: string;
}
