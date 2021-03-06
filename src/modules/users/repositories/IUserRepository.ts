import User from '../infra/typeorm/schemas/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface UserRepositoryData {
  create: (data: ICreateUserDTO) => Promise<User>;
  findByEmail: (email: string) => Promise<User | undefined>;
  save: (user: User) => Promise<User>;
}
