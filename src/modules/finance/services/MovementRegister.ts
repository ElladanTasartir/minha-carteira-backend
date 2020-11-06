import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ICreateMovementDTO from '../dtos/ICreateMovementDTO';
import IFinanceRepository from '../repositories/IFinanceRepository';
import Movement from '../infra/typeorm/schemas/Movement';

type IRequest = ICreateMovementDTO;

@injectable()
export default class MovementRegister {
  constructor(
    @inject('FinanceRepository')
    private financeRepository: IFinanceRepository,
  ) {}

  public async execute({
    title,
    type,
    date,
    frequency,
    amount,
    description,
    user_id,
  }: IRequest): Promise<Movement> {
    const movement = await this.financeRepository.create({
      user_id,
      title,
      type,
      date,
      frequency,
      amount,
      description,
    });

    return movement;
  }
}
