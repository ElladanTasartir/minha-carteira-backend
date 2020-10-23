import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import SignInService from '@modules/users/services/SignInService';
import AppError from '@shared/errors/AppError';

class AuthController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    if (!email) throw new AppError('email is required', 400);
    if (!password) throw new AppError('password is required', 400);

    const signUp = container.resolve(SignInService);

    const user = await signUp.execute({
      email,
      password,
    });

    return response.status(200).json(classToClass(user));
  }
}

export default AuthController;
