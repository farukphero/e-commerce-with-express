import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';

const globalErrorHandle = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  res.status(400).json({
    success: false,
    message: error.message || 'Something went wrong',
    error: error || null,
  });
};

export default globalErrorHandle;
