import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import MovementController from '../controllers/MovementController';

const financeRouter = Router();

const movementController = new MovementController();

financeRouter.use(ensureAuthenticated);
financeRouter.post(
  '/movement',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      type: Joi.string().required(),
      date: Joi.date(),
      frequency: Joi.string().required(),
      amount: Joi.number().required(),
      description: Joi.string().required(),
    },
  }),
  movementController.create,
);

export default financeRouter;
