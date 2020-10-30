import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import EntryController from '../controllers/EntryController';

const financeRouter = Router();

const entryController = new EntryController();

financeRouter.use(ensureAuthenticated);
financeRouter.post('/movement', entryController.create);

export default financeRouter;
