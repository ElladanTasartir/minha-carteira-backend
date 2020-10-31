import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity('movements')
class Movement {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column('date')
  date: Date;

  @Column()
  frequency: string;

  @Column('number')
  amount: number;

  @Column('description')
  description: string;
}

export default Movement;
