import { getMongoRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../../../infra/entities/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class SignUpService {
  async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getMongoRepository(User);

    const emailExists = await usersRepository.findOne({
      where: {
        email,
      },
    });

    const passwordHash = await hash(password, 8);

    if (emailExists) throw Error('E-mail já cadastrado');

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    const userCreated = await usersRepository.save(user);

    return userCreated;
  }
}

export default SignUpService;
