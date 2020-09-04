import { Router } from 'express';

import UserController from '../../../modules/users/controllers/UserController';

const usersRoutes = Router();

usersRoutes.post('/', UserController.create);

export default usersRoutes;
