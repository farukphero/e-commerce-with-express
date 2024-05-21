import { Product } from './product.interface';
import { ProductModel } from './product.model';
 
 

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

// const getAllStudentsFromDB = async () => {
//   const result = await StudentModel.find();
//   return result;
// };

// const getSingleStudentFromDB = async (id: string) => {
//   const result = await StudentModel.findOne({ id });
//   return result;
// };

export const ProductServices = {
  createProductIntoDB
};
