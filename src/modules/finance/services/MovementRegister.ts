import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IFinanceRepository from '../repositories/IFinanceRepository';
import Movement from '../infra/typeorm/entities/Movement';

interface IRequest {
  title: string;
  type: string;
  date: Date;
  frequency: string;
  amount: number;
  description: string;
}

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
  }: IRequest): Promise<Movement> {
    const movement = await this.financeRepository.create({
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
