import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import SignUpService from '@modules/users/services/SignUpService';

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const signUp = container.resolve(SignUpService);

    const user = await signUp.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(classToClass(user));
  }
}

export default UserController;
