// NOTE: ONLY FOR CREATING JWT TOKEN (ONLY FOR TEST)
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const createJWTToken: RequestHandler = async (req, res) => {
  const { SECRET_KEY } = process.env;

  // Creating token
  const payload = {
    id: '614ed8db6e1c151f09e6f063',
    userName: 'John',
    email: 'john',
    role: 'admin',
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      user: {
        id: payload.id,
        userName: payload.userName,
        email: payload.email,
      },
      token,
    },
  });
};

export default createJWTToken;
