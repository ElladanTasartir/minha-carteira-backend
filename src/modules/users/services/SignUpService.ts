import { getMongoRepository } from 'typeorm';

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

    if (emailExists) throw Error('E-mail já cadastrado');

    const user = usersRepository.create({ name, email, password });

    const userCreated = await usersRepository.save(user);

    return userCreated;
  }
}

export default SignUpService;
