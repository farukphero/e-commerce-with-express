import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDB = async (searchTerm?: string) => {
  let data;
  if (searchTerm) {
    data = {
      $or: [
        { name: { $regex: new RegExp(searchTerm, 'i') } },
        { description: { $regex: new RegExp(searchTerm, 'i') } },
      ],
    };
  } else {
    data = {};
  }

  const result = await ProductModel.find(data);
  if (result.length === 0) {
    return {
      message: 'No product found.',
    };
  }

  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  return result;
};
const updateProductIntoDB = async (id: string, data: Product) => {
  const result = await ProductModel.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    { new: true, runValidators: true },
  );

  return result;
};
const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
