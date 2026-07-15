// global err
import { NextFunction, Request, Response } from 'express';
import handleZodError from '../errors/handleZodError';
import { ZodError } from 'zod';
import mongoose from 'mongoose';
import handleValidationError from '../errors/handleValidetionError';
import handleCastError from '../errors/handleCastError';
import { TErrorSources } from '../errors/errorInterface';
import handleDuplicateError from '../errors/handleDuplicateError';
import config from '../config';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // console.error(err.stack);
  let statusCode = err.statusCode ||500;
  let message = err.message || 'Internal Server Error';
  let errorSources: TErrorSources =[
    {
      path:'',
      message:'',
    }
  ]
  // 
    if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  else if (err instanceof mongoose.Error.ValidationError) {
    const simplifiedError = handleValidationError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  else if (err instanceof mongoose.Error.CastError) {
    const simplifiedError = handleCastError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  else if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;

    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  }
  //
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};
