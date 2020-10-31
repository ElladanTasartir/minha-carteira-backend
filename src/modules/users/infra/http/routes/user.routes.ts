import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UserController from '../controllers/UserController';

const userController = new UserController();

const usersRoutes = Router();

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      password_confirm: Joi.string().valid(Joi.ref('password')),
    },
  }),
  userController.create,
);

export default usersRoutes;
