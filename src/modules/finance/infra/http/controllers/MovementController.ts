import { Request, Response } from 'express';
import { container } from 'tsyringe';

import MovementRegister from '@modules/finance/services/MovementRegister';
import ListMovementsByUser from '@modules/finance/services/ListMovementsByUser';
import ShowMovement from '@modules/finance/services/ShowMovement';
import DeleteMovement from '@modules/finance/services/DeleteMovement';

export default class MovementController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, type, date, frequency, amount, description } = request.body;

    const movementRegister = container.resolve(MovementRegister);

    const movement = await movementRegister.execute({
      user_id: request.user.id,
      title,
      type,
      date,
      frequency,
      amount,
      description,
    });

    return response.status(201).json(movement);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { type, frequency } = request.query;

    const queryType = type as 'income' | 'outcome';
    const queryFrequency = frequency as 'recurring' | 'eventual';

    const listMovementsByUser = container.resolve(ListMovementsByUser);

    const movements = await listMovementsByUser.execute({
      type: queryType,
      frequency: queryFrequency,
      user_id: request.user.id,
    });

    return response.json(movements);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showMovement = container.resolve(ShowMovement);

    const movement = await showMovement.execute({
      user_id: request.user.id,
      id,
    });

    return response.json(movement);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteMovement = container.resolve(DeleteMovement);

    await deleteMovement.execute({
      id,
      user_id: request.user.id,
    });

    return response.status(204).json();
  }
}
