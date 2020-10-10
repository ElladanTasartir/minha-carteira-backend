import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SignInService from '@modules/users/services/SignInService';
import AppError from '@shared/errors/AppError';

class AuthController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    if (!email) throw new AppError('email is required', 400);
    if (!password) throw new AppError('password is required', 400);

    const signUp = container.resolve(SignInService);

    const userResponse = await signUp.execute({
      email,
      password,
    });

    const formattedResponse = {
      user: { name: userResponse.user.name, email: userResponse.user.email },
      token: userResponse.token,
    };

    return response.status(200).json(formattedResponse);
  }
}

export default AuthController;
