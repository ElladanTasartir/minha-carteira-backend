import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IFindMovementsByUser from '../dtos/IFindMovementsByUser';
import IFinanceRepository from '../repositories/IFinanceRepository';
import Movement from '../infra/typeorm/schemas/Movement';

type IRequest = IFindMovementsByUser;

@injectable()
export default class ListMovementsByUser {
  constructor(
    @inject('FinanceRepository')
    private financeRepository: IFinanceRepository,
  ) {}

  public async execute({
    type,
    frequency,
    user_id,
  }: IRequest): Promise<Movement[] | undefined> {
    const movements = await this.financeRepository.findMovementsByUser({
      type,
      frequency,
      user_id,
    });

    return movements;
  }
}
