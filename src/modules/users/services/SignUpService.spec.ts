import SignUpService from './SignUpService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('SignUpService', () => {
  it('should be able to create a new user', async () => {
    const data = {
      name: 'any_user',
      email: 'any@email.com',
      password: 'any_password',
    };

    const userRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const signUp = new SignUpService(userRepository, fakeHashProvider);

    const user = await signUp.execute(data);

    expect(user).toHaveProperty('id');
  });
});
