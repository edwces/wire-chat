import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Conversation } from "./conversation.entity";
import { Message } from "./message.entity";
import { CustomBaseEntity } from "./shared/base.entity";

@Entity()
export class User extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @ManyToMany(() => Conversation)
  conversations = new Collection<Conversation>(this);

  @OneToMany(() => Message, (message) => message.user)
  messages = new Collection<Message>(this);
}
