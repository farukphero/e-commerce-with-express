import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';
import { z } from 'zod';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = productValidationSchema.parse(req.body);

    const result = await ProductServices.createProductIntoDB(product);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: 'Validation error', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

// const getAllStudents = async (req: Request, res: Response) => {
//   try {
//     const result = await StudentServices.getAllStudentsFromDB();

//     res.status(200).json({
//       success: true,
//       message: 'Students are retrieved succesfully',
//       data: result,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// const getSingleStudent = async (req: Request, res: Response) => {
//   try {
//     const { studentId } = req.params;

//     const result = await StudentServices.getSingleStudentFromDB(studentId);

//     res.status(200).json({
//       success: true,
//       message: 'Student is retrieved succesfully',
//       data: result,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const ProductControllers = {
  createProduct,
};
