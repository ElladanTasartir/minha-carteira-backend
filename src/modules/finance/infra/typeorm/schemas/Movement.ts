import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movements')
class Movement {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column()
  user_id: string;

  @Column('date')
  date: Date;

  @Column()
  frequency: 'recurring' | 'eventual';

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
