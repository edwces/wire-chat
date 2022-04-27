import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Participant } from "./participant.entity";
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

  @OneToMany(() => Participant, (participant) => participant.user)
  participants = new Collection<Participant>(this);
}
