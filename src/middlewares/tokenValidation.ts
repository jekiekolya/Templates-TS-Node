import { RequestHandler } from 'express';
import { Unauthorized } from 'http-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthRequest } from '../types/index';

const tokenValidation: RequestHandler = async (req: AuthRequest, res, next) => {
  const { SECRET_KEY } = process.env;
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  try {
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Authorization token is missing.');
    }

    const payload = jwt.verify(token, SECRET_KEY) as JwtPayload;

    // Check if user exists
    // const user = await User.findById(id)
    // if (!user || !user.token) {
    //   throw new Unauthorized('Authorization token is missing.');
    // }

    // Add to request object with user
    req.user = payload;
    next();
  } catch (error) {
    if (
      error.message === 'invalid token' ||
      error.message === 'invalid signature'
    ) {
      error.status = 401;
    }
    next(error);
  }
};

export default tokenValidation;
