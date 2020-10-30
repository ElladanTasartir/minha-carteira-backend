import ICreateMovementDTO from '../dtos/ICreateMovementDTO';

import Movement from '../infra/typeorm/entities/Movement';

export default interface IFinanceRepository {
  create(data: ICreateMovementDTO): Promise<Movement>;
}
