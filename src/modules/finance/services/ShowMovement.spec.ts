import AppError from '@shared/errors/AppError';
import ShowMovement from './ShowMovement';
import FakeFinanceRepository from '../repositories/fakes/FakeFinanceRepository';

let showMovement: ShowMovement;
let fakeFinanceRepository: FakeFinanceRepository;

describe('ShowMovement', () => {
  beforeAll(() => {
    fakeFinanceRepository = new FakeFinanceRepository();
    showMovement = new ShowMovement(fakeFinanceRepository);
  });

  it('should be able to show movement', async () => {
    const createdMovement = await fakeFinanceRepository.create({
      amount: 1000,
      date: new Date(),
      description: 'descrição aa',
      frequency: 'recurring',
      title: 'Algo',
      type: 'income',
      user_id: 'user_id',
    });

    const movement = await showMovement.execute({
      user_id: 'user_id',
      id: String(createdMovement.id),
    });

    expect(movement).toHaveProperty('id');
    expect(movement?.user_id).toBe('user_id');
  });

  it('should not be able to show movement if different user_id', async () => {
    const createdMovement = await fakeFinanceRepository.create({
      amount: 1000,
      date: new Date(),
      description: 'descrição aa',
      frequency: 'recurring',
      title: 'Algo',
      type: 'income',
      user_id: 'user_id',
    });

    await expect(
      showMovement.execute({
        user_id: 'other_id',
        id: String(createdMovement.id),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
