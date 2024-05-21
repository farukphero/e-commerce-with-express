import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = orderValidationSchema.parse(req.body);

    const result = await OrderServices.createOrderIntoDB(order);

    res.status(200).json(result);
  } catch (error: any) {
    next(error);
  }
};

// res.status(400).json({
//     success: false,
//     message: 'Something went wrong!',
//     data: error,
//   });
// const getAllProducts = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const { searchTerm } = req.query;

//     const result = await ProductServices.getAllProductsFromDB(
//       searchTerm as string,
//     );

//     res.status(200).json({
//       success: true,
//       message: searchTerm
//         ? `Products matching search term ${searchTerm} fetched successfully!`
//         : 'Products fetched successfully!',
//       data: result,
//     });
//   } catch (error: any) {
//     next(error);
//   }
// };

// const getSingleProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const { productId } = req.params;

//     const result = await ProductServices.getSingleProductFromDB(productId);

//     res.status(200).json({
//       success: true,
//       message: 'Product fetched successfully!',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// const updateProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const { productId } = req.params;
//     const product = productValidationSchema.parse(req.body);

//     const result = await ProductServices.updateProductIntoDB(
//       productId,
//       product,
//     );

//     res.status(200).json({
//       success: true,
//       message: 'Product updated successfully!',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// const deleteProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const { productId } = req.params;

//     const result = await ProductServices.deleteProductFromDB(productId);

//     res.status(200).json({
//       success: true,
//       message: 'Product deleted successfully!',
//       data: null,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const OrderControllers = {
  createOrder,
};
