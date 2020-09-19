import SignUpService from './SignUpService';
import UsersRepositoryFake from './UserRepositoryFake';

describe('SignUpService', () => {
  it('should be able to create a new user', async () => {
    const data = {
      name: 'any_user',
      email: 'any@email.com',
      password: 'any_password',
    };

    const signUp = new SignUpService(new UsersRepositoryFake());

    const user = await signUp.execute(data);

    expect(user).toHaveProperty('id');
  });
});
