import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Conversation } from "./conversation.entity";
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

  @Property({ nullable: true })
  avatar?: string;

  @ManyToMany(() => Conversation)
  conversations = new Collection<Conversation>(this);
}
