import { NextFunction, Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = orderValidationSchema.parse(req.body);

    const result = await OrderServices.createOrderIntoDB(order);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.query;

    const result = await OrderServices.getAllOrdersFromDB(email as string);

    res.status(200).json({
      success: true,
      message: email
        ? `Orders fetched successfully for user email!`
        : 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
