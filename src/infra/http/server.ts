import 'reflect-metadata';
import express, { json } from 'express';

import '../database';
import routes from './routes/index';

const server = express();

server.use(json());

server.use(routes);

server.listen(3333, () => {
  // eslint-disable-next-line
  console.log('Server hosted on 3333 port');
});
