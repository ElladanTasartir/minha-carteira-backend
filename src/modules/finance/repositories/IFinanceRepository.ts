import ICreateMovementDTO from '../dtos/ICreateMovementDTO';
import IFindMovementsByUser from '../dtos/IFindMovementsByUser';

import Movement from '../infra/typeorm/schemas/Movement';

export default interface IFinanceRepository {
  create(data: ICreateMovementDTO): Promise<Movement>;
  findMovementsByUser(
    data: IFindMovementsByUser,
  ): Promise<Movement[] | undefined>;
  findMovementById(id: string): Promise<Movement | undefined>;
  deleteMovement(id: string): Promise<void>;
}
