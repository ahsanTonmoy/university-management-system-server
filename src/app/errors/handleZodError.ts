import { ZodError } from 'zod';
import { TGenericErrorResponse } from './errorInterface';

const handleZodError = (
  err: ZodError,
): TGenericErrorResponse => {
  const errorSources = err.issues.map((issue) => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;