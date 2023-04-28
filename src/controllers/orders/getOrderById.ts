import { RequestHandler } from 'express';
const { NotFound } = require('http-errors');
import { AuthRequest } from 'types';

// Get mongoose model
import mongooseModels from '../../models';

const getOrderById: RequestHandler = async (req: AuthRequest, res) => {
  const orderId = req.params.orderId;
  const { id } = req.user;

  // Get the order by ID
  const order = await mongooseModels.Order.findOne({
    $and: [{ _id: orderId }, { customerId: id }],
  })
    .populate('customerId', '_id userName email ')
    .populate('products.productId', '_id name price');

  // Check if order exists
  if (!order) {
    throw new NotFound(`Order with id=${orderId} not found`);
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      order,
    },
  });
};

export default getOrderById;
