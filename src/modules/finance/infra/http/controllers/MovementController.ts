import { Request, Response } from 'express';
import { container } from 'tsyringe';

import MovementRegister from '@modules/finance/services/MovementRegister';

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
}
