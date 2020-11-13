import AppError from '@shared/errors/AppError';
import SignUpService from './SignUpService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let userRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let signUp: SignUpService;

describe('SignUpService', () => {
  beforeAll(() => {
    userRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    signUp = new SignUpService(userRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const data = {
      name: 'any_user',
      email: 'any@email.com',
      password: 'any_password',
    };

    const user = await signUp.execute(data);

    expect(user.name).toBe('any_user');
    expect(user.email).toBe('any@email.com');
  });

  it('should not be able to create user if email already exists', async () => {
    const data = {
      name: 'any_user',
      email: 'any@email.com',
      password: 'any_password',
    };

    await signUp.execute(data);
    await expect(signUp.execute(data)).rejects.toBeInstanceOf(AppError);
  });
});
