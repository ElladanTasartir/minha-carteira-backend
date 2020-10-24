import AppError from '@shared/errors/AppError';
import SignInService from './SignInService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeTokenProvider from '../providers/TokenProvider/fakes/FakeTokenProvider';

describe('SignUpService', () => {
  it('should be able to login if email and password match', async () => {
    const userRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeTokenProvider = new FakeTokenProvider();

    const user = await userRepository.create({
      name: 'any_user',
      email: 'any@email.com',
      password: 'any_password',
    });

    const signIn = new SignInService(
      userRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );

    const loggedUser = await signIn.execute({
      email: user.email,
      password: user.password,
    });

    expect(loggedUser).toHaveProperty('token');
  });

  it('should be able to login if user does not exist', async () => {
    const userRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeTokenProvider = new FakeTokenProvider();

    const signIn = new SignInService(
      userRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );

    await expect(
      signIn.execute({
        email: 'any_user',
        password: 'any@email.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to login if password does not match', async () => {
    const userRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeTokenProvider = new FakeTokenProvider();

    await userRepository.create({
      name: 'any_user',
      email: 'any@email.com',
      password: 'any_password',
    });

    const signIn = new SignInService(
      userRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );

    await expect(
      signIn.execute({
        email: 'any@email.com',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
