import MovementRegister from './MovementRegister';
import FakeFinanceRepository from '../repositories/fakes/FakeFinanceRepository';

let movementRegister: MovementRegister;
let fakeFinanceRepository: FakeFinanceRepository;
describe('MovementRegister', () => {
  beforeAll(() => {
    fakeFinanceRepository = new FakeFinanceRepository();
    movementRegister = new MovementRegister(fakeFinanceRepository);
  });

  it('should be able to register new finance movement', async () => {
    const data = {
      title: 'Café',
      type: 'outcome',
      date: new Date(Date.now()),
      frequency: 'recurring',
      amount: 8.6,
      description: 'Compra café urgente',
    };

    const finance = await movementRegister.execute(data);

    expect(finance).toHaveProperty('id');
  });
});
