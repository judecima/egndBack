import { Router } from 'express';
import * as authCrt from '../controllers/auth.controller';
const router = Router();

router.post('/signin', authCrt.signIn);
router.post('/signup', authCrt.signUp);

export default router;
