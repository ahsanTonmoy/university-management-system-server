// global err
import { NextFunction, Request, Response } from 'express';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // console.error(err.stack);
  let statusCode = err.statusCode ||500;
  let message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};
