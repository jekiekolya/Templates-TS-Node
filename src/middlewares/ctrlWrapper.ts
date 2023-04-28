import { RequestHandler } from 'express';

const ctrlWrapper = (ctrl: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default ctrlWrapper;
