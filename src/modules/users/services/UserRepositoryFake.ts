import ObjectID from './ObjectIdFake';
import User from '../../../infra/entities/User';

export interface Query {
  where: {
    email: string;
  };
}

class UserRepositoryFake {
  create(data: Omit<User, 'id'>): User {
    return {
      ...data,
      id: new ObjectID(),
    };
  }

  async findOne(query: Query): Promise<string | null> {
    return query.where.email === 'exists@email.com' ? '' : null;
  }

  async save(user: User): Promise<User> {
    return user;
  }
}

export default UserRepositoryFake;
