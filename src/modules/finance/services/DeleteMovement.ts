import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFinanceRepository from '../repositories/IFinanceRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export default class ShowMovement {
  constructor(
    @inject('FinanceRepository')
    private financeRepository: IFinanceRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const movement = await this.financeRepository.findMovementById(id);

    if (!movement) {
      throw new AppError("There's mo movement with this id");
    }

    if (movement?.user_id !== user_id) {
      throw new AppError('You cannot delete this movement', 401);
    }

    await this.financeRepository.deleteMovement(id);
  }
}
