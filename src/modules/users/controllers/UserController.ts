import { Request, Response } from 'express';
import SignUpService from '../services/SignUpService';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password, password_confirm } = request.body;

    if (!name) return response.json({ message: 'name is required' });
    if (!email) return response.json({ message: 'email is required' });
    if (!password) return response.json({ message: 'password is required' });
    if (!password_confirm)
      return response.json({ message: 'password_confirm is required' });
    if (password !== password_confirm)
      return response.json({ message: "passwords don't match" });

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
