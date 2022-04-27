import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Conversation } from "./conversation.entity";
import { Participant } from "./participant.entity";

@Entity()
export class Message {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Participant)
  participant!: Participant;

  @ManyToOne(() => Conversation)
  conversation!: Conversation;

  @Property()
  content!: string;
}
