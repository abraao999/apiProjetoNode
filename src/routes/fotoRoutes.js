import { Router } from 'express';
import FotoController from '../controllers/FotoController';
import loginRequered from '../middlewares/loginRequered';

const router = new Router();

router.post('/', loginRequered, FotoController.store);
export default router;
