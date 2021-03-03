import { Router } from 'express';
import tokemController from '../controllers/TokemController';

const router = new Router();

router.post('/', tokemController.store);
export default router;
