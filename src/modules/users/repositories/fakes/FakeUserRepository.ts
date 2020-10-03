import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRepository from '../IUserRepository';

export default class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User(email, name, password);

    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userExists = this.users.find(user => user.email === email);

    return userExists;
  }

  public async save(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }
}
