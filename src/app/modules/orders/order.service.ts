import { Error } from 'mongoose';
import { ProductModel } from '../product/product.model';
import { Order } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDB = async (order: Order) => {
  const session = await OrderModel.startSession();
  session.startTransaction();

  try {
    const { productId, quantity } = order;

    const newOrder = new OrderModel(order);
    await newOrder.save({ session });

    const product = await ProductModel.findById(productId).session(session);

    if (!product) {
      await session.abortTransaction();
      session.endSession();
      return {
        success: false,
        message: 'Order not found',
      };
    }

    if (product.inventory.quantity < quantity) {
      await session.abortTransaction();
      session.endSession();
      return {
        success: false,
        message: 'Insufficient quantity available in inventory',
      };
    }
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save({ session });

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      message: 'Order created successfully!',
      data: newOrder,
    };
  } catch (error) {
    if (isCastError(error)) {
      return {
        success: false,
        message: 'Order not found',
      };
    }
  }
};

const getAllOrdersFromDB = async (email?: string) => {
  let data;
  if (email) {
    data = { email };
  } else {
    data = {};
  }

  const result = await OrderModel.find(data);

  if (result.length === 0) {
    return {
      message: 'No order found.',
    };
  }

  return result;
};

function isCastError(error: unknown): error is Error.CastError {
  return (error as Error).name === 'CastError';
}

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
