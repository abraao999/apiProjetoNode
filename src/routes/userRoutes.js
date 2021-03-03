import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequered from '../middlewares/loginRequered';

const router = new Router();

router.get('/', loginRequered, userController.index);
router.get('/:id', userController.show);

router.post('/', userController.store);
router.put('/', loginRequered, userController.update);
router.delete('/', loginRequered, userController.delete);
export default router;
