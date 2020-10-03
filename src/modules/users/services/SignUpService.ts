import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class SignUpService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute({ name, email, password }: Request): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    const passwordHash = await hash(password, 8);

    if (emailExists) throw new AppError('E-mail já cadastrado', 400);

    const user = this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export default SignUpService;
