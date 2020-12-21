import { Router } from 'express';
import * as userCrt from '../controllers/users.controller';
import { verifyToken } from '../middlewares';
const router = Router();

router.get('/', userCrt.getUsers);
router.get('/:userId', userCrt.getUserById);
router.post('/reasigna', userCrt.reasignarUserById);
router.put('/:userId', userCrt.updateUserById);
router.delete('/:userId', userCrt.deleteUserById);
router.post('/desactivar/:userId', userCrt.desactivar);
router.post('/pertenecen', userCrt.pertenecen);
router.post('/topten', userCrt.topten);
router.post('/vencimiento', userCrt.vencimiento);
router.post('/revendedores', userCrt.revendedores);

export default router;
