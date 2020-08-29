import { Router } from 'express';

import userController from '../../../modules/users/controllers/UserController';
import UserController from '../../../modules/users/controllers/UserController';

const usersRoutes = Router();

usersRoutes.get('/', UserController.create);

export default usersRoutes;