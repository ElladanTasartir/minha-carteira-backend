import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/schemas/User';

@Entity('movements')
class Movement {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @Column('date')
  date: Date;

  @Column()
  frequency: string;

  @Column('number')
  amount: number;

  @Column('description')
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Movement;
