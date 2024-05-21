import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

router
  .route('/')
  .get(OrderControllers.getAllOrders)
  .post(OrderControllers.createOrder);

export const OrderRoutes = router;
