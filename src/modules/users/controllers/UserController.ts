import { Request, Response } from 'express';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password, password_confirm } = request.body;

    if (!name) return response.json({ message: 'name is required'});

    if (!email) return response.json({ message: 'email is required'});
    if (!password) return response.json({ message: 'password is required'});
    if (!password_confirm) return response.json({ message: 'password_confirm is required'});
    if (password !== password_confirm) return response.json({ message: "passwords don't match"});
    
    return response.json({ name, email, password, password_confirm });
  }
}

export default new UserController();