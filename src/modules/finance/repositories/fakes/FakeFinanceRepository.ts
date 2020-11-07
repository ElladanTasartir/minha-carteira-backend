import { ObjectId } from 'mongodb';

import Movement from '@modules/finance/infra/typeorm/schemas/Movement';
import ICreateMovementDTO from '@modules/finance/dtos/ICreateMovementDTO';
import IFindMovementByUser from '@modules/finance/dtos/IFindMovementsByUser';
import IFinanceRepository from '../IFinanceRepository';

export default class FakeFinanceRepository implements IFinanceRepository {
  private movements: Movement[] = [];

  public async create(data: ICreateMovementDTO): Promise<Movement> {
    const movement = new Movement();

    Object.assign(movement, { id: new ObjectId(), ...data });

    this.movements.push(movement);

    return movement;
  }

  public async findMovementsByUser({
    user_id,
    frequency,
    type,
  }: IFindMovementByUser): Promise<Movement[] | undefined> {
    const movements = this.movements.filter(
      movement =>
        movement.user_id === user_id &&
        movement.frequency === frequency &&
        movement.type === type,
    );

    return movements;
  }

  public async findMovementById(id: string): Promise<Movement | undefined> {
    const movementObjectId = new ObjectId(id);

    const findMovement = this.movements.find(
      movement => String(movement.id) === String(movementObjectId),
    );

    return findMovement;
  }

  public async deleteMovement(id: string): Promise<void> {
    const deletedMovementIndex = this.movements.findIndex(
      movement => String(movement.id) === String(id),
    );

    this.movements.splice(deletedMovementIndex, 1);
  }
}
