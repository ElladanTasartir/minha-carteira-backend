import { getMongoRepository, MongoRepository } from 'typeorm';

import IFinanceRepository from '@modules/finance/repositories/IFinanceRepository';
import ICreateMovementDTO from '@modules/finance/dtos/ICreateMovementDTO';
import IFindMovementsByUser from '@modules/finance/dtos/IFindMovementsByUser';
import Movement from '../schemas/Movement';

class FinanceRepository implements IFinanceRepository {
  private ormRepository: MongoRepository<Movement>;

  constructor() {
    this.ormRepository = getMongoRepository(Movement);
  }

  public async create(data: ICreateMovementDTO): Promise<Movement> {
    const movement = this.ormRepository.create(data);

    await this.ormRepository.save(movement);

    return movement;
  }

  public async findMovementsByUser({
    user_id,
    frequency,
    type,
  }: IFindMovementsByUser): Promise<Movement[] | undefined> {
    const movements = await this.ormRepository.find({
      where: {
        user_id,
        frequency,
        type,
      },
    });

    return movements;
  }

  public async findMovementById(id: string): Promise<Movement | undefined> {
    const movement = await this.ormRepository.findOne(id);

    return movement;
  }

  public async deleteMovement(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default FinanceRepository;
