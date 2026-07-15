import mongoose from 'mongoose';
import { TGenericErrorResponse } from './errorInterface';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources = Object.values(err.errors).map(
    (value: any) => ({
      path: value.path,
      message: value.message,
    }),
  );

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;