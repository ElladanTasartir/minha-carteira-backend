import ListMovementsByUser from './ListMovementsByUser';
import FakeFinanceRepository from '../repositories/fakes/FakeFinanceRepository';

let listMovementsByUser: ListMovementsByUser;
let fakeFinanceRepository: FakeFinanceRepository;

describe('ListMovementsByUser', () => {
  beforeAll(() => {
    fakeFinanceRepository = new FakeFinanceRepository();
    listMovementsByUser = new ListMovementsByUser(fakeFinanceRepository);
  });

  it('should be able to list movements by user, type and frequency', async () => {
    const movement = await fakeFinanceRepository.create({
      amount: 1000,
      date: new Date(),
      description: 'descrição aa',
      frequency: 'recurring',
      title: 'Algo',
      type: 'income',
      user_id: 'user_id',
    });

    const movements = await listMovementsByUser.execute({
      user_id: 'user_id',
      type: 'income',
      frequency: 'recurring',
    });

    expect(movements).toEqual(expect.arrayContaining([movement]));
  });
});
