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
      type: Joi.string()
        .regex(/income|outcome/)
        .required(),
      date: Joi.date(),
      frequency: Joi.string()
        .regex(/recurring|eventual/)
        .required(),
      amount: Joi.number().less(100000).required(),
      description: Joi.string().required(),
    },
  }),
  movementController.create,
);

financeRouter.get(
  '/movement',
  celebrate({
    [Segments.QUERY]: {
      type: Joi.string()
        .regex(/income|outcome/)
        .required(),
      frequency: Joi.string()
        .regex(/recurring|eventual/)
        .required(),
    },
  }),
  movementController.index,
);

financeRouter.get(
  '/movement/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  movementController.show,
);

financeRouter.delete(
  '/movement/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  movementController.delete,
);

export default financeRouter;
