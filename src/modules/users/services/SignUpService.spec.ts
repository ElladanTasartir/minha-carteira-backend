import SignUpService from './SignUpService';
import UsersRepositoryFake from '../repositories/fakes/FakeUserRepository';

describe('SignUpService', () => {
  it('should be able to create a new user', async () => {
    const data = {
      name: 'any_user',
      email: 'any@email.com',
      password: 'any_password',
    };

    const userRepository = new UsersRepositoryFake();
    const signUp = new SignUpService(userRepository);

    const user = await signUp.execute(data);

    expect(user).toHaveProperty('id');
  });
});
