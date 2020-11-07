import AppError from '@shared/errors/AppError';
import DeleteMovement from './DeleteMovement';
import FakeFinanceRepository from '../repositories/fakes/FakeFinanceRepository';

let deleteMovement: DeleteMovement;
let fakeFinanceRepository: FakeFinanceRepository;

describe('ShowMovement', () => {
  beforeAll(() => {
    fakeFinanceRepository = new FakeFinanceRepository();
    deleteMovement = new DeleteMovement(fakeFinanceRepository);
  });

  it('should be able delete movement', async () => {
    const movement = await fakeFinanceRepository.create({
      amount: 1000,
      date: new Date(),
      description: 'descrição aa',
      frequency: 'recurring',
      title: 'Algo',
      type: 'income',
      user_id: 'user_id',
    });

    await deleteMovement.execute({
      id: String(movement.id),
      user_id: 'user_id',
    });

    const deletedMovement = await fakeFinanceRepository.findMovementById(
      String(movement.id),
    );

    expect(deletedMovement).toBe(undefined);
  });

  it('should not be able to delete if movement is not from user', async () => {
    const movement = await fakeFinanceRepository.create({
      amount: 1000,
      date: new Date(),
      description: 'descrição aa',
      frequency: 'recurring',
      title: 'Algo',
      type: 'income',
      user_id: 'user_id',
    });

    await expect(
      deleteMovement.execute({
        id: String(movement.id),
        user_id: 'other_user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
