import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Conversation } from "./conversation.entity";
import { CustomBaseEntity } from "./shared/base.entity";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}
@Entity()
export class User extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ default: "default-avatar.jpg" })
  avatar?: string;

  @Property({ default: UserRole.USER })
  role?: UserRole;

  @ManyToMany(() => Conversation, "participants", { owner: true })
  conversations = new Collection<Conversation>(this);
}
