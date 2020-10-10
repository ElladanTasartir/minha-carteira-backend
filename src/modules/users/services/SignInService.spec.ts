import SignInService from './SignInService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('SignUpService', () => {
  it('should be able to login if email and password match', async () => {
    const userRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const user = await userRepository.create({
      name: 'any_user',
      email: 'any@email.com',
      password: 'any_password',
    });

    const signIn = new SignInService(userRepository, fakeHashProvider);

    const loggedUser = await signIn.execute({
      email: user.email,
      password: user.password,
    });

    expect(loggedUser).toHaveProperty('token');
  });
});
