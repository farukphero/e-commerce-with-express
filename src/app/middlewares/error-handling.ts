import { Request, Response } from 'express';
import { Error } from 'mongoose';

const globalErrorHandle = (error: Error, _req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: JSON.parse(error.message) || 'Something went wrong',
    error: error || null,
  });
};

export default globalErrorHandle;
