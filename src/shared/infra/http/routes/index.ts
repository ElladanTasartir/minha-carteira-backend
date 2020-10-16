import { Router } from 'express';

import userRoutes from '@modules/users/infra/http/routes/user.routes';
import authRoutes from '@modules/users/infra/http/routes/auth.routes';
import financeRoutes from '@modules/finance/infra/http/routes/finance.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);
routes.use('/finance', financeRoutes);

export default routes;
