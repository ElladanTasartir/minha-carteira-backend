import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import SignUpService from '@modules/users/services/SignUpService';
import AppError from '@shared/errors/AppError';

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, password_confirm } = request.body;

    if (!name) throw new AppError('name is required', 400);
    if (!email) throw new AppError('email is required', 400);
    if (!password) throw new AppError('password is required', 400);
    if (!password_confirm)
      throw new AppError('password_confirm is required', 400);
    if (password !== password_confirm)
      throw new AppError("passwords don't match", 400);

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
