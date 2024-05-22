import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
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

  const result = await Product.find(data);
  if (result.length === 0) {
    return {
      message: 'No product found.',
    };
  }

  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};
const updateProductIntoDB = async (id: string, data: TProduct) => {
  const result = await Product.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    { new: true, runValidators: true },
  );

  return result;
};
const deleteProductFromDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
