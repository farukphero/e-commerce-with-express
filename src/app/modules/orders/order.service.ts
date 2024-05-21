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
    console.log(product);
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
  } catch (error: any) {
    if (error.name === 'CastError') {
      return {
        success: false,
        message: 'No product found',
      };
    }
  }
};

// const getAllProductsFromDB = async (searchTerm?: string) => {
//   let data;
//   if (searchTerm) {
//     data = {
//       $or: [
//         { name: { $regex: new RegExp(searchTerm, 'i') } },
//         { description: { $regex: new RegExp(searchTerm, 'i') } },
//       ],
//     };
//   } else {
//     data = {};
//   }

//   const result = await ProductModel.find(data);

//   return result;
// };

// const getSingleProductFromDB = async (id: string) => {
//   const result = await ProductModel.findOne({ _id: id });
//   return result;
// };
// const updateProductIntoDB = async (id: string, data: Product) => {
//   const result = await ProductModel.findByIdAndUpdate(
//     { _id: id },
//     { $set: data },
//     { new: true, runValidators: true },
//   );

//   return result;
// };
// const deleteProductFromDB = async (id: string) => {
//   const result = await ProductModel.deleteOne({ _id: id });

//   return result;
// };

export const OrderServices = {
  createOrderIntoDB,
};
