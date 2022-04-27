import { Collection, Entity, OneToMany, PrimaryKey } from "@mikro-orm/core";
import { Message } from "./message.entity";
import { Participant } from "./participant.entity";

@Entity()
export class Conversation {
  @PrimaryKey()
  id!: number;

  @OneToMany(() => Participant, (participant) => participant.conversation)
  participants = new Collection<Participant>(this);

  @OneToMany(() => Message, (message) => message.conversation)
  messages = new Collection<Message>(this);
}
