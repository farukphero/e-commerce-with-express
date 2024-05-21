import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router
  .route('/')
  .get(ProductControllers.getAllProducts)
  .post(ProductControllers.createProduct);

router
  .route('/:productId')
  .get(ProductControllers.getSingleProduct)
  .put(ProductControllers.updateProduct);

export const ProductRoutes = router;
