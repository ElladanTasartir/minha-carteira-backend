import { ObjectId } from 'mongodb';

import Movement from '@modules/finance/infra/typeorm/schemas/Movement';
import ICreateMovementDTO from '@modules/finance/dtos/ICreateMovementDTO';
import IFinanceRepository from '../IFinanceRepository';

export default class FakeFinanceRepository implements IFinanceRepository {
  private movements: Movement[] = [];

  public async create(data: ICreateMovementDTO): Promise<Movement> {
    const movement = new Movement();

    Object.assign(movement, { id: new ObjectId(), ...data });

    this.movements.push(movement);

    return movement;
  }
}
