import { hash } from 'bcryptjs';

import User from '../../../infra/entities/User';
import AppError from '../../../shared/errors/AppError';
import { Query } from './UserRepositoryFake';

interface Request {
  name: string;
  email: string;
  password: string;
}

interface UserRepositoryData {
  create: (data: Omit<User, 'id'>) => User;
  findOne: (data: Query) => Promise<string | null>;
  save: (user: User) => Promise<User>;
}

class SignUpService {
  private usersRepository: UserRepositoryData;

  constructor(usersRepository: UserRepositoryData) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, password }: Request): Promise<User> {
    const emailExists = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    const passwordHash = await hash(password, 8);

    if (emailExists) throw new AppError('E-mail já cadastrado', 400);

    const user = this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    const userCreated = await this.usersRepository.save(user);

    return userCreated;
  }
}

export default SignUpService;
