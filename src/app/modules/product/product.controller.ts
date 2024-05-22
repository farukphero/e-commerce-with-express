import { NextFunction, Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    // validation by zod 
    const product = productValidationSchema.parse(req.body);

    const result = await ProductServices.createProductIntoDB(product);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { searchTerm } = req.query;

    const result = await ProductServices.getAllProductsFromDB(
      searchTerm as string,
    );

    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term ${searchTerm} fetched successfully!`
        : 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    
    // validation by zod 

    const product = productValidationSchema.parse(req.body);

    const result = await ProductServices.updateProductIntoDB(
      productId,
      product,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    await ProductServices.deleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
