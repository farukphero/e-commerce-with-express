import express from 'express';
import { OrderControllers } from './order.controller';
 

const router = express.Router();

router
  .route('/')
//   .get(OrderControllers.getAllProducts)
  .post(OrderControllers.createOrder);

// router
//   .route('/:productId')
//   .get(ProductControllers.getSingleProduct)
//   .put(ProductControllers.updateProduct)
//   .delete(ProductControllers.deleteProduct);

export const OrderRoutes = router;
