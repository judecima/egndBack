import { Router } from 'express';
import * as productsCrt from '../controllers/products.controller';
import { verifyToken } from '../middlewares';
const router = Router();

router.post('/', productsCrt.createProduct);
router.get('/', productsCrt.getProducts);
router.get('/:productId', productsCrt.getProductById);
router.put('/:productId', verifyToken, productsCrt.updateProductById);
router.delete('/:productId', verifyToken, productsCrt.deleteProductById);

export default router;
