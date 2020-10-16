import { Request, Response } from 'express';

export default class EntryController {
  public async create(request: Request, response: Response): Promise<Response> {
    return response.send('teste');
  }
}
