import 'reflect-metadata';
import express, { json, NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import '../database';
import routes from './routes/index';
import AppError from '../../shared/errors/AppError';

const server = express();

server.use(json());

server.use(routes);

server.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({ message: 'Internal Server Error' });
  },
);

server.listen(3333, () => {
  // eslint-disable-next-line
  console.log('Server hosted on 3333 port');
});
