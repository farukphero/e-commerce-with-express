import { z } from 'zod';
import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = productValidationSchema.parse(req.body);

    const result = await ProductServices.createProductIntoDB(product);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: 'Validation error', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: 'Something went wrong!',
      data: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'Something went wrong!',
      data: error,
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
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
    res.status(200).json({
      success: false,
      message: 'Something went wrong!',
      data: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
};
