import { getMongoRepository, MongoRepository } from 'typeorm';

import IFinanceRepository from '@modules/finance/repositories/IFinanceRepository';
import ICreateMovementDTO from '@modules/finance/dtos/ICreateMovementDTO';
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
}

export default FinanceRepository;
