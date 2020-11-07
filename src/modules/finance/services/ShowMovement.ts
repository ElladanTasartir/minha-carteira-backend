import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFinanceRepository from '../repositories/IFinanceRepository';
import Movement from '../infra/typeorm/schemas/Movement';

interface IRequest {
  user_id: string;
  id: string;
}

@injectable()
export default class ShowMovement {
  constructor(
    @inject('FinanceRepository')
    private financeRepository: IFinanceRepository,
  ) {}

  public async execute({
    id,
    user_id,
  }: IRequest): Promise<Movement | undefined> {
    const movement = await this.financeRepository.findMovementById(id);

    if (movement?.user_id !== user_id) {
      throw new AppError("You don't have permission to see this movement", 401);
    }

    return movement;
  }
}
