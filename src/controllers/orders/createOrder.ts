import { RequestHandler } from 'express';
import { AuthRequest } from 'types';

import mongooseModels from '../../models';

const createOrder: RequestHandler = async (req: AuthRequest, res) => {
  // Take data from request
  const { id } = req.user;

  // Get total Price

  const createdOrder = await mongooseModels.Order.create({
    customerId: id,
    ...req.body,
  });

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      createdOrder,
    },
  });
};

export default createOrder;
