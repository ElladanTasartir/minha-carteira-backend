import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import AuthController from '../controllers/AuthController';

const authController = new AuthController();

const authRoutes = Router();

authRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authController.create,
);

export default authRoutes;
