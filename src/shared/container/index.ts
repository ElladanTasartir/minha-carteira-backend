import { container } from 'tsyringe';

import '@modules/users/providers';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IFinanceRepository from '@modules/finance/repositories/IFinanceRepository';
import FinanceRepository from '@modules/finance/infra/typeorm/repositories/FinanceRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IFinanceRepository>(
  'FinanceRepository',
  FinanceRepository,
);
