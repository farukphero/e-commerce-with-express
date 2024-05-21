import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find({});
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

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
};
