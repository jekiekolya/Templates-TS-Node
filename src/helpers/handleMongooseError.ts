import { NextFunction } from 'express';
import { Error } from 'mongoose';

interface CustomMongooseError extends Error {
  code: number;
  status: number;
}

const handleMongooseError = (
  error: CustomMongooseError,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  data: any,
  next: NextFunction
): void => {
  const { name, code } = error;
  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  next();
};

export default handleMongooseError;
