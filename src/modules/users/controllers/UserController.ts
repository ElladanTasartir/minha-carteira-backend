import { Request, Response } from 'express';

import SignUpService from '../services/SignUpService';
import AppError from '../../../shared/errors/AppError';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password, password_confirm } = request.body;

    if (!name) throw new AppError('name is required', 400);
    if (!email) throw new AppError('email is required', 400);
    if (!password) throw new AppError('password is required', 400);
    if (!password_confirm)
      throw new AppError('password_confirm is required', 400);
    if (password !== password_confirm)
      throw new AppError("passwords don't match", 400);

    const signUp = new SignUpService();

    const userResponse = await signUp.execute({
      name,
      email,
      password,
    });

    delete userResponse.password;

    return response.status(201).json(userResponse);
  }
}

export default new UserController();
