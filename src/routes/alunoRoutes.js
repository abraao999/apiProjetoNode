import { Router } from 'express';
import AlunoController from '../controllers/AlunoController';
import loginRequered from '../middlewares/loginRequered';

const router = new Router();

router.put('/:id', loginRequered, AlunoController.update);
router.post('/', loginRequered, AlunoController.storage);
router.get('/', AlunoController.index);
router.get('/:id', AlunoController.show);
router.delete('/:id', loginRequered, AlunoController.delete);
export default router;
