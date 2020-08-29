import express from "express";

import routes from './routes/index';

const server = express();

server.use(routes);

server.listen(3333, () => {
  console.log("Deu");
});
