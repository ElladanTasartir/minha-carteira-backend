import { Request, Response } from 'express';

class UserController {
  async create(request: Request, response: Response) {
    return response.send('Controller do Usuário');
  }
}

export default new UserController();