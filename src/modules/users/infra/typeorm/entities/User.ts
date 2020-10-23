import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export default class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;
}
