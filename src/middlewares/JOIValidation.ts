import { RequestHandler } from 'express';
import { BadRequest } from 'http-errors';
import { Schema } from 'joi';

const JOIValidation = (schema: Schema): RequestHandler => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new BadRequest(error.message);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default JOIValidation;
